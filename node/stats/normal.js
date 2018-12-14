'use strict';




/*
 * normalRandomNumber
 *
 * Purpose
 * Generate a random number from the normal distribution.
 *
 * Algorithm was found at
 * https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve/36481059#36481059
 *
 * It is important to note that the range will fall between [ -3.1, 3.24 ] most of the time
 *
 * Keep in mind that this function generates both positive and negative numbers.
 *
 * Box-Muller transformation information
 * https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
 *
 */
function normalRandomNumber(){

    // independent samples
    let u = 0;
    let v = 0;

    while( u === 0 ) u = Math.random(); // making the range not inclusive i.e. (0,1)
    while( v === 0 ) v = Math.random(); // making the range not inclusive i.e. (0,1)

    // Box-Muller transformation
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
}


/*
 *
 * normalRandomNumber_limited
 *
 * Purpose
 * Generate a random number from the normal distribution with in 3.6 std. deviations from the mean.
 *
 *
 */
function normalRandomNumber_limited(){

    // independent samples
    let u = 0;
    let v = 0;

    while( u === 0 ) u = Math.random(); // making the range not inclusive i.e. (0,1)
    while( v === 0 ) v = Math.random(); // making the range not inclusive i.e. (0,1)

    // Box-Muller transformation
    let normalRandomNumber = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    // fit to interval [0,1]
    let normalRanNum = normalRandomNumber/ 10.0 + 0.5;

    // make sure number is in the interval [ 0,1 ]
    if( normalRanNum > 1 || normalRanNum < 0) return normalRandomNumber_limited();
    return normalRanNum;
}

function normalRandomNumberSkewed(min, max, skew){

    if( !min ) throw new ReferenceError( 'min must be provided.' );
    if( !max ) throw new ReferenceError( 'max must be provided.' );
    if( !skew ) throw new ReferenceError( 'skew must be provided.' );

    if( typeof min !== "number" ) throw new ReferenceError( 'min must be provided.' );
    if( typeof max !== "number" ) throw new ReferenceError( 'max must be provided.' );
    if( typeof skew !== "number" ) throw new ReferenceError( 'skew must be provided.' );

    // independent samples
    let u = 0;
    let v = 0;

    while( u === 0 ) u = Math.random(); // making the range not inclusive i.e. (0,1)
    while( v === 0 ) v = Math.random(); // making the range not inclusive i.e. (0,1)

    // Box-Muller transformation
    let normalRandomNumber = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    // fit to interval [0,1]
    let normalRanNum = normalRandomNumber/ 10.0 + 0.5;

    // make sure number is in the interval [ 0,1 ]
    if( normalRanNum > 1 || normalRanNum < 0) return normalRandomNumber_limited();

    // skewing distribution
    normalRanNum = Math.pow( normalRanNum, skew );

    // fit to interval
    normalRanNum *= max - min;

    // grantee minimum
    normalRanNum += min;

    return normalRanNum;
}


function normalRandomInt( scalar ){
    return Math.round( normalRandomNumber() * scalar );
}
// Test Cases
// console.log( normalRandomInt( 1000 ) );


/*
 * normalRandomIntSkewed
 *
 * If you want to scale the numbers use the skew to do so.
 * Skew is the power applied to the random number generated.
 *
 */
function normalRandomIntSkewed( min, max, skew ){
    return Math.floor( normalRandomNumberSkewed( min, max, skew ) );
}


module.exports.randomNumber = normalRandomNumber;
module.exports.randomNumberLimited = normalRandomNumber_limited;
module.exports.randomNumberSkewed = normalRandomNumberSkewed;

module.exports.randomInt = normalRandomInt;
module.exports.randomIntSkewed = normalRandomIntSkewed;