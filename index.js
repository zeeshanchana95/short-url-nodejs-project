const express = require("express")
const {connectToMongoDB} = require("./connect");
const urlRoute = require("./router/url");
const URL = require("./models/url");
const path = require("path");
const staticRoute = require("./router/staticRouter");

const app = express();
const PORT = 8001;

//connect with database
connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("Mongodb connected"));

//setting tempate engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); //telling path

//setting format to get input data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,
    });
})

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneIdAndUpdate(
        {
            shortId
        },
        {
            $push:{
                visitedHistory: {
                    timestamp: Date.now()
                },
            }
        }
    );
    res.redirect(entry.redirectURL);
})

app.listen(PORT, (req, res) => console.log(`Server started at port: ${PORT}`));
