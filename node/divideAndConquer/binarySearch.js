/*
 * To import use the following
 *
 * const binary = require('~/utilities/divideAndConquer/binarySearch.js')
 *
 */

/*
 * binarySearch
 *
 * Purpose
 * Search through a sorted list, that is a list in ascending order,
 * to find the location, or index, of the value you are looking for;
 * if it does not exist then the function returns -1.
 *
 * Given the following list below which below that are examples of calling
 * binarySearch and the results of the call
 * [ 0,2,4,6,8,9,10 ]
 *
 * binarySearch( 4 )  // => 2
 * binarySearch( 10 ) // => 6
 * binarySearch( -2 ) // => -1
 *
 */
function binarySearch( arr, search ) {
    let start = 0;
    let end   = arr.length;

    //
    while( start <= end ){
        // get the middle of the list as a reference to allow for
        // identifying which half to ignore while searching through it.
        let mid = Math.floor( ( end - start )/2 ) + start;

        if( arr[mid] === search ) return mid;

        // logic for what to ignore as the algorithm is searching
        // through the list.
        if( arr[mid] < search ) start = mid + 1;
        else end = mid - 1;
    }

    return -1
}

// Test cases
// console.log(
//     binarySearch(
//         [1,2,3,4,5],
//         2
//     )
// );
// console.log(
//     binarySearch(
//         [1,2,3,4,5],
//         3
//     )
// );
// console.log(
//     binarySearch(
//         [1,2,3,4,5],
//         5
//     )
// );
// console.log(
//     binarySearch(
//         [1,2,3,4,5],
//         6
//     )
// );
// console.log(
//     binarySearch(
//         [5,6,10,13,14,18,30,34,35,37,40,44,64,79,84,86,95,96,98,99],
//         10
//     )
// );
// console.log(
//     binarySearch(
//         [5,6,10,13,14,18,30,34,35,37,40,44,64,79,84,86,95,96,98,99],
//         95
//     )
// );
// console.log(
//     binarySearch(
//         [5,6,10,13,14,18,30,34,35,37,40,44,64,79,84,86,95,96,98,99],
//         100
//     )
// );

// TODO: needs much more through testing to ensure it is working properly
function binarySearch_byOptionalProperty( arr, search, opts = {} ) {

    opts = Object.assign( { by: null }, opts );

    // build retriever
    function buildGetter( opts ){
        if( opts.by !== null )
            return function ( val ){
                if( val )
                    return val[ opts.by ];
                else
                    return undefined;
            };
        else
            return function ( val ){
                return val;
            };
    }


    let getVal = buildGetter( opts );

    let start = 0;
    let end   = arr.length;

    while( start <= end ){
        // get the middle of the list as a reference to allow for
        // identifying which half to ignore while searching through it.
        let mid = Math.floor( ( end - start )/2 ) + start;

        if( getVal( arr[mid] ) === search ) return mid;

        // logic for what to ignore as the algorithm is searching
        // through the list.
        if( getVal( arr[mid] ) < search ) start = mid + 1;
        else end = mid - 1;
    }

    return -1
}


// let arr = [ 1,2,3,4,5,6,7,8 ];
// let arr2 = [
//     { id:1, str: "hi" },
//     { id:2, str: "there" },
//     { id:3, str: "again" },
//     { id:4, str: "and" },
//     { id:5, str: "again" },
//     { id:6, str: "and" },
//     { id:7, str: "again" },
//     { id:8, str: "hi" },
// ];
// console.log( binarySearch( arr, 5 ) );
// console.log( binarySearch( arr2, -1, { by: "id" } ) );

module.exports.search = binarySearch;