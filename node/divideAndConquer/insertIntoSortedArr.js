/**
 * Inserting into a sorted list
 *
 * Once a list is sorted, a potentially expensive operation, the last thing you want to do is
 * resort it after you have added some stuff, at least in theory land ;). So making sure you
 * insert things in sorted order is important, which is where insertion sort comes in. The
 * problem with insertion sort is that it is potentially slow, worst case of O(n). So, how
 * can we make this better? Well... Binary search of course. To be precise, the binary search
 * algorithm will need to be tweaked a little bit to account for some cases but the theory is
 * the same, jump around in a smart manor such that you are eliminating half of your
 * possibilities every time you jump until you only have one possibility left. So how does it
 * work? Simple, instead of Binary search returning -1 for a non existing value it needs to
 * return the index where the value it was looking for should be located. This is where we
 * have to harness the raw power of binary search but tweak it. So, what is there to tweak,
 * there are three cases to consider when every working with a sequence, list, or array of
 * sorted numbers, is the number greater than, less than, or equal to the value I'm looking
 * for.
 *
 * If the last number is less than what we are looking for we need to add one to
 * the index so we don't insert it before the smaller value, making our sorted array no
 * longer sorted.
 *
 * If the last number is greater than what we are looking for we are good to
 * go.
 *
 * And finally if they are equal it can go right before or after and the list be sorted.
 *
 * This is the extra logic we have to add to the binary search algorithm. (see comment for details)
 * With this enhanced binary search, we now know where to put the value to be inserted which means,
 * at least in JS you can use splice and add it right in.
 *
 * Recall that I said "at least in theory land ;)." The reason for this is MALCS, the bane of
 * performance in JS. You cannot control them, along with garbage collecting, and they occur
 * at predetermined sizes which might not fit your use case. So why are they an issue? Simply
 * because you are increasing the size of an array by one and as such more memory is needed.
 * For this simple reason, getting performance metrics in JS is difficult but I would predict
 * 100,000's opts/sec based on some tests at the end of the file and the computer running them.
 * Now for a Database that is slow, but client side where you are dealing with only 100's to 1000's
 * of sorted items, this would work great. So, if you want to deal with larger arrays, in the
 * 10000's or above, instead of binary search on an array do a singly, or doubly, linked list
 * utilizing their high insert performance but you sacrifice your random access. Just some
 * thoughts to consider.
 *
 *
 */
const stats = require( "./../stats/base.js" );

/*
 * This is a binary search algorithm for returning where something is or should be.
 */
function binarySearch( arr, search ) {
    let start = 0;
    let end = arr.length;
    let mid = 0;
    let valLessThanSearch = arr[mid] < search;

    //
    while( start <= end ){
        // get the middle of the list as a reference to allow for
        mid = Math.floor( ( end - start )/2 ) + start;
        // identifying which half to ignore while searching through it.
        valLessThanSearch = arr[mid] < search;

        if( arr[mid] === search ) return mid;

        // logic for what to ignore as the algorithm is searching
        // through the list.
        if( valLessThanSearch ) start = mid + 1;
        else end = mid - 1;
    }

    // accounting for the value not existing to the right of the last touched index
    if( valLessThanSearch ) return start;
    else return mid;
//     else end = mid - 1;
}


function insertIntoSorted( arr, value ){
    // if( arr.length === 0 ){
    //     arr.push( value );
    //     return arr;
    // }

    let index = binarySearch( arr, value );

//     console.log( "index", index );

    arr.splice( index, 0, value );

    // console.log( arr );
    return arr;
}


// Test cases
let arr1 = [1,2,3,4,5];
let arr2 = [5,6,10,13,14,18,30,34,35,37,40,44,64,79,84,86,95,96,98,99];

// console.log(
//     binarySearch(
//         arr1,
//         2
//     ),
//     1
// );
// console.log(
//     binarySearch(
//         arr1,
//         3
//     ),
//     2
// );
// console.log(
//     binarySearch(
//         arr1,
//         5
//     ),
//     4
// );
// console.log(
//     binarySearch(
//         arr1,
//         6
//     ),
//     5
// );
// console.log(
//     binarySearch(
//         arr2,
//         10
//     ),
//     2
// );
// console.log(
//     binarySearch(
//         arr2,
//         95
//     ),
//     16
// );
//
// console.log(
//     binarySearch(
//         arr2,
//         100
//     ),
//     20
// );

// console.log( insertIntoSorted( arr2, 100 ), 20 );
// console.log( arr2[ 20 ] === 100 );

// console.log( arr3, "[ 100 ]" );

// let arr3 = [];
// insertIntoSorted( arr3, 100 );
// insertIntoSorted( arr3, -3 );
// console.log( arr3, "[ -3, 100 ]" );

// insertIntoSorted( arr3, 102 );
// console.log( arr3, "[ -3, 100, 102 ]" );

// insertIntoSorted( arr3, 0 );
// console.log( arr3, "[ -3, 0, 100, 102 ]" );

// insertIntoSorted( arr3, 101 );
// console.log( arr3, "[ -3, 0, 100, 101, 102 ]" );

function parseTestTimes( arrOfNumbers ){
    return {
        avg: Math.floor( stats.getAverage( arrOfNumbers ) ).toLocaleString( "en-US" ),
        med: Math.floor( stats.getMedian( arrOfNumbers ) ).toLocaleString( "en-US" ),
        std: Math.floor( stats.getSampleStandardDeviation( arrOfNumbers ) ).toLocaleString( "en-US" )
    }
}

function test( initialLength, numOfItemsToAdd, func ){
    let arr = [];

    for( let i = 0; i < initialLength; ++i ){
        insertIntoSorted( arr, func( i ) );
    }

    let copy = JSON.parse( JSON.stringify( arr ) );

    let start = new Date().getTime();
    let res = [];

    for( let j = 0; j < 10; ++j ){

        start = new Date().getTime();

        for( let i = 0; i < numOfItemsToAdd; ++i ){
            insertIntoSorted( copy, func( i ) );
        }

        res.push( ( ( numOfItemsToAdd / ( new Date().getTime() - start ) ) * 1000 ) );

        copy = JSON.parse( JSON.stringify( arr ) );

    }

    return parseTestTimes( res );
}

// console.log( test( 1000, 50000, () => Math.floor( Math.random() * 1000 ) ) );
