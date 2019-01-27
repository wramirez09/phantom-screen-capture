// var webshot = require('webshot');
const puppeteer = require('puppeteer');
var zipfiles = require('./zipfiles');
// var shell = require("shelljs");

const fs = require('fs')

process.setMaxListeners(0);

module.exports.multishot = (req, res, host) => {

    var dir = host.replace(/(^\w+:|^)\/\//, '');

    // shell.mkdir(`./public/ss/${dir}`);
    fs.mkdir(`./public/ss/${dir}`, ()=>{
        console.log('dir created')
    });

    req.query.multiurl.forEach((url, i) => {
        
        var path = url.replace(/^https?\:\/\//i, "").replace(/\/$/, "") + ".png";

        
            (async () => {
                console.log(`shooting ${path}, ${i}`);    
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setViewport({width: parseInt(req.query.screenWidth, 10) , height: parseInt(req.query.screenHeight, 10)})
                await page.goto(url);
                await page.screenshot({ path: `./public/ss/${path}`, fullPage: true });
                await browser.close();
                if(i === req.query.multiurl.length - 1){
                    console.log(`reached end of the array ${i}`);
                    zipfiles.zipit('./public/ss/', req, res);
                }
            })();
    });

    if(req.query.multiurl.length === req.query.multiurl.legth -1) {
        console.log(`end of array`)
    }
};
