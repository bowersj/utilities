/**
 * copied from https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
 *
 * conclusion
 *
 * recursion verses iterative
 * In this case, recursive approach is just as fast as the iterative approach.
 *
 * flat package ( https://www.npmjs.com/package/flat )
 * It is four times slower than the functions I found and as such, it's probably not a good choice for flattening
 * JSON, probably because it has to account for edge cases that JSON bypasses.
 *
 * wrap up
 * Either way you look at it, deeply nested objects are expensive to flatten and reconstruct.
 * For this reason it should be used sparingly or when there are not very many levels to traverse.
 *
 */
// run npm i flat before uncommenting this line
// let obj = require('flat');

// console.log( obj.flatten( fillObj( {}, 2 ) ) );


JSON.unflatten = function(data) {
    "use strict";
    if (Object(data) !== data || Array.isArray(data))
        return data;
    let result = {}, cur, prop, idx, last, temp;
    for(let p in data) {
        cur = result, prop = "", last = 0;
        do {
            idx = p.indexOf(".", last);
            temp = p.substring(last, idx !== -1 ? idx : undefined);
            cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
            prop = temp;
            last = idx + 1;
        } while(idx >= 0);
        cur[prop] = data[p];
    }
    return result[""];
};

// convert to a none recursive function and see if there are any performance gains
JSON.flattenRecursive = function(data) {
    let result = {};
    function recurse (cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            let l = cur.length;
            for(let i = 0; i < l; ++i)
                recurse(cur[i], prop ? prop+"."+i : ""+i);
            if (l === 0)
                result[prop] = [];
        } else {
            let isEmpty = true;
            for (let p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop+"."+p : p);
            }
            if (isEmpty)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
};


function Node( data, path ){
    this.data = data;
    this.path = path
}


JSON.flatten = function(data) {
    let result = {};
    let stack = [ new Node( data, "" ) ];

    let cur = {};
    let prop = "";
    let temp = new Node( {}, "" );
    let res = {};


    while( stack.length > 0 ){

        temp = stack.pop();
        cur = temp.data;
        prop = temp.path;

        if ( Object(cur) !== cur ) {

            result[prop] = cur;
//             return new Node( cur, prop );

        } else if (Array.isArray(cur)) {

            let l = cur.length;
            for(let i = 0; i < l; ++i)
                stack.push( new Node( cur[i], prop ? prop+"."+i : ""+i ) );

            if (l === 0)
                result[prop] = [];

        } else {
            let isEmpty = true;
            for (let p in cur) {
                isEmpty = false;
                stack.push( new Node( cur[p], prop ? prop+"."+p : ""+p ) )
            }
            if (isEmpty)
                result[prop] = {};
        }

    }

//     result = _flatten( cur, prop, result );

    return result;
};

// let flat = JSON.flattenRecursive( { a:{ b:{ c:[ { aa:{ aaa:1, aab:"", aac:{}, aad:[] }, ab: [ 1, 2, 3, 4 ], ac:"hi there", ad:1 }, { a: "lol", b: 123 }, new Date(), "hi", "there", "again", 1, 2,3 ] } } } );
//
// console.log( flat );
// console.log( "========================================" );
// console.log( JSON.stringify( JSON.unflatten( flat ) ) );

function benchmark( flattenFunc, unflattenFunc, testDataDepth=4 ) {

    let tests = 10;
    let trials = 10000;

    let nestedObjArr = [];
    let flatObjArr = [];

    console.log( "Creating test data" );
    for( let i = 0; i < trials; ++i ){
        nestedObjArr.push( fillObj( {}, testDataDepth ) );

        let temp = fillObj( {}, testDataDepth );
        flatObjArr.push( JSON.flattenRecursive( temp ) )
    }

    console.log( `Starting flatten tests` );
    let flattenTests = runTest( flattenFunc, nestedObjArr, trials );

    console.log( `Starting unflatten tests` );
    let nestedTests = runTest( unflattenFunc, flatObjArr, trials );

    return {
        fromNested: getTestStats( flattenTests ),
        fromFLat: getTestStats( nestedTests )
    };

    function runTest( func, dataArr, trials ){
        let start = 123456789;
        let end = 123456789;
        let testTimes = [];

        for( let i = 0; i < tests + 1; ++i ){

            start = new Date().getTime();

            for( let j = 0; j < trials; ++j ){
                func( dataArr[j] );
            }

            end = new Date().getTime();

            if( i - 1 > -1 )
                testTimes.push( ( trials / ( end - start ) ) * 1000 );
        }

        // console.log( testTimes );

        return testTimes;
    }


    function getTestStats( arrOfTimes ){
        let stats = require( "./../stats/base.js" );
        return {
            // tests: arrOfTimes,
            avg: Math.floor( stats.getAverage( arrOfTimes ) ).toLocaleString( "en-US" ) + " ops per second.",
            median: Math.floor( stats.getMedian( arrOfTimes ) ).toLocaleString( "en-US" ) + " ops per second.",
            std: Math.floor( stats.getStandardDeviation( arrOfTimes ) ).toLocaleString( "en-US" ) + " ops per second."
        }
    }
}

function fillObj(obj, depth) {
    obj["foo0"] = 1;
    obj["bar0"] = false;
    obj["foo2"] = -99999;
    obj["bar2"] = true;
    obj["foo3"] = 10002525.10002525;
    obj["bar3"] = "test";
    obj["foo4"] = "hello world hello world hello world hello world";
    obj["bar4"] = [1,2,3,4,5,6,7,8,9,0];
    if(depth > 0) {
        obj["foo5"] = {};
        fillObj(obj["foo5"], depth-1);
        obj["bar5"] = [{},{},{},{},{}];
        for(var i=0; i<obj["bar5"].length; i++) {
            fillObj(obj["bar5"][i], depth-1);
        }
    }
    return obj;
}

// console.log( JSON.flattenRecursive( fillObj( {}, 2 ) ) );
// console.log( benchmark( JSON.flattenRecursive, JSON.unflatten, 2 ) );
// console.log( "===================================================================" );
console.log( benchmark( JSON.flatten, JSON.unflatten, 2 ) );

// the following line of code requires the flat package
// console.log( benchmark( obj.flatten, obj.unflatten, 2 ) );