'use strict';

const get = require( './helperFunctions.js' );


/*
 * radixSort
 *
 * Purpose
 * Sort integers using the properties of integers
 *
 * Examples
 * radixSort([ 36,1,258,458,23,547,21 ])                 => [ 1, 21, 23, 36, 258, 458, 547 ]
 * radixSort([ 3669,28,4579,2533,5447,21,578,987,3252 ]) => [ 21, 28, 578, 987, 2533, 3252, 3669, 4579, 5447 ]
 * radixSort([ 89,1,79,8,23,47,21 ])                     => [ 1, 8, 21, 23, 47, 79, 89 ]
 *
 */
function radixSort( ints, base = 10 ){

    let maxNumOfDigits = get.maxDigitCount(ints);

    for( let i = 0; i < maxNumOfDigits; ++i ){

        // since arrays and objects are passed by reference a new one needs to be created every time.
        let buckets = Array.from( {length: 10}, () => [] );

        for( let j = 0; j < ints.length; ++j ){
            let digit = get.digit( ints[j], i );
            buckets[ digit ].push( ints[j] );
        }

        ints = [].concat( ...buckets );
    }

    return ints;
}
// Test Cases
// console.log(radixSort([ 36,1,258,458,23,547,21 ]));
// console.log(radixSort([ 3669,28,4579,2533,5447,21,578,987,3252 ]));
// console.log(radixSort([ 89,1,79,8,23,47,21 ]));

module.exports.radix = radixSort;
