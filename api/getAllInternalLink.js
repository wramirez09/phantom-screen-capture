
/**
 * @param  {array} array - array of links from site
 */
module.exports.getAllInternalLink = function (array) {

    var newArrayOfInternalLinks = [];

    array.filter((link) => {

        if (link) {
            if (link.lastIndexOf("/") <= 0) {
                newArrayOfInternalLinks.push(link)
            }
            else {
            }
        }
    })

    return newArrayOfInternalLinks;

}