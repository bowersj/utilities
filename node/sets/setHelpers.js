"use strict";

function uniqueSet( SOURCE ){
    let len = SOURCE.length;
    let res = [];
    let seen = new Set();

    let val;

    for( let i = 0; i < len; ++i ){
        val = SOURCE[i];

        if( seen.has( val ) ) continue;

        seen.add( val );
        res.push( val );
    }

    return res;
}

// let test = [];
//
// for( let i = 0; i < 200000; ++i ){
//     test.push( Math.random() );
// }
//
// let start = new Date().getTime();
//
// uniqueSet( test );
//
// let end = new Date().getTime();
//
// console.log( end - start );

//useful set functions


function toArray( set ){
    return[ ...set ];
}


// functions taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

function isSuperset(set, subset) {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}

function union(setA, setB) {
    const _union = new Set(setA);
    for (let elem of setB) {
        _union.add(elem);
    }
    return _union;
}

function intersection(setA, setB) {
    const _intersection = new Set();
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}

function symmetricDifference(setA, setB) {
    const _difference = new Set(setA);
    for (let elem of setB) {
        if (_difference.has(elem)) {
            _difference.delete(elem);
        } else {
            _difference.add(elem);
        }
    }
    return _difference;
}

function difference(setA, setB) {
    const _difference = new Set(setA);
    for (let elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}

