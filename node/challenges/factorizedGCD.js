/**
 * Find the greatest common divisor of two given integers. Each integer is given in the
 * form of its prime factorization - a sorted array of all prime factors of the number.
 *
 * Input/Output
 * [input] integer array a
 *
 * A prime factorization of an integer greater than 1.
 *
 * 1 ≤ a.length ≤ 30,
 *
 * 2 ≤ a[i] ≤ 97.
 *
 * [input] integer array b
 *
 * A prime factorization of an integer greater than 1.
 *
 * 1 ≤ b.length ≤ 20,
 *
 * 2 ≤ b[i] ≤ 97.
 *
 * [output] an integer
 *
 * Example
 * For a = [2, 3, 3, 3, 5] and b = [2, 2, 2, 2, 3, 3],
 *
 * the output should be 18.
 *
 * gcd(a, b) = gcd(270, 144).
 *
 * https://www.codewars.com/kata/590fdc0cc7d00e175b00011e
 *
 */

function factorizedGCD(a, b) {
    let gcd = 1;

    let objA = {};

    for( let i = 0; i < a.length; ++i ){
        if( objA[ a[i] ] )
            ++objA[ a[i] ];
        else
            objA[ a[i] ] = 1;
    }

    for( let i = 0; i < b.length; ++i ){
        if( objA[ b[i] ] ){
            --objA[ b[i] ];
            gcd *= b[i]
        }
    }

    return gcd;
}

/**
 * Test cases
 * [2, 3, 3, 3, 5],[2, 2, 2, 2, 3, 3] => 18
 * [7],[2, 3, 3, 3, 7] => 7
 * [3, 5, 11],[13, 17] => 1
 * [2, 2, 2],[3, 3, 3] => 1
 *
 */
console.log( factorizedGCD([2, 3, 3, 3, 5],[2, 2, 2, 2, 3, 3]), 18 );
console.log(factorizedGCD([7],[2, 3, 3, 3, 7]),7);
console.log(factorizedGCD([3, 5, 11],[13, 17]),1);
console.log(factorizedGCD([2, 2, 2],[3, 3, 3]),1);
