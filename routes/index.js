const express = require("express");
const router = express.Router();
const db = require("./../models/");

router.get("/", (req, res) => {

    if (!req.user) {
        // console.log("NOT AUTHENTICATED IN INDEX!");
        res.render("index", {
            pageTitle: "Home",
            pageID: "index",
            pageType: "index",
            isLoggedIn: false
        });
    }
    else {
        // console.log("AUTHENTICATED IN INDEX!");
        var topicID = db.topic.id
        res.render("index", {
            pageTitle: "Home",
            pageID: "index",
            pageType: "index",
            isLoggedIn: true,
            user: req.user,
            topicID : topicID
        });
    }
});

module.exports = router;