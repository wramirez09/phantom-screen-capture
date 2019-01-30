module.exports.options = function(req, res){
    
    var queryObj = req.query,
        urly = req.query.singleurl,
        userAgent = req.query.userAgent;

    return {
        shotSize: {
            width: req.query.width ? req.query.width : 'all',
            height: req.query.height ? req.query.height : 'all'
        },
        screenSize: {
            width: req.query.screenwidth > 0 ? req.query.screenwidth : req.query.screenWidth,
            height: req.query.screenheight > 0 ? req.query.screenheight : req.query.screenHeight
        },
        shotOffset: {
            left: req.query.left,
            right: req.query.right,
            top: req.query.top,
            bottom: req.query.bottom
        },
        userAgent: userAgent,
        phantomConfig: { 'ignore-ssl-errors': 'true' },
        cookies: [
            {
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
        renderDelay: 3,
        timeout: 0,
        takeShotOnCallback: false

    }
}