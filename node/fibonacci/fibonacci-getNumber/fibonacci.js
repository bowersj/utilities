'use strict';

/*
 * fibonacci-loop.js
 *
 * Purpose
 * To provide two functions to get up to a certain place in the fibonacci sequence or start at a specific
 * place and return a the fibonacci sequence starting at that point.
 *
 *
 * Note below is the first 11 fibonacci sequence numbers.
 * 1,1,2,3,5,8,13,21,34,55,89...
 *
 *
 */


function fibRecursiveNumberAt( position ){

    if( position === 0 ) return 1;
    if( position === 1 ) return 1;
    if( position === 2 ) return 1;

    return fibRecursiveNumberAt( position - 1 ) + fibRecursiveNumberAt( position - 2 );

}
// Test Cases
// console.log( `position = 1    =>   ${JSON.stringify( fibRecursiveNumberAt( 1 ) )}` );
// console.log( `position = 2    =>   ${JSON.stringify( fibRecursiveNumberAt( 2 ) )}` );
// console.log( `position = 3    =>   ${JSON.stringify( fibRecursiveNumberAt( 3 ) )}` );
// console.log( `position = 4    =>   ${JSON.stringify( fibRecursiveNumberAt( 4 ) )}` );
// console.log( `position = 5    =>   ${JSON.stringify( fibRecursiveNumberAt( 5 ) )}` );
// console.log( `position = 25   =>   ${JSON.stringify( fibRecursiveNumberAt( 25 ) )}` );


function fibNumberAt( pos ){
    if( pos === 0 ) return 1;
    if( pos === 1 ) return 1;
    if( pos === 2 ) return 1;

    let n;
    let n1 = 1;
    let n2 = 1;

    while( pos > 0 ){

        n2 = n1;
        n1 = n1 + n2;

        --pos
    }

    return n1 + n2
}
// Test Cases
console.log( `position = 1    =>   ${JSON.stringify( fibNumberAt( 1 ) )}` );
console.log( `position = 2    =>   ${JSON.stringify( fibNumberAt( 2 ) )}` );
console.log( `position = 3    =>   ${JSON.stringify( fibNumberAt( 3 ) )}` );
console.log( `position = 4    =>   ${JSON.stringify( fibNumberAt( 4 ) )}` );
console.log( `position = 5    =>   ${JSON.stringify( fibNumberAt( 5 ) )}` );
console.log( `position = 25   =>   ${JSON.stringify( fibNumberAt( 99 ) )}` );


module.exports.nubmerAt = fibNumberAt;
module.exports.recNubmerAt = fibRecursiveNumberAt;