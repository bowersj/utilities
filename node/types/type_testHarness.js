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
    test_number(    testOptions, 'number' );
    test_string(    testOptions, 'string' );
    test_symbol(    testOptions, 'symbol' );
    test_function(  testOptions, 'function' );
    test_object(    testOptions, 'object' );
    test_array(     testOptions, 'array' );
    test_regexp(    testOptions, 'regexp' );
    test_date(      testOptions, 'date' );


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

function test_boolean( testOptions, message ){

    testOptions.message = message;
    const addToEachTest = { expectedValue: false, iterations: 100, arg2: "boolean" };
    const testSet = th.createTestSet( th.getTestSet_CriticalValues(), addToEachTest );

    testSet[50].expectedValue = true;
    testSet[51].expectedValue = true;
    testSet[64].expectedValue = true;
    testSet[65].expectedValue = true;

    th.runTestSet( type.comparator, testSet, testOptions );

}

function test_number( testOptions, message ){

    testOptions.message = message;
    const addToEachTest = { expectedValue: false, iterations: 100, arg2: "number" };
    const testSet = th.createTestSet( th.getTestSet_CriticalValues(), addToEachTest );

    testSet[5] .expectedValue = true;
    testSet[8] .expectedValue = true;
    testSet[12].expectedValue = true;

    testSet[17].expectedValue = true;
    testSet[18].expectedValue = true;
    testSet[19].expectedValue = true;
    testSet[20].expectedValue = true;

    testSet[25].expectedValue = true;
    testSet[26].expectedValue = true;
    testSet[28].expectedValue = true;
    testSet[33].expectedValue = true;
    testSet[35].expectedValue = true;
    testSet[37].expectedValue = true;
    testSet[38].expectedValue = true;
    testSet[39].expectedValue = true;
    testSet[41].expectedValue = true;
    testSet[43].expectedValue = true;
    testSet[45].expectedValue = true;
    testSet[47].expectedValue = true;
    testSet[48].expectedValue = true;

    th.runTestSet( type.comparator, testSet, testOptions );

}

// TODO: build test cases for BigInt in getTestSet_CriticalValues function
function test_bigInt( testOptions, message ){}

function test_string( testOptions, message ){
    testOptions.message = message;
    const addToEachTest = { expectedValue: false, iterations: 100, arg2: "string" };
    const testSet = th.createTestSet( th.getTestSet_CriticalValues(), addToEachTest );

    testSet[1].expectedValue = true;
    testSet[3].expectedValue = true;
    testSet[6].expectedValue = true;
    testSet[9].expectedValue = true;
    testSet[10].expectedValue = true;
    testSet[13].expectedValue = true;
    testSet[14].expectedValue = true;

    testSet[21].expectedValue = true;
    testSet[22].expectedValue = true;
    testSet[23].expectedValue = true;

    testSet[27].expectedValue = true;
    testSet[29].expectedValue = true;
    testSet[30].expectedValue = true;
    testSet[31].expectedValue = true;
    testSet[32].expectedValue = true;
    testSet[34].expectedValue = true;
    testSet[36].expectedValue = true;

    testSet[40].expectedValue = true;
    testSet[42].expectedValue = true;
    testSet[44].expectedValue = true;
    testSet[46].expectedValue = true;

    testSet[52].expectedValue = true;
    testSet[53].expectedValue = true;
    testSet[54].expectedValue = true;
    testSet[55].expectedValue = true;
    testSet[56].expectedValue = true;
    testSet[57].expectedValue = true;
    testSet[58].expectedValue = true;
    testSet[59].expectedValue = true;
    testSet[60].expectedValue = true;
    testSet[61].expectedValue = true;
    testSet[62].expectedValue = true;

    testSet[66].expectedValue = true;
    testSet[67].expectedValue = true;
    testSet[68].expectedValue = true;
    testSet[69].expectedValue = true;
    testSet[70].expectedValue = true;
    testSet[71].expectedValue = true;
    testSet[72].expectedValue = true;
    testSet[73].expectedValue = true;
    testSet[74].expectedValue = true;
    testSet[75].expectedValue = true;
    testSet[76].expectedValue = true;

    testSet[81].expectedValue = true;

    testSet[99].expectedValue = true;
    testSet[101].expectedValue = true;
    testSet[106].expectedValue = true;

    testSet[112].expectedValue = true;
    testSet[113].expectedValue = true;
    testSet[116].expectedValue = true;
    testSet[117].expectedValue = true;
    testSet[118].expectedValue = true;
    testSet[119].expectedValue = true;
    testSet[120].expectedValue = true;
    testSet[121].expectedValue = true;
    testSet[122].expectedValue = true;
    testSet[123].expectedValue = true;
    testSet[124].expectedValue = true;
    testSet[125].expectedValue = true;
    testSet[126].expectedValue = true;
    testSet[127].expectedValue = true;

    testSet[129].expectedValue = true;


    th.runTestSet( type.comparator, testSet, testOptions )
}

