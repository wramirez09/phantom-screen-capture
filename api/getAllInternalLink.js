
/**
 * @param  {array} array - array of links from site
 */
module.exports.getAllInternalLink = function (array) {

    var newArrayOfInternalLinks = [];

    array.filter((link) => {


        if (link) {
            if (link.lastIndexOf("/") == 0) {
                newArrayOfInternalLinks.push(link)
            }
        }
    })
    
    let unique_array = newArrayOfInternalLinks.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });

    console.log(unique_array);

    return unique_array;

}