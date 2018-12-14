'use strict';


/*
 *
 * randomInt
 *
 * Purpose
 * Generate a random integer
 *
 * Parameters
 * @scalar - a number to scale the javascript random numbers by.
 *
 *
 * Examples
 * randomInt() => a random integer
 *
 *
 */
function randomInt( scalar ){
    return Math.floor( Math.random()*scalar )
}
// Test Cases
// console.log( randomInt(1000) );



function randomIntBounded(min, max ){
    return Math.floor( Math.random() * ( max - min ) ) + min;
}


function randomFloatBounded(min, max){
    return ( Math.random() * ( max - min ) ) + min;
}


function randomFloat( scalar ){
    return Math.random()*scalar;
}


module.exports.randomInt = randomInt;
module.exports.randomIntBounded = randomIntBounded;

module.exports.randomFloat = randomFloat;
module.exports.randomFloatBounded = randomFloatBounded;