/*
 * math.js
 *
 * This library is for math functions that do not exist in the provided Math object.
 *
 * TODO: need to add t test and t distribution to this library.
 *
 */


const getAverage = function( array ){
    if( !Array.isArray(array) ) throw new TypeError('You did not pass in an array');

    let sum = array.reduce( ( sum, value ) => {
        return sum + value;
    });

    return sum/( array.length );
};

// test cases for getAverage
// console.log( getAverage( [ 1, 1, 1, 1, 1 ] ) ); // should be 5
// console.log( getAverage( [ 1, 2, 3, 4, 5 ] ) ); // should be 3
// console.log( getAverage( {} ) );


const getStandardDeviation = function( array ){
    // just a quick refresher
    // standardDeviation = sqrt( 1/N * sum from 1 to N of (x - mu)^2 )
    // where N is the population size, x is each observation, and mu is the population average.
    // This function should technically only be used when the entire or when it is safe to
    // assume that you have the entire population's data. Which is only the case with big data...
    if( !Array.isArray(array) ) throw new TypeError('You did not pass in an array');
    // console.log( array );

    let avg = getAverage( array );

    // console.log( avg );

    let squareDiffs = array.map( ( value ) => {
        return Math.pow( ( value - avg ), 2);
    });

    // console.log(squareDiffs);

    let avgSquareDiff = getAverage(squareDiffs);

    return Math.sqrt( avgSquareDiff );
};


// console.log( getStandardDeviation( [ 179, 160, 136, 227 ] ) ); // should be 38.57892
// console.log( getStandardDeviation( [ 379, 360, 297, 456 ] ) ); // should be 65.49809
// console.log( getStandardDeviation( [ 79, 60, 97, 56 ] ) );     // should be 18.88562
// console.log( getStandardDeviation( [9, 2, 5, 4, 12, 7, 8, 11, 9, 3, 7, 4, 12, 5, 4, 10, 9, 6, 9, 4] ) );


const getSampleStandardDeviation = function( array ){
    // just a quick refresher
    // sampleStandardDeviation = sqrt( 1/(n-1) * sum from 1 to N of (x - xbar)^2 )
    // where n is the sample size, x is each observation, and xbar is the sample average.
    // This function is what should be ued unless you know you have all of your populations data.
    if( !Array.isArray(array) ) throw new TypeError('You did not pass in an array');
    // console.log( array );

    let avg = getAverage( array );
    // console.log( avg );

    let squareDiffs = array.map( ( value ) => { return Math.pow( ( value - avg ), 2) });
    // console.log(squareDiffs);

    let sumOfSquareDiffs = squareDiffs.reduce( (a, b) => { return a + b }, 0 );

    // console.log( sumOfSquareDiffs );

    let sampleVariance = sumOfSquareDiffs/( array.length - 1 );

    // console.log( sampleVariance );

    return Math.sqrt( sampleVariance );
};

// console.log( getSampleStandardDeviation( [9, 2, 5, 4, 12, 7] ) );  // should be 3.6193922141707713


const getMedian = function( array ){
    // just a quick refresher
    // median is the middle number when the sample count is odd
    // when the sample count is even it is the average of the two middle numbers
    if( !Array.isArray(array) ) throw new TypeError('You did not pass in an array');

    let median = 0;
    let count  = array.length;
    let sortedArray = array.sort();

    if( count % 2 === 0 ){
        // sample count is even
        median = ( sortedArray[ count/2 - 1 ] + sortedArray[ count/2 ] ) / 2;
    } else {
        // sample count is odd
        median = sortedArray[ ( count - 1 ) / 2 ];
    }

    return median
};

// console.log( getMedian( [1,2,3,4,5] ) ); // should be 3
// console.log( getMedian( [1,2,3,4] ) ); // should be 2.5


module.exports.getAverage = getAverage;
module.exports.getMedian = getMedian;
module.exports.getSampleStandardDeviation = getSampleStandardDeviation;
module.exports.getStandardDeviation = getStandardDeviation;
