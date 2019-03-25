'use strict';
module.exports.runTest = runTest
module.exports.runTestSet = runTestSet

module.exports.createTestOptions = createTestOptions
module.exports.createTestSet = createTestSet
module.exports.closeOutTesting = closeOutTesting

module.exports.startTestMetrics = startTestMetrics 
module.exports.finishTestMetrics = finishTestMetrics


/* 
How to use this module 

//=============================================================================
//EXAMPLE 1 - run one test

// Define an optional message for documenting this test.
let message = 'Testing testHarness.js - EXAMPLE 1'

// Required: Create a testOptions object to accumulate results across all tests.
// Test results are stored in testOptions.failureArray[] and testOptions.successArray[] 
const testOptions = createTestOptions(message)  

// Optional: Create a testMetrics object to collect metrics on a test.
const testMetrics =  startTestMetrics(testOptions)

// Required: Create a test object.  It contains all data needed to run a test except for the function being tested.
//           It defines the arguments to pass into the function and the value you expect the function to return for a successful test.
//           This example passes to arguments to a function. The first arguement will receive 1 and the second will receive '1'.
//           The test is successful when the function returns false.
const test = { arg1:1, arg2:'1', expectedValue: false }

// Required: Call runTest() to run a test. 
//           This example tests an equal() function using the settings in the test object. 
runTest( equal, test, testOptions )

// Optional: Finish collecting metrics on a test
finishTestMetrics( testMetrics, testOptions )


//=============================================================================
//EXAMPLE 2 - run a set of tests against a set of predefined data

testOptions.message = 'Testing testHarness.js - EXAMPLE 2'

// Get a predefined testSet array. It is a array of predefined test objects.
const testSet = require( './testSet_validation.js' );
const preTestSet = testSet.criticalValues()

// Create a test object. 
const preTestSetConfig =  {  arg2: 1,  expectedValue: false, iterations: 2, comment: 'Testing the Critical Values Test Set' }

// Turn a preTestSet into a testSet, which is an array of test objects that are ready to be tested.
// It adds the properties in preTestSetConfig to each object in preTestSet to make the testSet ready for testing.
const testSet = createTestSet( preTestSet, preTestSetConfig )

// Override expected values in the testSet that createTestSet() set to incorrect default values. 
testSet[16].expectedValue = true

// Run the set of tests against the equal() function.
runTestSet( equal, testSet, testOptions )

//Close out the testing and gather the final test metrics
closeOutTesting(testOptions)

//Return the results.
const result = { 
  failures:         testOptions.failureArray, 
  testSetMetrics:   testOptions.testMetrics.testSets,
  successes:        testOptions.successArray,
} 
result

function equal (lhs, rhs) { return lhs === rhs }

*/



/* ************************************************************************************************
   
   =============================================================================
   Test Harness Framework
   =============================================================================
   HISTORY
   - Created by Mike Bowers
   - Last Updated 2018-04-06T19:54:39.766Z
   - Maintained by Josh Bowers
   - Transferred on 2018-09-20T12:00:00.000Z
   
   =============================================================================
   FUNCTIONS
   - runTest()
   - runTestSet()
   - createTestOptions()
   - createTestSet()

   
   =============================================================================
   HOW TO
   =============================================================================
   
   =============================================================================
   createTestOptions() 
     - It takes a user-defined message string and returns an object that holds cummulative test results.
     - This object is passed into runTest() and runTestSet() to accumulate results.
     - failureArray[] holds test failures.
     - successArray[] holds test successes.
     - testMetrics holds metrics about tests.

   =============================================================================
   createTestSet() 
     - It takes a predefined array of tests and enhances them with additional testConfig data.
     - It returns a testSet, which is an array of tests that are ready to run.
   
   =============================================================================
   startTestMetrics() 
     - It starts recording metrics for a test.
   
   =============================================================================
   finishTestMetrics() 
     - It finish recording metrics for a test and adds a new metric object to testOptions.testMetrics.testSets[]
   
   =============================================================================
   runTestSet() 
     - It takes a function and a testSet and runs the function against each test in the testSet.
     - It puts results in its testOptions argument.
   
   =============================================================================
   runTest() 
   - It is the main function of this library.
   - It compares the return value of a function with an expected result.
   - If the return value matches the expected result, the test is a success; otherwise, it is a failure.
   - It logs failures in a failureArray[] and successes in a successArray[].
   - You can call runTest() repeatedly with different functions and test configurations.
     - This lets you test the same function with different arguments and/or to test different functions.
   - You know a set of tests has succeeded when failureArray[] is empty.
   - Each item in failureArray[] and successArray[] contain a comprehensive log of what happened: 
      - optional user-defined message for the entire test series
      - function name
      - result of testing the function
      - the expected value the function should return
      - arguments passed into the function
      - expected error name (if defined)
      - error object (if thrown)
      - number of iterations
      - number of milliseconds the function took to execute when repeated the specified number of iterations
      - running counter of the tests performed
      - optional user-defined index number for each test so you know which test failed
      - user-defined comment about the individual test
      
   - Function Signature
     - runTest(testFunction, testConfig, testOptions)
       - testConfig    is an object
       - testFunction  is a function
       - testOptions          is an object
        
     - testConfig 
       - testConfig provides the following information to runTest()
         - arguments to pass into testFunction
         - expected return value of testFunction
         - number of times to run testFunction

       - testConfig is an object with the following properties:
           - arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10,
             expectedValue, expectedRange, expectedValues, expectedErrorName, expectedUndefined
             iterations, index, comment
             
           - arg properties are optional.  
             - There must be one arg property for each argument you want to pass into a function.
           
           - one expected return value property is required and only one should be present.
             - If more than one is present, they are evaluated in the following order:
             - expectedErrorName, expectedRange, expectedValues, expectedUndefined, expectedValue
           
           - iterations, index, comment are optional. 
               
           - EXAMPLES of testConfig objects: 
                { expectedValue: 3}
                { arg1: 1,           expectedValue: false,  iterations: 1000 }
                { arg1: 1,           expectedValue: 3 }
                { arg1: 1, arg2: 2,  expectedValue: 3.14 }
                { arg1: 1, arg2: 10, expectedRange: { lowValue: 1,  highValue: 10 } }
                { arg1: 1,           expectedValues: [1,2,3]   }
                { arg1: 1,           expectedErrorName: TypeError.name   }
                { arg1: 1,           expectedUndefined: true   }
                { arg1:1, arg2:2, arg3:3,arg4:4, arg5:5, arg6:6, arg7:7, arg8:8, arg9:9, arg10:10,  expectedValue: true }
                { index:1, arg1:'3', expectedValue: 3}
                { comment: 'Number.MAX_SAFE_INTEGER', arg1:'9007199254740991', expectedValue: 9007199254740991}
                
                  
       - testConfig can define an expected range of return values. 
         - Success occurs when the function's return result is within the inclusive range.

       - testConfig can define an expected array of return values. 
         - Success occurs when any item matches the function's return result.

       - testConfig can define an expected error. 
         - Success occurs when the name of the error matches expectedErrorName.

       - testConfig can repeat a test N times as specified by iterations.
     
     
     - testOptions 
       - testOptions is an object with four properties.
         { successArray = [], failureArray = [], testMetrics  = { testCount: 0 }, message = ''}
       
       - successArray is an array that contains an entry for each successful test.
       - failureArray is an array that contains an entry for each failed test.
       - testMetrics is an object. 
         - It contains a numeric property named count that is a total count of tests executed.
       - message is a string. It is attached to the log entry. It helps you identify a test.
     

   
   ************************************************************************************************
*/


