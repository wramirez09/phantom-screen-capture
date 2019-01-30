var shell = require("shelljs");

module.exports.zipit = function(path, req, res) {
    
    if (shell) {

        shell.exec(`zip -r public/screenshots.zip ${path}`, function() {});
        req.query.multi = "true";
        req.query.zippath = "/screenshots.zip".toString();

        if (res) {
            res.status(200).send(req.query);
        }


    }
};

module.exports.removefiles = function() {
    // remove all old screenshot in directory  
    shell.exec('rm -rf ./public/ss/', function() {});
}

module.exports.removezip = function() {
    // remove all old screenshot in directory  
    shell.exec('rm -rf ./public/ss.zip', function() {});
}