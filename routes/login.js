
const express = require('express');
const router = express.Router();
const db = require('./../models');
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-Parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var myStore = new SequelizeStore({
    db: db.sequelize
})
router.use(session({
    secret: 'mySecret',
    store: myStore,
    resave: false,
    proxy: true
}))
myStore.sync();

router.use(cookieParser());
router.use(passport.initialize());
router.use(passport.session());

router.get('/login', function (req, res) {
  
    res.render('login',{
        pageTitle: "Login",
        pageId: "login"
    }); //end of res.send
});//end of app.get

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/back",
        failureRedirect: "/back"
    })
);

passport.use(new LocalStrategy((username, password, done) => {
    db.users.findAll({ where: { username: username } }).then((results) => {

        if (results != null) {
            const data = results[0];
            bcrypt.compare(password, data.password, function (err, res) {
                if (res) {
                    console.log("Hello world")
                    console.log(data)
                    done(null, { id: data.id, username: data.username })
                } else {
                    console.log("Returned nothing")
                    done(null, false)
                }
            })
        } 
        else {
            console.log("just out there")
            done(null, false)
        }
    })
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    db.users.findById(parseInt(id, 10)).then((data) => {
        done(null, data)
    })
});

module.exports = router;