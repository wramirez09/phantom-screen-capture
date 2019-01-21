// var webshot = require('webshot');
const puppeteer = require('puppeteer');
var zipfiles = require('./zipfiles');
var shell = require("shelljs");

process.setMaxListeners(0);

module.exports.multishot = (req, res, host)=>{

    var dir = host.replace(/(^\w+:|^)\/\//, '');

    console.log("host", dir);

    shell.mkdir(`${dir}`);

    req.query.multiurl.forEach(url => {
        // create file name 
        
        var path = url.replace(/^https?\:\/\//i, "").replace(/\/$/, "") + ".png";

        (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await (()=>{
                if(url){
                    page.goto(url);
                }
            }
            )()
        await page.screenshot({path: path, fullPage: true });
    
        await browser.close();
        // await zipfiles.removefiles();
        // await zipfiles.zipit(`./public/${host}`, req, res);
      })();    
    });
};

















/*** old implemetation REF only */


// require('events').emitter.setMaxListeners(0);
// emitter.setMaxListeners(0)
// module.exports.multishot = function(req, res) {

//     var itemsprocessed = 0;
//     var urls = req.query.multiurl;
//     var urlsArray = urls.split(",").map(function(url) {
//         return url.trim();
//     })
    

//     urlsArray.map(function(url, i, urlsArray) {

//         // options 
//         options = {
//             shotSize: {
//                 width: req.query.width ? req.query.width : 'all',
//                 height: req.query.height ? req.query.height : 'all'
//             },
//             screenSize: {
//                 width: req.query.screenWidth,
//                 height: req.query.screenHeight
//             },
//             shotOffset: {
//                 left: req.query.left,
//                 right: req.query.right,
//                 top: req.query.top,
//                 bottom: req.query.bottom
//             },
//             phantomConfig: { 'ignore-ssl-errors': 'true' },
//             cookies: [{
//                     name: req.query.cookie1Name,
//                     value: req.query.cookie1Value,
//                     path: req.query.cookie1Path,
//                     domain: req.query.cookie1Domain
//                 },
//                 {
//                     name: req.query.cookie2Name,
//                     value: req.query.cookie2Value,
//                     path: req.query.cookie2Path,
//                     domain: req.query.cookie2Domain
//                 }
//             ],
//             customHeaders: null,
//             defaultWhiteBackground: false,
//             customCSS: req.query.css,
//             quality: 75,
//             siteType: "url",
//             renderDelay: 1,
//             timeout: 0,
//             takeShotOnCallback: false
//         };

//         // create file name 
//         var path = "./public/ss/" + url.replace(/^https?\:\/\//i, "").replace(/\/$/, "") + ".png";

//         // remove https amd ending slash off url 
//         req.query.filename = url.replace(/^https?\:\/\//i, "").replace(/\/$/, "") + ".png";

//         /* remove old screenshots from directory  */
//         zipfiles.removefiles();

//         /* remove zip file  */
//         zipfiles.removezip();

//         (async () => {
//             const browser = await puppeteer.launch();
//             const page = await browser.newPage();
//             await console.log('url to shoot', url);
//             await page.goto(url);
//             await (() => { 
//                 try {
//                     setTimeout(()=>{
//                         page.screenshot({ path: path, fullPage: true }); 
//                         console.log('shooting', path)
//                     },1000 * i)
                    
//                 }
//                 catch(e) {
//                     console.log('error', e)
//                 }
//             })();
//             // await res.send(req.query);
//             await (()=>{
//                     console.log("shooting", path);
//                     itemsprocessed++;
//                     console.log("items processed", itemsprocessed, "array length", urlsArray.length);
                
//                 if (itemsprocessed === urlsArray.length) {
//                     zipfiles.zipit("./public/ss/", req, res);
//                 }
//              })
//             // await browser.close();
//           })();


//     }, this);

// }