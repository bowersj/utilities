/*
 * getDigit
 *
 * Purpose
 * Function for getting the digit at a specific index
 *
 * Examples
 * getDigit( 4321,0 ) => 1
 * getDigit( 4321,1 ) => 2
 * getDigit( 4321,2 ) => 3
 * getDigit( 4321,3 ) => 4
 */

function getDigit( int, digit ){
    return Math.floor( ( Math.abs( int ) / Math.pow( 10, digit ) ) % 10 )
}

// Test Cases

// console.log( getDigit( 4321, 2) );
// console.log( getDigit( 4325378941, 5) );
// console.log( getDigit( 43, 7) );

/*
 * getDigitCount
 *
 * Purpose
 * Function for getting the number of digits in an integer.
 *
 * Examples
 * getDigitCount(123)    => 3
 * getDigitCount(12)     => 2
 * getDigitCount(987456) => 6
 * getDigitCount(5468)   => 4
 *
 */
function getDigitCount( int ){
    return Math.floor( Math.log10( Math.abs( int ) ) ) + 1
}

// Test Cases
// console.log( getDigitCount( 1234 ) );


/*
 * getMaxDigitCount
 *
 * Purpose
 * get the maximum number of digits from integers in a list
 *
 * Examples
 * getMaxDigitCount([ 36,1,258,458,23,547,21 ])                 => 3
 * getMaxDigitCount([ 3669,28,4579,2533,5447,21,578,987,3252 ]) => 4
 * getMaxDigitCount([ 89,1,79,8,23,47,21 ])                     => 2
 *
 */
function getMaxDigitCount( ints ){
    let maxDigits = 0;
    for( let i = 0; i < ints.length;++i ){
        maxDigits = Math.max( maxDigits, getDigitCount( ints[i] ) )
    }
    return maxDigits;
}

// Test Cases
// console.log( getMaxDigitCount([ 1, 21, 32, 14, 123456 ]) );

module.exports.digit         = getDigit;
module.exports.digitCount    = getDigitCount;
module.exports.maxDigitCount = getMaxDigitCount;