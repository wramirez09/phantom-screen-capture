
const puppeteer = require('puppeteer');
const fs = require('fs');
module.exports = function (url){
    
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');
    await page.screenshot({path: `./public/screenshots/${url}`});
  
    await browser.close();
  })();

}