/*
 * Import big number library BigNumber.js and luxon to handle big numbers and dates, times, dateTimes, and durations respectively.
 *
 */

const BigNumber = require('bignumber.js');
const { DateTime } = require('luxon');
const { Duration } = require('luxon');
const { Interval } = require('luxon');
   
/*  ------------------------------------------------------------------------------
 * 
 *  createTestOptions() 
 * 
 *  - Returns a testOptions object that is into other testHarness functions: runTest(), runTestSet(), startTestMetrics(), finishTestMetrics()
 *  - message is an optional string that describes the test.
 *  
 */  
function createTestOptions( message ) {
  let testStartDateTime = new Date();

  return { 
    successArray: [], 
    failureArray: [], 
    testMetrics: { 
      testCount: 0,
      totalMS: 0, 
      testStartDateTime, 
      testEndDateTime: testStartDateTime 
    }, 
    message } 
}   

/*  ------------------------------------------------------------------------------
 * 
 *  closeOutTesting() 
 *
 *  Adds final  metrics to testOptions.testMetrics
 *
 */  
function closeOutTesting( testOptions ) {
  let { successArray=[], failureArray=[], testMetrics, message=''  } = testOptions;

  let testStartDateTime = testMetrics.testStartDateTime;
  let testEndDateTime = new Date();
  let elapsedMilliseconds = testEndDateTime - testStartDateTime;
  
  testMetrics.testEndDateTime = testEndDateTime;
  testMetrics.totalMS = elapsedMilliseconds

}   


/*  ------------------------------------------------------------------------------
 * 
 *  startTestMetrics() 
 *  - Start recording metrics for a test.
 *  - testOptions  is a required paramater.  It is the object returned by createTestOptions(). 
 *  - Returns a metrics object that contains start times. 
 *    into finishTestMetrics() to update the testOptions.testMetrics array with the test's metrics. 
 *  
 */  
function startTestMetrics( testOptions ) {
  let { successArray=[], failureArray=[], testMetrics, message=''  } = testOptions;
  
  let startTime = new Date().getTime();
  
  if (testMetrics.testCount === undefined ) {testMetrics.testCount = 0}
  let startTestCount = testMetrics.testCount;

  return { startTime, startTestCount }  
}
 
/*  ------------------------------------------------------------------------------
 * 
 *  finishTestMetrics() 
 * 
 *  - Updates the testOptions.testMetrics array with the test's metrics.
 *  - startMetrics is a required parameter.  It is the object returned from startTestMetrics().
 *  - testOptions  is a required paramater.  It is the object returned by createTestOptions(). 
 *  
 */  
function finishTestMetrics( startMetrics, testOptions ) {
  let { successArray=[], failureArray=[], testMetrics, message=''  } = testOptions;
  
  let startTime = startMetrics.startTime;
  let endTime;
  let elapsedMilliseconds;
  let startDateTime;
  let endDateTime;
  
  let startTestCount;
  let endTestCount;
  let testCount = 0;
  let testsPerSecond = 0;
  
  endTime = new Date().getTime();
  elapsedMilliseconds = endTime - startTime;
  startDateTime = new Date(startTime);
  endDateTime = new Date(endTime);
  
  startTestCount = startMetrics.startTestCount;
  endTestCount = testMetrics.testCount;
  testCount = endTestCount - startTestCount;
  
  if (testCount > 0 )  testsPerSecond = Math.round( ( testCount / elapsedMilliseconds ) * 1000 ).toLocaleString('en-us');
  
  
  //If it doesn't exist, then create the array for testOptions.testMetrics.testSets 
  if ( !Array.isArray(testOptions.testMetrics.testSets) ) { testOptions.testMetrics.testSets = [] }

  //Store metrics about the test set 
  testOptions.testMetrics.testSets.push( { message: testOptions.message, testCount, totalMS: elapsedMilliseconds, testsPerSecond, startDateTime, endDateTime} )
}
   
/*  ------------------------------------------------------------------------------
 * 
 *  runTestSet() 
 * 
 *  - Executes testFunction for each test object in the testSet array.
 *  - Test results are pushed into the successArray, failureArray, and testMetrics object in the testOptions object.
 *  - testOptions.testMetrics.testSets[] contains metrics about the testSet.
 *  
 */  
function runTestSet( testFunction, testSet, testOptions ) {
  let { successArray=[], failureArray=[], testMetrics, message=''  } = testOptions;
  
  testMetrics = startTestMetrics(testOptions);
  
  for (let i=0; i< testSet.length; i++) {
  	runTest( testFunction, testSet[i], testOptions) 
  }

  finishTestMetrics( testMetrics, testOptions )
}

/*  ------------------------------------------------------------------------------
 * 
 *  runTest() runs a test. 
 *  - No return value.
 *  - testFunction is a reference to a function that will be tested.
 *  - testConfig contains the settings of the test.
 *  - successArray is an array where successes are logged.
 *  - failureArray is an array where failures are logged.
 *  - testConfig is an object containing the following properties
 *   { 
 *     arg1:  'a value to pass into argument 1  - can be any type -- including undefined', 
 *     arg2:  'a value to pass into argument 2  - can be any type -- including undefined', 
 *     arg3:  'a value to pass into argument 3  - can be any type -- including undefined', 
 *     arg4:  'a value to pass into argument 4  - can be any type -- including undefined', 
 *     arg5:  'a value to pass into argument 5  - can be any type -- including undefined', 
 *     arg6:  'a value to pass into argument 6  - can be any type -- including undefined', 
 *     arg7:  'a value to pass into argument 7  - can be any type -- including undefined', 
 *     arg8:  'a value to pass into argument 8  - can be any type -- including undefined', 
 *     arg9:  'a value to pass into argument 9  - can be any type -- including undefined', 
 *     arg10: 'a value to pass into argument 10 - can be any type -- including undefined', 
 *     expectedValue: 'a single value expected to be returned by the function'
 *     expectedRange:  { lowValue:-10, highValue:0 },
 *     expectedValues: [1, 2]
 *     expectedUndefined: true
 *     expectedErrorName: 'myModule.myFunction.myError', 
 *     iterations: 20, 
 *     index: 1,
 *     comment: '',
 *   } 
 *  
 *  NOTES: 
 *    The following properties in testConfig are mutually exclusive 
 *      -- expectedValue, expectedRange, expectedValues, and expectedErrorName
 *  
 *    iterations is the optional number of times to repeat the test
 *      -- this is useful when a function returns different values each time it is called
 *  
 */  
