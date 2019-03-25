'use strict';

module.exports.criticalValues = getTestSet_CriticalValues


/*
 
 
 =============================================================================
   FUNCTIONS
   - getTestSet_CriticalValues()
   
 =============================================================================
   HOW TO
 =============================================================================
 
 =============================================================================
   getTestSet_CriticalValues() 
     - It returns an array of testConfig objects that are ideal for testing corner cases.
     - It covers all major types of values including numbers, strings, dates, booleans, arrays, and objects.
     - It contains troublesome types and values, such as undefined, null, -0, INF, -INF, NaN, new String(''), [], {}, etc.
 */

const BigNumber = require('bignumber.js');
const { DateTime } = require('luxon');
const { Duration } = require('luxon');
const { Interval } = require('luxon');


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