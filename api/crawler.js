var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var multishot = require('./multishot');



module.exports.crawl = function(req, res) {

    var pageToVisit = req.query.singleurl;

    function extractHostname(url) {

        var hostname;

        if (url.indexOf("://") > -1) {
            var arrayurl = url.split('/')
            hostname = arrayurl[0] + "//" + arrayurl[2]
                // hostname = url.split('/')[2];
        } else {
            hostname = url.split('/')[0];
        }

        //find & remove "?"
        hostname = hostname.split('?')[0];

        return hostname;
    }

    // request call 
    request(pageToVisit, function(error, response, body, host) {
        if (error) {
            console.log("Error: " + error);
        }


        // Check status code (200 is HTTP OK)
        console.log("Status code: " + response.statusCode);
        if (response.statusCode === 200) {

            // Parse the document body
            $ = cheerio.load(body);
            var array_links = [];
            links = $('a'); //jquery get all hyperlinks

            //create the array - using jquery gungdum style 
            $(links).each(function(i, link) {
                array_links.push($(link).attr('href'));
            });

            // filter to only the internal links
            array_links = array_links.filter(function(c) {
                return !c.match(/^(?:https?:|www\.)/)
            });


            // add back domain to relative urls in order for webshot to proces them.
            var newArray = array_links.map(function(link) {
                var host = extractHostname(pageToVisit);
                return host + link;
            });
            console.log("new array of urls", newArray);

            // console.log(newArray, 'new array_links ');
            req.query.multiurl = newArray.toLocaleString();
            multishot.multishot(req, res);

        }
    });
};