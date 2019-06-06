"use strict";

function uniqueSet( SOURCE ){
    let len = SOURCE.length;
    let res = [];
    let seen = new Set();

    let val;

    for( let i = 0; i < len; ++i ){
        val = SOURCE[i];

        if( seen.has( val ) ) continue;

        seen.add( val );
        res.push( val );
    }

    return res;
}

// let test = [];
//
// for( let i = 0; i < 200000; ++i ){
//     test.push( Math.random() );
// }
//
// let start = new Date().getTime();
//
// uniqueSet( test );
//
// let end = new Date().getTime();
//
// console.log( end - start );