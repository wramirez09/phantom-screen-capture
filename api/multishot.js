var webshot = require('webshot');
var zipfiles = require('./zipfiles');
var shell = require("shelljs");
module.exports.multishot = function(req, res) {

    var urls = req.query.multiurl;

    var urlsArray = urls.split(",").map(function(url) {
        return url.trim();
    })

    var itemsprocessed = 0;

    urlsArray.forEach(function(url, i, urlsArray) {

        // options 
        options = {
            shotSize: {
                width: req.query.width ? req.query.width : 'all',
                height: req.query.height ? req.query.height : 'all'
            },
            screenSize: {
                width: req.query.screenWidth,
                height: req.query.screenHeight
            },
            shotOffset: {
                left: req.query.left,
                right: req.query.right,
                top: req.query.top,
                bottom: req.query.bottom
            },
            phantomConfig: { 'ignore-ssl-errors': 'true' },
            cookies: [{
                    name: req.query.cookie1Name,
                    value: req.query.cookie1Value,
                    path: req.query.cookie1Path,
                    domain: req.query.cookie1Domain
                },
                {
                    name: req.query.cookie2Name,
                    value: req.query.cookie2Value,
                    path: req.query.cookie2Path,
                    domain: req.query.cookie2Domain
                }
            ],
            customHeaders: null,
            defaultWhiteBackground: false,
            customCSS: req.query.css,
            quality: 75,
            siteType: "url",
            renderDelay: 1,
            timeout: 0,
            takeShotOnCallback: false
        };

        // create file name 
        var path = "public/screenshots/" + url.replace(/^https?\:\/\//i, "").replace(/\/$/, "") + ".png";

        // remove https amd ending slash off url 
        req.query.filename = url.replace(/^https?\:\/\//i, "").replace(/\/$/, "") + ".png";

        /* remove old screenshots from directory  */
        zipfiles.removefiles();

        /* remove zip file  */
        zipfiles.removezip();

        // call webshot and create a screenshot
        webshot(url, path, options, function(err)

            {
                if (err) {
                    console.log(err, "err")
                } else {
                    console.log("shooting", path);

                    itemsprocessed++;

                    console.log("items processed", itemsprocessed, "array length",
                        urlsArray.length)

                    if (itemsprocessed === urlsArray.length) {
                        zipfiles.zipit("public/screenshots/", req, res);
                    }

                }
            });

    }, this);

}