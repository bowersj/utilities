/**
 * https://www.codewars.com/kata/count-the-smiley-faces/solutions/javascript
 */

//return the total number of smiling faces in the array

module.exports = countSmileys;

function getValue( smile ){
    switch( smile ){
        case ":-)":
        case ":~)":
        case ":-D":
        case ":~D":
        case ":)":
        case ":D":
        case ";-)":
        case ";~)":
        case ";-D":
        case ";~D":
        case ";)":
        case ";D":
            return 1;
        default:
            return 0
    }
}


function countSmileys(arr) {
    let count = 0;

    for( let i = 0, l = arr.length; i < l; ++i )
        count += getValue( arr[i] );

    return count;
}