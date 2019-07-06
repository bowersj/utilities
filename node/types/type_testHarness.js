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


    th.closeOutTesting(testOptions);

    return {
        failures:      testOptions.failureArray,
        testMetrics:   testOptions.testMetrics,
        //successes:   testOptions.successArray,
    } ;

}

let res = runTests();

console.log( "failures\n", res.failures, "\n" );
console.log( "metrics\n", res.testMetrics, "\n" );


// tests

function test_undefined( testOptions, message ){
    testOptions.message = message;
    const addToEachTest = { expectedValue: false, iterations: 100, arg2: "undefined" };
    const testSet = th.createTestSet( th.getTestSet_CriticalValues(), addToEachTest );

    testSet[0].expectedValue = true;

    th.runTestSet( type.comparator, testSet, testOptions );
}

function test_null( testOptions, message ){

    testOptions.message = message;
    const addToEachTest = { expectedValue: false, iterations: 100, arg2: "null" };
    const testSet = th.createTestSet( th.getTestSet_CriticalValues(), addToEachTest );

    testSet[2].expectedValue = true;

    th.runTestSet( type.comparator, testSet, testOptions );

}

function test_boolean(){}

function test_number(){}

function test_bigInt(){}

function test_string(){}

function test_symbol(){}

function test_function(){}

function test_object(){}

function test_array(){}

function test_regexp(){}

function test_date(){}

function test_promise(){}

function test_set(){}

function test_map(){}

function test_weakset(){}

function test_weakMap(){}

function test_dataview(){}

function test_mapitorator(){}

function test_setitorator(){}

function test_arrayitorator(){}

function test_stringitorator(){}
