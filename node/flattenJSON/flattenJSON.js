/**
 * copied from https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
 *
 */

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

// let flat = JSON.flattenRecursive( { a:{ b:{ c:[ { aa:{ aaa:1, aab:"", aac:{}, aad:[] }, ab: [ 1, 2, 3, 4 ], ac:"hi there", ad:1 }, { a: "lol", b: 123 }, new Date(), "hi", "there", "again", 1, 2,3 ] } } } );
//
// console.log( flat );
// console.log( "========================================" );
// console.log( JSON.stringify( JSON.unflatten( flat ) ) );

function benchmark( flattenFunc, unflattenFunc, testDataDepth=4 ) {

    let stats = require( "./../stats/base.js" );

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

    console.log( "Starting flattenRecursive tests" );
    let flattenTests = runTest( flattenFunc, nestedObjArr );

    console.log( "Starting unflatten tests" );
    let nestedTests = runTest( unflattenFunc, flatObjArr );

    return {
        fromNested: getTestStats( flattenTests ),
        fromFLat: getTestStats( nestedTests )
    };

    function runTest( func, dataArr ){
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

        return testTimes;
    }


    function getTestStats( arrOfTimes ){
        return {
            // tests: arrOfTimes,
            avg: Math.floor( stats.getAverage( arrOfTimes ).toLocaleString( "en-US" ) + " ops per second." ),
            median: Math.floor( stats.getMedian( arrOfTimes ).toLocaleString( "en-US" ) + " ops per second." ),
            std: Math.floor(stats.getStandardDeviation( arrOfTimes ).toLocaleString( "en-US" ) + " ops per second." )
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
console.log( benchmark( JSON.flattenRecursive, JSON.unflatten, 2 ) );