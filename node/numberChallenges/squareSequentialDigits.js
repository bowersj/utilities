/**
 * Consider a sequence of numbers a0, a1, ..., an, in which an element is equal to the sum of squared digits of the
 * previous element. The sequence ends once an element that has already been in the sequence appears again.
 *
 * for example
 * For a0 = 16, the output should be 9
 *  https://www.codewars.com/kata/5886d65e427c27afeb0000c1
 */
function squareDigits_sum( int ){
    let sum = 0;
    let digitCount = Math.floor( Math.log10( Math.abs( int ) ) ) + 1;
    let digit = 0;
    let pow = 0;

    for( let i = digitCount; i >= 0; --i ){
        pow = Math.pow( 10, i );
        digit = Math.floor( ( Math.abs( int ) / pow ) % 10 );
        sum += Math.pow( digit, 2 );
    }

    return sum;
}

// console.log( squareDigits_sum( 4 ) );

function squareDigitsSequence( int ){

    let seq = new Set();
    seq.add( int );
    let val = squareDigits_sum( int );

    while( true ){
        if( seq.has( val ) )
            break;
        else
            seq.add( val );

        val = squareDigits_sum( val )
    }

    return ([ ...seq ]).length + 1;
}

console.log( "Square Digits Sequence" );
console.log( "16 =>", squareDigitsSequence( 16 ) );
console.log( "103 =>", squareDigitsSequence( 103 ) );