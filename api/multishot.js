// var webshot = require('webshot');
const puppeteer = require('puppeteer');
var zipfiles = require('./zipfiles');
var shell = require("shelljs");

process.setMaxListeners(0);

module.exports.multishot = (req, res, host) => {

    var dir = host.replace(/(^\w+:|^)\/\//, '');

    shell.mkdir(`./public/ss/${dir}`);

    req.query.multiurl.forEach(url => {
        
        var path = url.replace(/^https?\:\/\//i, "").replace(/\/$/, "") + ".png";

            (async () => {
                
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setViewport({width: parseInt(req.query.screenWidth, 10) , height: parseInt(req.query.screenHeight, 10)})
                await page.goto(url);
                await page.screenshot({ path: `./public/ss/${path}`, fullPage: true });
                await browser.close();
                
                // await zipfiles.zipit(`./public/${host}`, req, res);
            })();
    });
};
