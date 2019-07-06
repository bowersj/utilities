/**
 * Needs node to run tests.
 *
 */

const th = require( '../testHarness/testHarness.js' );
const type = require( './comparisonHelpers.js' );


//-----------------------------------------------------------------------------
function runTests() {

    const testOptions = th.createTestOptions();

    test_undefined( testOptions, 'undefined' );
    test_null(      testOptions, 'null' );
    test_boolean(   testOptions, 'boolean' );


    th.closeOutTesting(testOptions);

    return {
        failures:      testOptions.failureArray,
        testMetrics:   testOptions.testMetrics,
        //successes:   testOptions.successArray,
    } ;

}

let res = runTests();


console.log( "metrics\n", res.testMetrics, "\n" );
console.log( "failures\n", res.failures, "\n" );


function test_undefined( testOptions, message ){
    testOptions.message = message;
    const addToEachTest = { expectedValue: false, iterations: 100000, arg2: "undefined" };
    const testSet = th.createTestSet( th.getTestSet_CriticalValues(), addToEachTest );

    testSet[0].expectedValue = true;

    th.runTestSet( type.comparator, testSet, testOptions );
}

function test_null( testOptions, message ){

    testOptions.message = message;
    const addToEachTest = { expectedValue: false, iterations: 100000, arg2: "null" };
    const testSet = th.createTestSet( th.getTestSet_CriticalValues(), addToEachTest );

    testSet[2].expectedValue = true;

    th.runTestSet( type.comparator, testSet, testOptions );

}

function test_boolean( testOptions, message ){

    testOptions.message = message;
    const addToEachTest = { expectedValue: false, iterations: 100000, arg2: "boolean" };
    const testSet = th.createTestSet( th.getTestSet_CriticalValues(), addToEachTest );

    testSet[50].expectedValue = true;
    testSet[51].expectedValue = true;
    testSet[64].expectedValue = true;
    testSet[65].expectedValue = true;

    th.runTestSet( type.comparator, testSet, testOptions );

}

function test_number( testOptions, message ){}

function test_bigInt( testOptions, message ){}

function test_string( testOptions, message ){}

function test_symbol( testOptions, message ){}

function test_function( testOptions, message ){}

function test_object( testOptions, message ){}

function test_array( testOptions, message ){}

function test_regexp( testOptions, message ){}

function test_date( testOptions, message ){}

function test_promise( testOptions, message ){}

function test_set( testOptions, message ){}

function test_map( testOptions, message ){}

function test_weakset( testOptions, message ){}

function test_weakMap( testOptions, message ){}

function test_dataview( testOptions, message ){}

function test_mapitorator( testOptions, message ){}

function test_setitorator( testOptions, message ){}

function test_arrayitorator( testOptions, message ){}

function test_stringitorator( testOptions, message ){}