function runTest( testFunction, testConfig={}, testOptions ) {  
  let { successArray=[], failureArray=[], testMetrics, message=''  } = testOptions

  let arg1  = testConfig.arg1;
  let arg2  = testConfig.arg2;
  let arg3  = testConfig.arg3;
  let arg4  = testConfig.arg4;
  let arg5  = testConfig.arg5;
  let arg6  = testConfig.arg6;
  let arg7  = testConfig.arg7;
  let arg8  = testConfig.arg8;
  let arg9  = testConfig.arg9;
  let arg10 = testConfig.arg10;
  let expectedValue = testConfig.expectedValue;
  let expectedRange = testConfig.expectedRange;     //TODO: verify expectedRange has lowValue and highValue properties.
  let expectedValues = testConfig.expectedValues;
  let expectedErrorName = testConfig.expectedErrorName;
  let index = testConfig.index;
  let comment = testConfig.comment;
  let err;
  let successful = false;
  let expectedErr = false;
  if (testMetrics.testCount === undefined ) {testMetrics.testCount = 0}
  let testCount =   testMetrics.testCount;
  let result;
  let startTime;
  let endTime;
  let elapsedMilliseconds;
  
    
  let iterations = testConfig.iterations;
  if ( !( Number.isInteger(iterations)) ) iterations = 1;
  
  startTime = new Date().getTime();
  for (let iteration=0; iteration<iterations; iteration++){
    successful = false;
    expectedErr = false;

    //Execute the function
    try {
      ++testCount;
      result = testFunction(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10)
    }
    catch (e){
      if (e.name === expectedErrorName) expectedErr = true;
      err = {errorName: e.name, errorMessage: e.message, errorStack: e.stack} 
    } 

    //determine if the test succeeded or failed
    if (expectedErr){
        //if an error is expected
      successful = true;

      
    }else if ( !(expectedRange === undefined) ){
      //When a range of results is expected
      successful = (    
                        result >= expectedRange.lowValue
                     || result <= expectedRange.highValue
                   )


    }else if ( !(expectedValues === undefined) ){
      //When one of an array of values is expected
      let len = expectedValues.length;
      for(let i=0;i < len; i++){
        if ( result === expectedValues[i] ) {
          successful = true;
          break
        }
      }


    }else if ( testConfig.expectedUndefined === true ){
      //When an undefined result value is expected
      successful = (result === undefined)


    }else if ( !(testConfig.expectedValue === undefined) ){
      //When one, specific result value is expected
      // i.e. when the testConfig does not contain expectedRange, expectedValues, or an expectedError
      //This value can be any value, object, or array
      successful = (result === expectedValue)
      
    
    }else {
      successful = false
    }
    
    if ( !successful) break 
  }
  endTime = new Date().getTime();
  elapsedMilliseconds = endTime - startTime;
  
  testMetrics.testCount = testCount;
  const log =       
    { 
      message: testOptions.message,   
      function: testFunction.name,
      result,
      expectedValue,
      expectedValues,
      expectedRange,
      arg1:  arg1, 
      arg2:  arg2, 
      arg3:  arg3, 
      arg4:  arg4, 
      arg5:  arg5, 
      arg6:  arg6, 
      arg7:  arg7, 
      arg8:  arg8, 
      arg9:  arg9, 
      arg10: arg10, 
      expectedError: expectedErrorName,
      error:         err,
      iterations,
      elapsedMilliseconds,
      testCount,
      index,
      runComment: testConfig.runComment,
      comment,
    } ;
    
  if (successful) { 
    successArray.push(log) 
  }else{ 
    failureArray.push(log) 
  }

}


/*  ------------------------------------------------------------------------------
 * 
 *  createTestSet() 
 *
 *  - returns an array of testConfig objects that have been derived from a base testSet array.
 *
 *  - createTestSet() loops through each item in the base testSet 
 *    and assigns to it each of the testConfig properties that you pass into testConfig.
 * 
 *  - You must specify a value for one and only one of the following properties: 
 *    expectedValue, expectedRange, expectedValues, expectedErrorName
 *  
 *  - You may optionally specify a value for any other testConfig property, such as 
 *    iterations, index, comment, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10
 *
 *  - Each property value that you supply will be applied to each testConfig object in the testSet array.
 *
 *    After running this function, you typically change one or more properties 
 *
 *  NOTE:
 *  - In the base testSet array, each testConfig object must have the arg1 property assigned to a value.
 *    - Other properties may also be preset in the base testSet array.
 */  
function createTestSet( testSet=[], testConfig={} ) {
  
  let newTestSet = [];

  for (let i=0; i< testSet.length; i++) {
    let newTestItem = Object.assign( {}, testSet[i], testConfig);
    newTestSet.push(newTestItem)
  }
  
  return newTestSet
}


// myMsgClass and myEmptyClass are used in getTestSet_CriticalValues() 
class myMsgClass {  
  constructor( { msg='myMsgClass' }={} ) { Object.assign(this, { msg } )  }  
  speak() { return this.msg }
}
class myEmptyClass {  
}

