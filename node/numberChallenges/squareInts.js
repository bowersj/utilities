/**
 * square every digit of a number
 * For example, if we run 9119 through the function, 811181 will come out, because 92 is 81 and 12 is 1.
 *  https://www.codewars.com/kata/square-every-digit?source=post_page-----72655b2e5edd----------------------
 */
function getNumOfDigits( int ){
    return Math.floor( Math.log10( Math.abs( int ) ) );
}


function squareDigits( int ){
    let res = [];
    let digitCount = getNumOfDigits( int );
    let digit = 0;
    let squaredDigit = 0;

    for( let i = digitCount; i >= 0; --i ){
        digit = Math.floor( ( Math.abs( int ) / Math.pow( 10, i ) ) % 10 );
        squaredDigit = Math.pow( digit, 2 );
        res.push( squaredDigit );
    }

    return Number.parseInt( res.join("") );
}

console.log( "Square Digits" );
console.log( "9119 =>", squareDigits( 9119 ) ); // => 811181
console.log( "123 =>", squareDigits( 123  ) );  // => 149