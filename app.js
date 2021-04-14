const express = require("express");
const devcert = require("devcert");
const https = require("https");
const fs = require("fs");
const path = require("path");

const port = 3000;
const app = express();
const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
}, app);

sslServer.listen(port, function () {
    console.log(`Listening on port: ${port}`);
});

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render('index', {title: 'HomeWork API - Facebook API'});
});

app.get("/about", function (req, res) {
    res.render("about", { title: 'Facebook API - About Page'});
});

app.get("/api", function (req, res) {
    res.render("api", { title: 'Facebook API - API Page'});
});

//Serves resources from public folder
app.use('/public', express.static('public'));
app.use(function (req, res) {
    res.render("404", { title: "404 Error! Page Not Found" });
});