/*  ------------------------------------------------------------------------------
@function   getTestSet_CriticalValues
  
description: |
 - Returns an array of testConfig objects.
 - Each object in the array has a different value assigned to arg1
 - Each arg1 values is a common value used in testing.
 - Running all of these values through one function tests how it responds to all major types of values.
 
note: | 
 - add new items to the end to not break existing tests. 

parameters: 
  
returns: {
  "examples": [
    {index: 0,  arg1: undefined,  comment: 'undefined' }
  ],
  "type": "array", 
  "items": {
    "type": "object", 
    "properties": {
      "index":   { "type": "integer" }, 
      "arg1":    { "type": "any" }, 
      "comment": { "type": "string" }
    }
  }
}
  
*/
// TODO: add a type property to every object in the testSet variable
function getTestSet_CriticalValues() {
  
  const myFooBarObj = {foo:  'bar'};
  const myEmptyObj = {};

  const my12Array = [1,2];
  const myEmptyArray = [];
  const sayHi = function sayHi(){return 'Hi!'};
  const myError = new Error();   myError.message='myMessage';   myError.name='myError';  
  const mySymbol = Symbol();
  
  const testSet = [     
    { index: 0,   arg1: undefined,                      comment: 'undefined typeof==="undefined"; constructor.name throws ERROR; .valueOf() throws ERROR; .toString() throws ERROR; JSON.stringify()==={}; MarkLogic==={} '  }, 
    { index: 1,   arg1: 'undefined',                    comment: ' "undefined" is only the value of undefined typeof ' }, 

    { index: 2,   arg1: null,                           comment: 'null typeof==="object"; constructor.name throws ERROR; .valueOf() throws ERROR; .toString() throws ERROR; JSON.stringify()==="null"; MarkLogic===null'  }, 
    { index: 3,   arg1: 'null',                         comment: ' "null" is returned by JSON.stringify()==="null" '  }, 
                  
    { index: 4,   arg1:  new Number(NaN),               comment: 'new Number(NaN) typeof==="object"; constructor.name==="Number"; .valueOf()===NaN; .toString()==="NaN"; JSON.stringify()==="null"; MarkLogic==={}'  }, 
    { index: 5,   arg1:  NaN,                           comment: 'NaN             typeof==="number"; constructor.name==="Number"; .valueOf()===NaN; .toString()==="NaN"; JSON.stringify()==="null"; MarkLogic==="NAN" '  }, 
    { index: 6,   arg1: 'NaN',                          comment: ' "NaN" is returned by .toString() and by MarkLogic' }, 

    { index: 7,   arg1:  new Number(Infinity),          comment: 'new Number(Infinity) typeof==="object"; constructor.name==="Number"; .valueOf()===Infinity; .toString()==="Infinity"; JSON.stringify()==="null"; MarkLogic==={} ' }, 
    { index: 8,   arg1:  Infinity,                      comment: 'Infinity             typeof==="number"; constructor.name==="Number"; .valueOf()===Infinity; .toString()==="Infinity"; JSON.stringify()==="null"; MarkLogic==="INF" '  }, 
    { index: 9,   arg1: 'INF',                          comment: ' "INF" is what MarkLogic returns for Infinity '   }, 
    { index: 10,  arg1: 'Infinity',                     comment: ' "Infinity" is returned by Infinity.toString() '  }, 

    { index: 11,  arg1:  new Number(-Infinity),         comment: 'new Number(-Infinity) typeof==="object"; constructor.name==="Number"; .valueOf()===-Infinity; .toString()==="-Infinity"; JSON.stringify()==="null"; MarkLogic==={} '  }, 
    { index: 12,  arg1:  -Infinity,                     comment: '-Infinity             typeof==="number"; constructor.name==="Number"; .valueOf()===-Infinity; .toString()==="-Infinity"; JSON.stringify()==="null"; MarkLogic==="-INF" '  }, 
    { index: 13,  arg1: '-INF',                         comment: ' "-INF" is what MarkLogic returns for -Infinity '  }, 
    { index: 14,  arg1: '-Infinity',                    comment: ' "-Infinity" is returned by .toString()'  }, 
                  
    { index: 15,  arg1:  new Number(0),                 comment: 'new Number(0)    typeof==="object"; constructor.name==="Number"; .valueOf()===0; .toString()==="0"; JSON.stringify()==="0"; MarkLogic==={}'  }, 
    { index: 16,  arg1:  new Number(null),              comment: 'new Number(null) typeof==="object"; constructor.name==="Number"; .valueOf()===0; .toString()==="0"; JSON.stringify()==="0"; MarkLogic==={}'  }, 
    { index: 17,  arg1:  Number(null),                  comment: '    Number(null) typeof==="number"; constructor.name==="Number"; .valueOf()===0; .toString()==="0"; JSON.stringify()==="0"; MarkLogic===0'  }, 
    { index: 18,  arg1:   0,                            comment: '   0             typeof==="number"; constructor.name==="Number"; .valueOf()===0; .toString()==="0"; JSON.stringify()==="0"; MarkLogic===0'  }, 
    { index: 19,  arg1:  -0,                            comment: '  -0             typeof==="number"; constructor.name==="Number"; .valueOf()===0; .toString()==="0"; JSON.stringify()==="0"; MarkLogic===0'  }, 
    { index: 20,  arg1:  +0,                            comment: '  +0             typeof==="number"; constructor.name==="Number"; .valueOf()===0; .toString()==="0"; JSON.stringify()==="0"; MarkLogic===0'  }, 
    { index: 21,  arg1:  '0',                           comment: '  "0" is returned by .toString(0) and JSON.stringify(0)  -- the same is true for -0 and +0' }, 
    { index: 22,  arg1: '-0',                           comment: ' "-0" ' }, 
    { index: 23,  arg1: '+0',                           comment: ' "+0" ' }, 
                  

    { index: 24,  arg1:  new Number(1),                 comment: 'new Number(1)    typeof==="object"; constructor.name==="Number"; .valueOf()===1; .toString()==="1"; JSON.stringify()==="1"; MarkLogic==={}'  }, 
    { index: 25,  arg1:  Number(1),                     comment: '    Number(1)    typeof==="number"; constructor.name==="Number"; .valueOf()===1; .toString()==="1"; JSON.stringify()==="1"; MarkLogic===1'  }, 
    { index: 26,  arg1:  1,                             comment: '   1             typeof==="number"; constructor.name==="Number"; .valueOf()===1; .toString()==="1"; JSON.stringify()==="1"; MarkLogic===1'  }, 
    { index: 27,  arg1: '1',                            comment: '  "1" is returned by 1.toString() and JSON.stringify(1) '}, 
    { index: 28,  arg1:  -1,                            comment: '  -1             typeof==="number"; constructor.name==="Number"; .valueOf()===-1; .toString()==="-1"; JSON.stringify()==="-1"; MarkLogic===-1'}, 
    { index: 29,  arg1: '-1',                           comment: ' "-1" is returned by .toString(-1) and JSON.stringify(-1) '},
     
    { index: 30,  arg1: '01',                           }, 
    { index: 31,  arg1: '0000000001',                   }, 
    { index: 32,  arg1: '1,000,000.001',                }, 
    { index: 33,  arg1:  17,                            }, 
    { index: 34,  arg1: '17',                           }, 
    { index: 35,  arg1:  -2300,                         }, 
    { index: 36,  arg1: '-2300',                        }, 
    { index: 37,  arg1:  -9007199254740991,             comment: 'Number.MIN_SAFE_INTEGER' }, 
    { index: 38,  arg1:   9007199254740991,             comment: 'Number.MAX_SAFE_INTEGER' }, 
                  
    { index: 39,  arg1:  1.84467440737096e19,           comment: 'Unsafe Integer 18446744073709600000 is the JS floating point version of the unsigned 64-bit integer 18446744073709551615 -- Number.isInteger returns true even though it is an unsafe integer.' }, 
    { index: 40,  arg1: '18446744073709600000',         }, 
    { index: 41,  arg1:  -23.00000023,                  }, 
    { index: 42,  arg1: '-23.00000023',                 }, 
    { index: 43,  arg1:  1.00000000000001,              }, 
    { index: 44,  arg1: '1.00000000000001',             }, 
    { index: 45,  arg1:  1.000000000000001,             comment: 'MarkLogic displays this as 1, but 1.000000000000001 === 1 is false' }, 
    { index: 46,  arg1: '1.000000000000001',            }, 
    { index: 47,  arg1:  1.7976931348623157E308,        comment: 'Number.MAX_VALUE is the Largest Integer Value                  179769313486231570000000000000000000...  '}, 
    { index: 48,  arg1:  4.94065645841247E-324,         comment: 'Number.MIN_VALUE is the Smallest Fraction (not smallest value) 0.0000000000000000000000000000000000...494065645841247 ' }, 
                                                      
    { index: 49,  arg1:  new Boolean(true),             comment: 'new Boolean(true) typeof==="object";  constructor.name==="Boolean"; .valueOf()===true; .toString()==="true"; JSON.stringify()==="true"; MarkLogic==={}'    }, 
    { index: 50,  arg1:  Boolean(true),                 comment: 'Boolean(true)     typeof==="boolean"; constructor.name==="Boolean"; .valueOf()===true; .toString()==="true"; JSON.stringify()==="true"; MarkLogic===true' }, 
    { index: 51,  arg1:  true,                          comment: 'true              typeof==="boolean"; constructor.name==="Boolean"; .valueOf()===true; .toString()==="true"; JSON.stringify()==="true"; MarkLogic===true' }, 
    { index: 52,  arg1: 'true',                         }, 
    { index: 53,  arg1: 'True',                         }, 
    { index: 54,  arg1: 'TRUE',                         }, 
    { index: 55,  arg1: 'y',                            }, 
    { index: 56,  arg1: 'Y',                            }, 
    { index: 57,  arg1: 'yes',                          }, 
    { index: 58,  arg1: 'Yes',                          }, 
    { index: 59,  arg1: 'YES',                          }, 
    { index: 60,  arg1: 'on',                           },                   
    { index: 61,  arg1: 'On',                           },                   
    { index: 62,  arg1: 'ON',                           },                   
                                                        
    { index: 63,  arg1:  new Boolean(false),            comment: 'new Boolean(false) typeof==="object";  constructor.name==="Boolean"; .valueOf()===false; .toString()==="false"; JSON.stringify()==="false"; MarkLogic==={}'     }, 
    { index: 64,  arg1:  Boolean(false),                comment: 'Boolean(false)     typeof==="boolean"; constructor.name==="Boolean"; .valueOf()===false; .toString()==="false"; JSON.stringify()==="false"; MarkLogic===false'  }, 
    { index: 65,  arg1:  false,                         comment: 'true               typeof==="boolean"; constructor.name==="Boolean"; .valueOf()===false; .toString()==="false"; JSON.stringify()==="false"; MarkLogic===false'  }, 
    { index: 66,  arg1: 'false',                        }, 
    { index: 67,  arg1: 'False',                        }, 
    { index: 68,  arg1: 'FALSE',                        }, 
    { index: 69,  arg1: 'n',                            }, 
    { index: 70,  arg1: 'N',                            }, 
    { index: 71,  arg1: 'no',                           }, 
    { index: 72,  arg1: 'No',                           }, 
    { index: 73,  arg1: 'NO',                           }, 
    { index: 74,  arg1: 'off',                          }, 
    { index: 75,  arg1: 'Off',                          }, 
    { index: 76,  arg1: 'OFF',                          }, 

                  
    { index: 77,  arg1:  new Object(),                  comment: 'new Object()  typeof==="object";  constructor.name==="Object"; .valueOf()==={}; .toString()==="[object Object]"; JSON.stringify()==="{}"; MarkLogic==={}'     }, 
    { index: 78,  arg1:  {},                            comment: '{}            typeof==="object";  constructor.name==="Object"; .valueOf()==={}; .toString()==="[object Object]"; JSON.stringify()==="{}"; MarkLogic==={}'     }, 
    { index: 79,  arg1:  myEmptyObj,                    comment: 'myEmptyObj    typeof==="object";  constructor.name==="Object"; .valueOf()==={}; .toString()==="[object Object]"; JSON.stringify()==="{}"; MarkLogic==={}'     }, 
    { index: 80,  arg1:  myEmptyObj,                    comment: 'myEmptyObj    typeof==="object";  constructor.name==="Object"; .valueOf()==={}; .toString()==="[object Object]"; JSON.stringify()==="{}"; MarkLogic==={}; NOTE:  a reference to myEmptyObj is repeated for === equality  '     }, 
    { index: 81,  arg1: '{}',                           }, 
    { index: 82,  arg1:  { name:'test', number:17, zero:0, negZero:-0, notDefined: undefined, bool:true, nan:NaN, positiveInfinity:'INF', positiveInfinityLong: Infinity, negInfity:'-INF', negInfinityLong:-Infinity, "1 != weird #name":'', emptyArr:[], emptyObj:{}, emptyArrObj:[{}], nestedObj:{ nestedName:'nested', nestedNumber:42, nestedBool:false, nestedArray:[1, 1.1, '2', true, false, null, undefined, 0, -0, +0, NaN, Infinity, -Infinity, ]  }  }, }, 
    { index: 83,  arg1:  { name:'test', number:17, zero:0, negZero:-0, notDefined: undefined, bool:true, nan:NaN, positiveInfinity:'INF', positiveInfinityLong: Infinity, negInfity:'-INF', negInfinityLong:-Infinity, "1 != weird #name":'', emptyArr:[], emptyObj:{}, emptyArrObj:[{}], nestedObj:{ nestedName:'nested', nestedNumber:42, nestedBool:false, nestedArray:[1, 1.1, '2', true, false, null, undefined, 0, -0, +0, NaN, Infinity, -Infinity, ]  }  }, }, 
    { index: 84,  arg1:  Object.assign({},{a:1},{b:2}),                                                           comment: 'Object.assign({},{a:1},{b:2}) typeof==="object";  constructor.name==="Object"; .valueOf()==={"a": 1, "b": 2}; .toString()==="[object Object]"; JSON.stringify()==="{\"a\":1,\"b\":2}";      MarkLogic==={"a": 1, "b": 2} '  },
    { index: 85,  arg1:  Object.assign({},{a:1},{b:2}),                                                           comment: 'Object.assign({},{a:1},{b:2}) typeof==="object";  constructor.name==="Object"; .valueOf()==={"a": 1, "b": 2}; .toString()==="[object Object]"; JSON.stringify()==="{\"a\":1,\"b\":2}";      MarkLogic==={"a": 1, "b": 2} '  },
    { index: 86,  arg1:  myFooBarObj ,                                                                            comment: 'myFooBarObj                   typeof==="object";  constructor.name==="Object"; .valueOf()==={"foo": "bar"};   .toString()==="[object Object]"; JSON.stringify()==="{\"foo\":\"bar\"}";      MarkLogic==={"foo": "bar"}'       },
    { index: 87,  arg1:  myFooBarObj ,                                                                            comment: 'myFooBarObj                   typeof==="object";  constructor.name==="Object"; .valueOf()==={"foo": "bar"};   .toString()==="[object Object]"; JSON.stringify()==="{\"foo\":\"bar\"}";      MarkLogic==={"foo": "bar"}; NOTE:  a reference to myFooBarObj is repeated for === equality'       },
    { index: 88,  arg1:  {foo: 'bar'},                                                                            comment: ' {foo: \'bar\'}               typeof==="object";  constructor.name==="Object"; .valueOf()==={"foo": "bar"};   .toString()==="[object Object]"; JSON.stringify()==="{\"foo\":\"bar\"}";      MarkLogic==={"foo": "bar"}'       },
    { index: 89,  arg1:  {foo: "bar"},                                                                            comment: ' {foo:  "bar"}                typeof==="object";  constructor.name==="Object"; .valueOf()==={"foo": "bar"};   .toString()==="[object Object]"; JSON.stringify()==="{\"foo\":\"bar\"}";      MarkLogic==={"foo": "bar"}'       },

    { index: 90,  arg1: new myMsgClass("hi"),                                                                     comment: 'new myMsgClass("hi")          typeof==="object";  constructor.name==="myMsgClass";    .valueOf()==={"msg": "myMsgClass"};  .toString()==="[object Object]";  JSON.stringify()==="{}";   MarkLogic==={"msg": "myMsgClass"}  '   },
    { index: 91,  arg1: new myEmptyClass,                                                                         comment: "myEmptyClass                  typeof==='object';  constructor.name==='myEmptyClass';  .valueOf()==={};                     .toString()==='[object Object]';  JSON.stringify()==='{}';   MarkLogic==={}  "  },

    { index: 92,  arg1: new Error(),                                                                              comment: 'new Error()      typeof==="object";  constructor.name==="Error";     .valueOf()==={}; .toString()==="Error";          JSON.stringify()==="{}"; MarkLogic==={}'     },
    { index: 93,  arg1: myError,                                                                                  comment: 'myError          typeof==="object";  constructor.name==="Error";     .valueOf()==={"message": "myMessage", "name": "myError"}; .toString()==="myError: myMessage"; JSON.stringify()==="{\"message\":\"myMessage\",\"name\":\"myError\"}"; MarkLogic==={"message": "myMessage", "name": "myError"}'     },
    { index: 94,  arg1: myError,                                                                                  comment: 'myError          typeof==="object";  constructor.name==="Error";     .valueOf()==={"message": "myMessage", "name": "myError"}; .toString()==="myError: myMessage"; JSON.stringify()==="{\"message\":\"myMessage\",\"name\":\"myError\"}"; MarkLogic==={"message": "myMessage", "name": "myError"}'     },

    { index: 95,  arg1:  new Array(),                                                                             comment: 'new Array()      typeof==="object";  constructor.name==="Array";     .valueOf()===[];    .toString()==="";                JSON.stringify()==="[]";    MarkLogic===[]'   },
    { index: 96,  arg1:  myEmptyArray,                                                                            comment: 'myEmptyArray     typeof==="object";  constructor.name==="Array";     .valueOf()===[];    .toString()==="";                JSON.stringify()==="[]";    MarkLogic===[]'   },
    { index: 97,  arg1:  myEmptyArray,                                                                            comment: 'myEmptyArray     typeof==="object";  constructor.name==="Array";     .valueOf()===[];    .toString()==="";                JSON.stringify()==="[]";    MarkLogic===[];  NOTE:  a reference to myEmptyArray is repeated for === equality'   },
    { index: 98,  arg1:  [],                                                                                      comment: 'new Array()      typeof==="object";  constructor.name==="Array";     .valueOf()===[];    .toString()==="";                JSON.stringify()==="[]";    MarkLogic===[]'   },
    { index: 99,  arg1: '[]',                           }, 
    { index: 100, arg1:  [{}],                                                                                    comment: 'new Array()      typeof==="object";  constructor.name==="Array";     .valueOf()===[{}];  .toString()==="[object Object]"; JSON.stringify()==="[{}]";  MarkLogic===[{}]'   },
    { index: 101, arg1: '[{}]',                         },                   
    { index: 102, arg1:  [ 1, 1.1, '2', true, false, null, undefined, 0, -0, +0, NaN, Infinity, -Infinity, {name:'test', number:17, zero:0, negZero:-0, notDefined: undefined, bool: true, nan:NaN, infin: Infinity, negInfi: -Infinity, "1 != weird #name": '',  emptyArr: [], emptyObj: {}, emptyArrObj: [{}], nestedObj: {nestedName:'nested', nestedNumber:42, nestedBool: false, nestedArray: [1, 1.1, '2', true, false, null, undefined, 0, -0, +0, NaN, Infinity, -Infinity, ] }}], }, 
    { index: 103, arg1:  my12Array,                                                                               comment: 'my12Array        typeof==="object";  constructor.name==="Array";     .valueOf()===[1,2]; .toString()==="1,2";             JSON.stringify()==="[1,2]"; MarkLogic===[1,2]'  },
    { index: 104, arg1:  my12Array,                                                                               comment: 'my12Array        typeof==="object";  constructor.name==="Array";     .valueOf()===[1,2]; .toString()==="1,2";             JSON.stringify()==="[1,2]"; MarkLogic===[1,2]; NOTE:  a reference to my12Array is repeated for === equality'  },
    { index: 105, arg1:  [1, 2],                                                                                  comment: 'new Array()      typeof==="object";  constructor.name==="Array";     .valueOf()===[1,2]; .toString()==="1,2";             JSON.stringify()==="[1,2]"; MarkLogic===[1,2]'  },
    { index: 106, arg1: '[1,2]',                        }, 
    { index: 107, arg1: { length:3, '0':0, '1':1, },                                                              comment: 'array-like object'            },

    { index: 108, arg1: new RegExp(),                                                                             comment: 'new RegExp()        typeof==="object";  constructor.name==="RegExp";     .valueOf()==={};    .toString()==="/(?:)/";  JSON.stringify()==="{}"; MarkLogic==={}'   },
    { index: 109, arg1: /(?:)/ ,                                                                                  comment: '           /(?:)/   typeof==="object";  constructor.name==="RegExp";     .valueOf()==={};    .toString()==="/(?:)/";  JSON.stringify()==="{}"; MarkLogic==={}'   },
    { index: 110, arg1: new RegExp( /[1]/ ),                                                                      comment: 'new RegExp(/(?:)/)  typeof==="object";  constructor.name==="RegExp";     .valueOf()==={};    .toString()==="/[1]/";   JSON.stringify()==="{}"; MarkLogic==={}'   },

    { index: 111, arg1: new String('AB'),                                                                         comment: 'new String("AB")      typeof==="object";  constructor.name==="String";     .valueOf()==="AB";                  .toString()==="AB";               JSON.stringify()==="\"AB\"";                    MarkLogic==={"0": "A", "1": "B"}'   },
    { index: 112, arg1: 'AB',                                                                                     comment: ' "AB"                 typeof==="string";  constructor.name==="String";     .valueOf()==="AB";                  .toString()==="AB";               JSON.stringify()==="\"AB\"";                    MarkLogic==="AB"  '      },
    { index: 113, arg1: '"AB"',                                                                                   comment: 'new String("\"AB\"")  typeof==="string";  constructor.name==="String";     .valueOf()==="\"AB\"";              .toString()==="\"AB\"";           JSON.stringify()==="\"\\\"AB\\\"\"";            MarkLogic==="\"AB\"";  This is the string created by JSON.stringify("AB") '   },
    { index: 114, arg1: {"0":"A", "1":"B"},                                                                       comment: '{"0":"A", "1":"B"}    typeof==="object";  constructor.name==="Object";     .valueOf()==={"0": "A", "1": "B"};  .toString()==="[object Object]";  JSON.stringify()==="{\"0\":\"A\",\"1\":\"B\"}"; MarkLogic==={"0": "A", "1": "B"}; This is the object returned by new String("AB") '   },
    { index: 115, arg1: ["A", "B"],                                                                               comment: '["A", "B"]            typeof==="object";  constructor.name==="Array";      .valueOf()===["A", "B"];            .toString()==="A,B";              JSON.stringify()==="[\"A\",\"B\"]";             MarkLogic===["A", "B"]; Same as [..."AB"]  '  },
    { index: 116, arg1: '',                                                                                       comment: 'empty string'},
    { index: 117, arg1: "  '  ",                                                                                  comment: 'string with embedded single quote' },
    { index: 118, arg1: '  \'  ',                                                                                 comment: 'string with embedded single quote using backslash' },
    { index: 119, arg1: "  \"  ",                                                                                 comment: 'string with embedded double quote using backslash' },
    { index: 120, arg1: '  "  ',                                                                                  comment: 'string with embedded double quote' },
    { index: 121, arg1: '0123456789',                                                                             comment: "ASCII number characters" },
    { index: 122, arg1: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',                                                             comment: "ASCII upper case characters" },
    { index: 123, arg1: 'abcdefghijklmnopqrstuvwxyz',                                                             comment: "ASCII lower case characters" },
    { index: 124, arg1: '!"#$%&\'()*+-./:;<=>?@[\\]^_`{|}~',                                                      comment: "ASCII punctuation characters" },
    { index: 125, arg1: '\f \n \r \t \v \u00A0  \u2000 \u2001 \u2002 \u2003 \u2004 \u2005 \u2006 \u2007 \u2008 \u2009 \u200A \u200B  \u2028 \u2029 \u202F \u205F \u3000 \uFEFF ',  comment: "Whitespace only" }, 
    { index: 126, arg1: '\f \n \r \t \v \u00A0  \u2000 \u2001 \u2002 \u2003 \u2004 \u2005 \u2006 \u2007 \u2008 \u2009 \u200A  \u2028 \u2029 \u202F \u205F \u3000 \uFEFF '.trim(),  comment: "empty string" },   // NOTE: .trim() does not remove \u200B 
    { index: 127, arg1: 'This is a long string containing escape and unicode characters. Hexadecimal escapes \xA9 and \xa9 written as backslash plus xA9 are the same as the Unicode escapes \u00A9 and \u00a9 written as backslash plus u00A9. These are the same as the embedded unicode character ©. The unicode character \u2665 written as backslash plus u2665 is the same the embedded character ♥. ECMAScript 6 allows for six-digit unicode escapes, such as \u{1D306}, which is notated as backslash plus u{1D306}.  This string is longer than 900 characters to test long strings against functions that truncate strings. This string contains escape Characters. The final escape character in the string is the null character (U+0000 NULL). Because the null character terminates the string in C and MarkLogic it is the last character in the string following \" — you won\'t see it in C or MarkLogic\'s query console: \\ \b \f \n \r \t \v \' \" \0 ', }, 

    { index: 128, arg1: new Date('2018-02-13T07:04:23.253Z'),                                                     comment: 'new Date() typeof==="object";  constructor.name==="Date";  .valueOf()===1523325214120; .toString()==="Mon Apr 09 2018 19:53:34 GMT-0600 (Mountain Daylight Time)";  JSON.stringify()==="\"2018-04-10T01:53:34.120Z\"";   MarkLogic==="2018-04-10T01:53:34.12"  '     },
    { index: 129, arg1: '2018-02-13T07:04:23.253',      },
        
    { index: 130, arg1: new Function(),                                                                           comment: 'new Function()                 typeof==="function";  constructor.name==="Function";  .valueOf()==="function ()";              .toString()==="function anonymous() {\n\n}";        JSON.stringify()===undefined;   MarkLogic==="function ()"  '    },
    { index: 131, arg1: function(){return 'arg1'},                                                                comment: "function(){return 'arg1'}      typeof==='function';  constructor.name==='Function';  .valueOf()==='function arg1()';          .toString()==='function (){return \'arg1\'}';       JSON.stringify()===undefined;   MarkLogic==='function arg1()';   NOTE: function is named arg1 because it is assigned to property named arg1"  },
    { index: 132, arg1: function arg1(){return 'arg1'},                                                           comment: "function arg1(){return 'arg1'} typeof==='function';  constructor.name==='Function';  .valueOf()==='function arg1()';          .toString()==='function arg1(){return \'arg1\'}';   JSON.stringify()===undefined;   MarkLogic==='function arg1()';   NOTE: function is named arg1 because it is explicitly given the name arg1.  This function functionally identical to the previous arg1 function, but it has a differnt string layout and compares differently."   },
    { index: 133, arg1: sayHi,                                                                                    comment: 'sayHi                          typeof==="function";  constructor.name==="Function";  .valueOf()==="function sayHi()";         .toString()==="function sayHi(){return \'Hi!\'}";   JSON.stringify()===undefined;   MarkLogic==="function sayHi()";  NOTE: sayHi is a previously defined function that is assigned to arg1 '   },
    { index: 134, arg1: sayHi,                                                                                    comment: 'sayHi                          typeof==="function";  constructor.name==="Function";  .valueOf()==="function sayHi()";         .toString()==="function sayHi(){return \'Hi!\'}";   JSON.stringify()===undefined;   MarkLogic==="function sayHi()";  NOTE: sayHi is repeated for === equality '   },
    { index: 135, arg1: function sayHi(){return 'Hi!'},                                                           comment: 'new Function()                 typeof==="function";  constructor.name==="Function";  .valueOf()==="function sayHi()";         .toString()==="function sayHi(){return \'Hi!\'}";   JSON.stringify()===undefined;   MarkLogic==="function sayHi()";  NOTE: function is named sayHi and is assigned to arg1 property. It is identical to the previous sayHi, but is defined again independently. '   },
    { index: 136, arg1: function sayHi(){return 'Hi!'},                                                           comment: 'new Function()                 typeof==="function";  constructor.name==="Function";  .valueOf()==="function sayHi()";         .toString()==="function sayHi(){return \'Hi!\'}";   JSON.stringify()===undefined;   MarkLogic==="function sayHi()";  NOTE: This sayHi function is identical to the previous sayHi, but is defined yet again independently. '   },
    { index: 137, arg1: function* fixedGenerator(start = 1, step = 1, end = 1) {  while (start <= end) { yield start; start += step;  } },  comment: 'generator function',            },
    { index: 138,  arg1: myEmptyClass,                                                                            comment: "myEmptyClass                   typeof==='function';  constructor.name==='Function'';  .valueOf()==='function myEmptyClass()'; .toString()==='class myEmptyClass {  \n}';          JSON.stringify()===undefined;   MarkLogic==='function myEmptyClass()'  "  },

    { index: 139, arg1: new function(){},                                                                         comment: 'new function(){}     typeof==="object";  constructor.name==="";              .valueOf()==={};                     .toString()==="[object Object]";  JSON.stringify()==="{}";   MarkLogic==={}  '   },
    { index: 140, arg1: new function myObjFactory(){},                                                            comment: 'new function(){}     typeof==="object";  constructor.name==="myObjFactory";  .valueOf()==={};                     .toString()==="[object Object]";  JSON.stringify()==="{}";   MarkLogic==={}  '   },

    { index: 141, arg1: Symbol(),                                                                                 comment: 'Symbol() typeof==="symbol";  constructor.name==="Symbol";  .valueOf()===undefined;  .toString()==="Symbol()";  JSON.stringify()===undefined;   MarkLogic==="undefined"  '   },
    { index: 142, arg1: Symbol(),                                                                                 comment: 'Symbol() typeof==="symbol";  constructor.name==="Symbol";  .valueOf()===undefined;  .toString()==="Symbol()";  JSON.stringify()===undefined;   MarkLogic==="undefined"  '   },
    { index: 143, arg1: mySymbol,                                                                                 comment: 'mySymbol typeof==="symbol";  constructor.name==="Symbol";  .valueOf()===undefined;  .toString()==="Symbol()";  JSON.stringify()===undefined;   MarkLogic==="undefined"  '   },
    { index: 144, arg1: mySymbol,                                                                                 comment: 'mySymbol typeof==="symbol";  constructor.name==="Symbol";  .valueOf()===undefined;  .toString()==="Symbol()";  JSON.stringify()===undefined;   MarkLogic==="undefined"  '   },
    { index: 145, arg1: Symbol('foo'),                                                                            comment: 'Symbol() typeof==="symbol";  constructor.name==="Symbol";  .valueOf()===foo;        .toString()==="Symbol(foo)";  JSON.stringify()===undefined;   MarkLogic==="foo"  '   },
    { index: 146, arg1: Symbol('foo'),                                                                            comment: 'Symbol() typeof==="symbol";  constructor.name==="Symbol";  .valueOf()===foo;        .toString()==="Symbol(foo)";  JSON.stringify()===undefined;   MarkLogic==="foo"  '   },

    { index: 147, arg1: BigNumber(+0),                                                                            comment: '' },
    { index: 148, arg1: BigNumber(-0),                                                                            comment: '' },
    { index: 149, arg1: BigNumber(0),                                                                             comment: '' },
    { index: 150, arg1: BigNumber(NaN),                                                                           comment: '' },
    { index: 151, arg1: BigNumber(Infinity),                                                                      comment: '' },
    { index: 152, arg1: BigNumber(-Infinity),                                                                     comment: '' },
    { index: 153, arg1: BigNumber("1025896473569873254137895.02511669844"),                                       comment: '' },
    { index: 154, arg1: BigNumber(1234567899),                                                                    comment: '' },
    { index: 155, arg1: BigNumber("-1025896473569873254137895.02511669844"),                                      comment: '' },
    { index: 156, arg1: BigNumber(-1234567899),                                                                   comment: '' },
    { index: 157, arg1: DateTime.fromISO("2016-11-05T09:15:00"),                                                  comment: '' },
    { index: 158, arg1: DateTime.fromISO("2017-W23-5"),                                                           comment: '' },
    { index: 159, arg1: DateTime.fromISO("2017-W43-5"),                                                           comment: '' },
    { index: 160, arg1: Duration.fromObject({months: 7, days: 3, hours: 6}),                                      comment: '' },
    { index: 161, arg1: Duration.fromObject({months: 2, hours: 6}),                                               comment: '' },
    { index: 162, arg1: Interval.fromDateTimes( DateTime.fromISO("2017-W23-5"), DateTime.fromISO("2017-W43-5") ), comment: '' },

  ];

  return testSet
}

