var shell = require("shelljs");

module.exports.zipit = function(path, req, res) {
    
    if (shell) {
        console.log(req, 'req.query');

        shell.exec(`zip -r public/screenshots.zip ${path}`, function() {});
        req.query.multi = "true";
        req.query.zippath = "/screenshots.zip".toString();

        if (res) {
            console.log(req.query, "request to send from zipfiles.js");
            res.status(200).send(req.query);
        }


    }
};

module.exports.removefiles = function() {
    // remove all old screenshot in directory  
    shell.exec('rm -rf ./public/screenshots/', function() {});
}

module.exports.removezip = function() {
    // remove all old screenshot in directory  
    shell.exec('rm -rf ./public/screenshots.zip', function() {});
}