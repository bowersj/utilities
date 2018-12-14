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


function fibUpTo( position ){

    if( position === 0 ) return [ 1 ];
    if( position === 1 ) return [ 1 ];
    if( position === 2 ) return [ 1, 1 ];

    let fibSeq = [ 1, 1 ];

    let n1 = 1;
    let n2 = 1;

    // The -2 is because of the if statements at the beginning of the function.
    while( position - 2 > 0 ){
        --position;

        let n = n1 + n2;

        fibSeq.push( n );

        n2 = n1;
        n1 = n;
    }

    return fibSeq;

}
// Test Cases
// console.log( `position = 1   =>   ${JSON.stringify( fibUpTo( 1 ) )}` );
// console.log( `position = 2   =>   ${JSON.stringify( fibUpTo( 2 ) )}` );
// console.log( `position = 3    =>   ${JSON.stringify( fibUpTo( 3 ) )}` );
// console.log( `position = 4    =>   ${JSON.stringify( fibUpTo( 4 ) )}` );
// console.log( `position = 5    =>   ${JSON.stringify( fibUpTo( 5 ) )}` );
console.log( `position = 11   =>   ${JSON.stringify( fibUpTo( 11 ) )}` );


function fibStartEndAt( start, end ){

    if( end < start )throw new RangeError( 'The end must be bigger than the start.' );

    if( start === 0 && end === 0){
        console.warn( 'Zero (0) is not a valid start. Please start at 1.' );
        return [ 1 ]
    }
    if( start === 0 && end === 1){
        console.warn( 'Zero (0) is not a valid start. Please start at 1.' );
        return [ 1 ]
    }
    if( start === 1 && end === 1 ) return [ 1 ];
    if( start === 1 && end === 2 ) return [ 1, 1 ];

    let diff = end - start;

    let fibSeq = [];

    let n;
    let n1 = 1;
    let n2 = 1;

    if( start - 2 < 0 ){
        fibSeq = [ 1, 1 ];
        diff -= 2;
    } else if( start - 3 < 0 ){
        fibSeq = [ 1 ];
    } else if( start - 3 === 0 ){
        ++diff;
    }

    // The -3 is because of the if statements at the beginning of the function.
    while( start - 3 > 0 ){
        --start;

        n = n1 + n2;

        n2 = n1;
        n1 = n;
    }

    while( diff > 0 ){
        --diff;

        n = n1 + n2;

        fibSeq.push( n );

        n2 = n1;
        n1 = n;
    }

    return fibSeq;
}
// Test Cases
// console.log( `start = 1, end = 1    =>    ${JSON.stringify( fibStartEndAt( 1, 1 ) )}` );
// console.log( `start = 1, end = 2    =>    ${JSON.stringify( fibStartEndAt( 1, 2 ) )}` );
// console.log( `start = 2, end = 4    =>    ${JSON.stringify( fibStartEndAt( 2, 4 ) )}` );
// console.log( `start = 3, end = 7    =>    ${JSON.stringify( fibStartEndAt( 3, 7 ) )}` );


module.exports.endAtPosition = fibUpTo;
module.exports.startEndAtPosition = fibStartEndAt;