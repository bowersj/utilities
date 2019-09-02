const stats = require( "./../stats/base.js" );
const fast = require( "./helpers.js" );

console.log( runTests() );

function runTests(){
    // build test values
    let arr1 = _buildArray( 1000, ( index, num, arr ) => {
        return Math.floor( Math.random() * num );
    } );

    let arr2 = _buildArray( 1000, ( index, num, arr ) => {
        return Math.floor( Math.random() * num );
    } );

    let arr3 = _buildArray( 1000, ( index, num, arr ) => {
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}[];:,<.>/?'";
        let res = "";
        for( let i = 0; i < Math.floor( Math.random() * 10 ); ++i ){
            res += str.charAt( Math.floor( Math.random() * str.length ) )
        }
        return res;
    } );

    let arr4 = _buildArray( 1000, ( index, num, arr ) => {
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}[];:,<.>/?'";
        let res = "";
        for( let i = 0; i < Math.floor( Math.random() * 10 ); ++i ){
            res += str.charAt( Math.floor( Math.random() * str.length ) )
        }
        return res;
    } );

    let res = {};

    // warm up JIT
    console.log( "Warming up JIT compiler" );
    for( let i = 0; i < 100; ++i ){
        fast.intersection_hash_unique( arr1, arr2 );
        fast.intersection_hash_unique( arr3, arr4 );
    }

    for( let i = 0; i < 100; ++i ){
        fast.intersection_hash_nonUnique( arr1, arr2 );
        fast.intersection_hash_nonUnique( arr3, arr4 );
    }

    let tests = 10;
    let itrs = 40000;

    // run tests and parse times
    console.log( "running tests" );
    // res.intersectHash_numbers_nonUnique = parseTestTimes( test( fast.intersection_hash_nonUnique, [ arr1, arr2 ], tests, itrs ) );
    // console.log( "-> Finished hast intersect for a non unique list" );
    res.intersectHash_numbers_unique = parseTestTimes( test( fast.intersection_hash_unique, [ arr1, arr2 ], tests, itrs ) );
    console.log( "-> Finished hash intersect for numbers" );
    // res.intersect_str = parseTestTimes( test( fast.intersect, [ arr3, arr4 ], tests, itrs ) );
    // console.log( "-> Finished fast intersect" );
    // res.intersectSlow_numbers = parseTestTimes( test( fast.intersect_slow, [ arr1, arr2 ], tests, itrs ) );
    // console.log( "-> Finished slow intersect for numbers" );
    // res.intersectSlow_str = parseTestTimes( test( fast.intersect_slow, [ arr3, arr4 ], tests, itrs ) );

    return res;
}


function test( func, parameters, tests = 10, itrs = 100000 ){
    let start = 0;
    let times = [];

    for( let i = 0; i < tests; ++i ){
        start = new Date().getTime();

        for( let j = 0; j < itrs; ++j ){
            func.apply( null, parameters );
        }

        times.push( ( itrs / ( new Date().getTime() - start ) ) * 1000 );
    }

    return times;
}


function parseTestTimes( arrOfNumbers ){
    return {
        avg: Math.floor( stats.getAverage( arrOfNumbers ) ).toLocaleString( "en-US" ),
        med: Math.floor( stats.getMedian( arrOfNumbers ) ).toLocaleString( "en-US" ),
        std: Math.floor( stats.getSampleStandardDeviation( arrOfNumbers ) ).toLocaleString( "en-US" )
    }
}


function buildTestSet(){
    return [
        _buildArray( 1000, ( index, num, arr ) => {
            return Math.floor( Math.random() * num );
        } ),
        _buildArray( 1000, ( index, num, arr ) => {
            return Math.random() * num;
        } ),
        _buildArray( 1000, ( index, num, arr ) => {
            let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}[];:,<.>/?'";
            let res = "";
            for( let i = 0; i < Math.floor( Math.random() * 15 ); ++i ){
                res += str.charAt( Math.floor( Math.random() * str.length ) )
            }
            return res;
        } )
    ]
}



function _buildArray( num, populate ){

    let array = [];

    for( let i = 0; i < num; ++i ){
        array.push( populate( i, num, array ) );
    }

    return array;
}