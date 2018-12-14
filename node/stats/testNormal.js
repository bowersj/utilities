'use strict';

const normal = require( './normal.js' );

const iterations = 100000000;

const startNormal = new Date().getTime();

for( let i = 0; i < iterations; ++i ){
    normal.randomNumber();
}

const endNormal = new Date().getTime();



const startNormalLimited = new Date().getTime();

for( let i = 0; i < iterations; ++i ){
    normal.randomNumberLimited();
}

const endNormalLimited = new Date().getTime();



const startNormalSkewed = new Date().getTime();

for( let i = 0; i < iterations; ++i ){
    normal.randomNumberSkewed( -500, 1000, 3 );
}

const endNormalSkewed = new Date().getTime();



const startNormalInt = new Date().getTime();

for( let i = 0; i < iterations; ++i ){
    normal.randomInt( 1000 );
}

const endNormalInt = new Date().getTime();



const startNormalIntSkewed = new Date().getTime();

for( let i = 0; i < iterations; ++i ){
    normal.randomIntSkewed( -500, 1000, 3 );
}

const endNormalIntSkewed = new Date().getTime();


let normDiff = (( iterations/(endNormal - startNormal) ) * 1000).toLocaleString('en-US');
let normLimitedDiff = (( iterations/(endNormalLimited - startNormalLimited) ) * 1000).toLocaleString('en-US');
let normSkewedDiff = (( iterations/(endNormalSkewed - startNormalSkewed) ) * 1000).toLocaleString('en-US');
let normInt = (( iterations/(endNormalInt - startNormalInt) ) * 1000).toLocaleString('en-US');
let normIntSkewed = (( iterations/(endNormalIntSkewed - startNormalIntSkewed) ) * 1000).toLocaleString('en-US');


console.log( `Normal Random Number Iterations/Second: ${normDiff}` );
console.log( `Limited Normal Random Number Iterations/Second: ${normLimitedDiff}` );
console.log( `Skewed Normal Random Number Iterations/Second: ${normSkewedDiff}` );
console.log( `Normal Random Integer Iterations/Second: ${normInt}` );
console.log( `Skewed Normal Random Integer Iterations/Second: ${normIntSkewed}` );