function test_symbol( testOptions, message ){

    testOptions.message = message;
    const addToEachTest = { expectedValue: false, iterations: 100, arg2: "symbol" };
    const testSet = th.createTestSet( th.getTestSet_CriticalValues(), addToEachTest );

    testSet[141].expectedValue = true;
    testSet[142].expectedValue = true;
    testSet[143].expectedValue = true;
    testSet[144].expectedValue = true;
    testSet[145].expectedValue = true;
    testSet[146].expectedValue = true;

    th.runTestSet( type.comparator, testSet, testOptions );

}

function test_function( testOptions, message ){

    testOptions.message = message;
    const addToEachTest = { expectedValue: false, iterations: 100, arg2: "function" };
    const testSet = th.createTestSet( th.getTestSet_CriticalValues(), addToEachTest );

    testSet[130].expectedValue = true;
    testSet[131].expectedValue = true;
    testSet[132].expectedValue = true;
    testSet[133].expectedValue = true;
    testSet[134].expectedValue = true;
    testSet[135].expectedValue = true;
    testSet[136].expectedValue = true;
    testSet[137].expectedValue = true;
    testSet[138].expectedValue = true;

    th.runTestSet( type.comparator, testSet, testOptions );

}

function test_object( testOptions, message ){

    testOptions.message = message;
    const addToEachTest = { expectedValue: false, iterations: 100, arg2: "object" };
    const testSet = th.createTestSet( th.getTestSet_CriticalValues(), addToEachTest );

    // weird properties of JavaScript is why these cases are true...
    // The goal is to wrap the typeof operator not correct JS mistakes
    testSet[4].expectedValue = true;
    testSet[7].expectedValue = true;
    testSet[11].expectedValue = true;
    testSet[15].expectedValue = true;
    testSet[16].expectedValue = true;
    testSet[24].expectedValue = true;
    testSet[49].expectedValue = true;
    testSet[63].expectedValue = true;


    testSet[77].expectedValue = true;
    testSet[78].expectedValue = true;
    testSet[79].expectedValue = true;
    testSet[80].expectedValue = true;
    //[81] is '{}'and should not be included
    testSet[82].expectedValue = true;
    testSet[83].expectedValue = true;
    testSet[84].expectedValue = true;
    testSet[85].expectedValue = true;
    testSet[86].expectedValue = true;
    testSet[87].expectedValue = true;
    testSet[88].expectedValue = true;
    testSet[89].expectedValue = true;
    // [90] myMsgClass   is not included because it is a class and has a custom constructor.name of 'myMsgClass'   instead of 'Object'
    // [91] myEmptyClass is not included because it is a class and has a custom constructor.name of 'myEmptyClass' instead of 'Object'
    testSet[90].expectedValue = true;
    testSet[91].expectedValue = true;

    testSet[107].expectedValue = true;
    testSet[114].expectedValue = true;
    testSet[111].expectedValue = true;
    testSet[139].expectedValue = true;
    testSet[140].expectedValue = true;

    th.runTestSet( type.comparator, testSet, testOptions );

}

function test_array( testOptions, message ){

    testOptions.message = message;
    const addToEachTest = { expectedValue: false, iterations: 100, arg2: "array" };
    const testSet = th.createTestSet( th.getTestSet_CriticalValues(), addToEachTest );

    testSet[95].expectedValue = true;
    testSet[96].expectedValue = true;
    testSet[97].expectedValue = true;
    testSet[98].expectedValue = true;
    testSet[100].expectedValue = true;
    testSet[102].expectedValue = true;
    testSet[103].expectedValue = true;
    testSet[104].expectedValue = true;
    testSet[105].expectedValue = true;
    testSet[115].expectedValue = true;

    th.runTestSet( type.comparator, testSet, testOptions );

}

function test_regexp( testOptions, message ){

    testOptions.message = message;
    const addToEachTest = { expectedValue: false, iterations: 100, arg2: "regexp" };
    const testSet = th.createTestSet( th.getTestSet_CriticalValues(), addToEachTest );

    testSet[108].expectedValue = true;
    testSet[109].expectedValue = true;
    testSet[110].expectedValue = true;

    th.runTestSet( type.comparator, testSet, testOptions );

}

function test_date( testOptions, message ){

    testOptions.message = message;
    const addToEachTest = { expectedValue: false, iterations: 100, arg2: "date" };
    const testSet = th.createTestSet( th.getTestSet_CriticalValues(), addToEachTest );

    testSet[128].expectedValue = true;

    th.runTestSet( type.comparator, testSet, testOptions );

}

// TODO: add test cases to getTestSet_CriticalValues function
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
