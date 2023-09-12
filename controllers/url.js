const shortId = require("shortid");
const url = require("../models/url");


async function handleGenerateShortURL(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "URL is requried"});
    const shortID = shortid()   ;
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: [] 
    });

    return res.render("home", {
        id: shortID,
    });
}

async function handleGetAnalytics (req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitedHistory})
}

module.exports = {
    handleGenerateShortURL,
    handleGetAnalytics,
}