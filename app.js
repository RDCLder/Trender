// Dependencies
const express = require("express");
const app = express();
const db = require('./models/');

// app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static("public"));
app.use(require("./routes/login"));
app.use(require("./routes/register"));
app.use(require("./routes/index"));
app.use(require("./routes/community"));
app.use(require("./routes/topic"));
app.use(require("./routes/logout"));
app.use(require("./routes/authenticate"));
app.use(require("./routes/user"));
app.use(require("./routes/createTopic"));
app.use(require("./routes/createCommunity"));
app.use((req, res) => {
    
    if (!req.user) { 
        var isLoggedIn = false;
    }
    else {
        var isLoggedIn = true;
    }

    if (req.accepts("html")) {
        res.render("404", {
            pageTitle: "404",
            pageID: "404",
            pageType: "error",
            url: req.url,
            isLoggedIn: isLoggedIn
        });
        return;
    }
    if (req.accepts("json")) {
        res.render("404", {
            pageTitle: "404",
            pageID: "404",
            pageType: "error",
            url: req.url,
            isLoggedIn: isLoggedIn
        });
        return;
    }
    res.type("txt").send("Not Found");
});

// db.sequelize.migrate;
// db.sequelize.drop();
// db.sequelize.sync();
// db.user.create({
//     username: 'test',
//     password: '123456'
// })
// db.community.create({
//     name: 'Games',
//     description: 'Gamers only'
// })
// db.topic.create({
//     title: 'APEX Legends',
//     body: 'Solid game. Need more balancing, otherwise the game is smooth.',
//     community_id: '1',
//     author_id: '1'
// })
// db.sequelize.sync().then(function () {
//     http.createServer(app).listen(app.get('port'), function () {
//         console.log('Express server listening on port ' + app.get('port'));
//     });
// });

// app.listen(3000, ()=>{
//     console.log('listening on port 3000')
// })
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});