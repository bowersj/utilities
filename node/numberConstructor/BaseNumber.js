import {
    isDouble, isDoubleInRange, isFunction, isInfinity,
    isInteger, isIntegerInRange, isIntegerNegative,
    isNan, isNull
} from "../isType/allTypes";
import {Decimal} from "../decimal/Decimal";
import {
    getDigit, getNumOfDigits,
    randomInt_bounded, randomInt_minBounded
} from "../utilities/math";
import {createMeasure} from "../uom/uom";
import {err} from "../uom/error";
import {
    _roundAwayFrom0, _roundTowards0, _roundTowardsInf,
    _roundTowardsNegInf, _roundHalfUp, _roundHalfDown,
    _roundHalfEven, _roundHalfCeil, _roundHalfFloor,
    validateRM, validateType, _roundHelper,
    standardizeNumberInput, generic_validate,
    usl_min_helper, usl_max_helper, usl_hypot_helper,

} from "./helpers";

const min = Number.MIN_VALUE * -1;

export const types = {
    byte: {
        __lowerBound: -128,
        __upperBound: 127,
        precision: 2,
        decCheck: isInteger,
        rangeCheck: value => isIntegerInRange( value, -128, 127 ),
    },
    short: {
        __lowerBound: -32768,
        __upperBound: 32767,
        precision: 4,
        decCheck: isInteger,
        rangeCheck: value => isIntegerInRange( value, -32768, 32767 ),
    },
    int: {
        __lowerBound: -2147483648,
        __upperBound: 2147483647,
        precision: 9,
        decCheck: isInteger,
        rangeCheck: value => isIntegerInRange( value, -2147483648, 2147483647 ),
    },
    unsignedByte: {
        __lowerBound: 0,
        __upperBound: 256,
        precision: 2,
        decCheck: isInteger,
        rangeCheck: value => isIntegerInRange( value, 0, 256 ),
    },
    unsignedShort: {
        __lowerBound: 0,
        __upperBound: 65535,
        precision: 4,
        decCheck: isInteger,
        rangeCheck: value => isIntegerInRange( value, 0, 65535 ),
    },
    unsignedInt: {
        __lowerBound: 0,
        __upperBound: 4294967295,
        precision: 9,
        decCheck: isInteger,
        rangeCheck: value => isIntegerInRange( value, 0, 4294967295 ),
    },
    float: {
        __lowerBound: min,
        __upperBound: Number.MAX_VALUE,
        precision: 15,
        decCheck: isDouble,
        rangeCheck: value => isDoubleInRange( value, min, Number.MAX_VALUE ),
    },
    double: {
        __lowerBound: min,
        __upperBound: Number.MAX_VALUE,
        precision: 15,
        decCheck: isDouble,
        rangeCheck: value => isDoubleInRange( value, min, Number.MAX_VALUE ),
    }
};
// order is very important do not mess with it unless a type is added
types.names = [ "byte", "unsignedByte", "short", "unsignedShort", "int", "unsignedInt", "float", "double" ];

/**
 * @constructor
 *
 * @param {String} type
 * @param {*} value
 * @param {Integer} [roundingMethodEnum = 4] must be an integer within the range 0 to 8
 *
 * @property {Object} this
 * @property {Number} this.value - the number to use with in the type
 * @property {String} this.type - String, must be one of the properties in the types object
 * @property {String} this._jsType - the JavaScript type used
 * @property {Number} this.__lowerBound - lower limit of the type
 * @property {Number} this.__upperBound - upper limit of the type
 * @property {Function} this.decCheck - the function to use to check for the right type
 * @property {Function} this.rangeCheck - the function to use to check the range
 * @property {Integer} this._round - which rounding method to use
 */
export function BaseNumber( type, value, roundingMethodEnum = 4 ){
    validateRM( roundingMethodEnum );
    validateType( type, value );

    this.value = value;
    this._round = roundingMethodEnum;

    const typeDef = types[ type ];
    Object.defineProperties( this, {
        type:{ value: type },
        __lowerBound:{ value: typeDef.__lowerBound },
        __upperBound:{ value: typeDef.__upperBound },
        decCheck:{ value: typeDef.decCheck },
        rangeCheck:{ value: typeDef.rangeCheck },
        _jsType:{ value: "number" },
        quantity:{
            get: function(){
                return new Decimal( this.value )
            },
            set: function( value ){
                let val = standardizeNumberInput( value );

                if( this.validate( val ) )
                    this.value = val;
                else
                    throw new Error( `The value, ${value}, cannot be parsed or isn't a valid ${this.type}` );

                return this.value;
            }
        }
    });
}


BaseNumber.prototype.E           = Math.E;
BaseNumber.prototype.LN2         = Math.LN2;
BaseNumber.prototype.LN10        = Math.LN10;
BaseNumber.prototype.LOG2E       = Math.LOG2E;
BaseNumber.prototype.LOG10E      = Math.LOG10E;
BaseNumber.prototype.PI          = Math.PI;
BaseNumber.prototype.SQRT2       = Math.SQRT2;
BaseNumber.prototype.SQRT1_2     = Math.SQRT1_2;
BaseNumber.prototype.base64Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/";
BaseNumber.prototype.ROUND_UP         = 0;
BaseNumber.prototype.ROUND_DOWN       = 1;
BaseNumber.prototype.ROUND_CEIL       = 2;
BaseNumber.prototype.ROUND_FLOOR      = 3;
BaseNumber.prototype.ROUND_HALF_UP    = 4;
BaseNumber.prototype.ROUND_HALF_DOWN  = 5;
BaseNumber.prototype.ROUND_HALF_EVEN  = 6;
BaseNumber.prototype.ROUND_HALF_CEIL  = 7;
BaseNumber.prototype.ROUND_HALF_FLOOR = 8;


BaseNumber.prototype._getValue = function getValue( value ){
    if( isNull( value ) )
        return this.value;

    const valueType = typeof value;

    if( valueType === "number" )
        return value;

    if( value.valueOf )
        return value.valueOf();
    else
        throw new Error( `The value, ${value}, must either be a number or have a method valueOf which returns a number.` );
};

BaseNumber.prototype.add =
    BaseNumber.prototype.plus = function add( value ){
        value = this._getValue( value );

        let val = this.value + value;

        return this._safeUpdate( val );
    };
BaseNumber.prototype.sub =
    BaseNumber.prototype.subtract = function sub( value ){
        value = this._getValue( value );

        let val = this.value - value;

        return this._safeUpdate( val );
    };
BaseNumber.prototype.mul =
    BaseNumber.prototype.times = function mul( value ){
        value = this._getValue( value );

        let val = this.value * value;

        return this._safeUpdate( val );
    };

/**
 * @param {Integer|Number|USLNumber} value
 * @param {roundingFunction} round
 */
BaseNumber.prototype.div =
    BaseNumber.prototype.division = function div( value, round = null ){
        value = this._getValue( value );
        if( isNull( round ) )
            round = this.round;

        let val = round( this.value / value );

        return this._safeUpdate( val );
    };
BaseNumber.prototype.mod =
    BaseNumber.prototype.modulo = function mod( value, invert = false, round ){
        if( isNull( round ) )
            round = this.round;
        let val = 0;
        if( invert )
            val = round( value % this.value );
        else
            val = round(this.value % value );

        return this._safeUpdate( val );
    };

BaseNumber.prototype.sum = function sum( ...args ){
    let sum = 0;
    let num = -1;
    for( let i = 0; i < args.length; ++i ){
        num = standardizeNumberInput( args[i] );
        sum += num;
    }

    sum += this.value;

    this._safeUpdate( sum );
    return this;
};
BaseNumber.prototype.numOfDigits = function numOfDigits( value ){
    value = this._getValue( value );


    if( isInteger( value ) )
        return Math.floor( Math.log10( Math.abs( value ) ) ) + 1;
    else{
        let str = value.toString();

        if( str.includes( "." ) )
            return str.length - 1;
        else
            return str.length;
    }
};

/**
 * @methodOf BaseNumber
 * @method getDigit
 * @version 2.0.1
 * @public
 *
 * returns the digit at the specified location, if that location does not exist than 0 is returned.
 *
 * @param {Integer} digit - the place, 0 indexed, that you want to retrieve.
 *      ( 0 => 1's, 1 => 10's, 2 => 100's and -1 => 0.1's, -2 => 0.01's )
 *
 * @return {Integer} return the number at the specified location,
 * if required position does not exist in the number 0 is returned.
 *
 * @example getDigit( 1230.456, -3 ) // => 6
 * @example getDigit( 1230.456, -2 ) // => 5
 * @example getDigit( 1230.456, -1 ) // => 4
 * @example getDigit( 1230.456,  0 ) // => 0
 * @example getDigit( 1230.456,  1 ) // => 3
 * @example getDigit( 1230.456,  2 ) // => 2
 * @example getDigit( 1230.456,  3 ) // => 1
 *
 * @example getDigit( 1230.456, -4 )  // => 0
 * @example getDigit( 1230.456, -10 ) // => 0
 * @example getDigit( 1230.456,  5 )  // => 0
 * @example getDigit( 1230.456,  10 ) // => 0
 */
BaseNumber.prototype.getDigit = function _getDigit( digit ){
    return getDigit( this.value, digit );
};

BaseNumber.prototype.random  = function random( min, max ){
    min = Math.floor( min );
    max = Math.ceil( max );

    if( isNaN( min ) || isNaN( max ) )
        throw new Error( 'min and max must be a number.' );

    if( min === -Infinity && max === Infinity )
        this.value = Math.round( Math.random() * Math.pow( 10, randomInt_bounded( 1, 15 ) ) );
    else if( min === -Infinity )
        this.value = Math.floor( Math.random() * Math.pow( 10, getNumOfDigits( min ) ) ) + min;
    else if( max === Infinity )
        this.value = randomInt_minBounded( min );
    else
        this.value = randomInt_bounded( min, max );

    return this;
};
BaseNumber.prototype.atan2   = function atan2(  y, invert = false, round, x ){
    if( isNull( y ) )
        throw new Error( `y must be provided` );

    y = this._getValue( y );
    x = this._getValue( x );
    if( isNull( round ) )
        round = this.round;

    let val = -Infinity;
    if( invert )
        val = round( Math.atan2( y, x) );
    else
        val = round( Math.atan2( x, y ) );

    if( ( val ) )
        this.value = val;
    else
        throw new Error( `The calculated value, ${val}, is not valid.` );

    return this;
};
BaseNumber.prototype.imul    = function imul(   y, round, x ){
    if( isNull( y ) )
        throw new Error( `y must be provided` );

    if( isNull( round ) )
        round = this.round;

    y = this._getValue( y );
    x = this._getValue( x );

    let val = round( Math.imul( x, y ) );

    if( ( val ) )
        this.value = val;
    else
        throw new Error( `The calculated value, ${val}, is not valid.` );

    return this;
};
BaseNumber.prototype.pow     =
    BaseNumber.prototype.toPower = function pow(    y, round, x ){
        if( isNull( y ) )
            throw new Error( `y must be provided` );

        if( isNull( round ) )
            round = this.round;

        y = this._getValue( y );
        x = this._getValue( x );

        let val = round( Math.pow( x, y ) );

        if( ( val ) )
            this.value = val;
        else
            throw new Error( `The calculated value, ${val}, is not valid.` );
        return this;
    };

BaseNumber.prototype.hypot = function hypot( round, ...rest ){
    rest.push( this.value );
    if( isNull( round ) )
        round = this.round;

    let max = round( usl_max_helper( rest ) );

    if( this.validate( max ) ){
        this.value = max;
        return this;
    } else
        throw new Error( `The value, ${max}, is not a valid, ${this.type}` );
};
BaseNumber.prototype.min   = function min(   round, ...rest ){
    rest.push( this.value );
    if( isNull( round ) )
        round = this.round;

    let min = round( usl_min_helper( rest ) );

    if( this.validate( min ) ){
        this.value = min;
        return this;
    } else
        throw new Error( `The value, ${min}, is not a valid, ${this.type}` );
};
BaseNumber.prototype.max   = function max(   round, ...rest ){
    rest.push( this.value );
    if( isNull( round ) )
        round = this.round;

    let hypot = round( usl_hypot_helper( round, rest ) );

    if( this.validate( hypot ) ){
        this.value = hypot;
        return this;
    } else
        throw new Error( `The value, ${hypot}, is not a valid, ${this.type}` );
};

BaseNumber.prototype.acos   = function acos(  round ){ this.generic_one( Math.acos,  round ) };
BaseNumber.prototype.acosh  = function acosh( round ){ this.generic_one( Math.acosh, round ) };
BaseNumber.prototype.asin   = function asin(  round ){ this.generic_one( Math.asin,  round ) };
BaseNumber.prototype.asinh  = function asinh( round ){ this.generic_one( Math.asinh, round ) };
BaseNumber.prototype.atan   = function atan(  round ){ this.generic_one( Math.atan,  round ) };
BaseNumber.prototype.atanh  = function atanh( round ){ this.generic_one( Math.atanh, round ) };
BaseNumber.prototype.cbrt   = function cbrt(  round ){ this.generic_one( Math.cbrt,  round ) };
BaseNumber.prototype.cos    = function cos(   round ){ this.generic_one( Math.cos,   round ) };
BaseNumber.prototype.cosh   = function cosh(  round ){ this.generic_one( Math.cosh,  round ) };
BaseNumber.prototype.log    = function log(   round ){ this.generic_one( Math.log,   round ) };
BaseNumber.prototype.log1p  = function log1p( round ){ this.generic_one( Math.log1p, round ) };
BaseNumber.prototype.log10  = function log10( round ){ this.generic_one( Math.log10, round ) };
BaseNumber.prototype.log2   = function log2(  round ){ this.generic_one( Math.log2,  round ) };
BaseNumber.prototype.sin    = function sin(   round ){ this.generic_one( Math.sin,   round ) };
BaseNumber.prototype.sinh   = function sinh(  round ){ this.generic_one( Math.sinh,  round ) };
BaseNumber.prototype.sqrt   = function sqrt(  round ){ this.generic_one( Math.sqrt,  round ) };
BaseNumber.prototype.tan    = function tan(   round ){ this.generic_one( Math.tan,   round ) };
BaseNumber.prototype.tanh   = function tanh(  round ){ this.generic_one( Math.tanh,  round ) };

BaseNumber.prototype.abs    = function abs(){    this.generic_one( Math.abs ); };
BaseNumber.prototype.ceil   = function ceil(){   this.generic_one( Math.ceil ) };
BaseNumber.prototype.clz32  = function clz32(){  this.generic_one( Math.clz32 ) };
BaseNumber.prototype.exp    = function exp(){    this.generic_one( Math.exp ) };
BaseNumber.prototype.expm1  = function expm1(){  this.generic_one( Math.expm1 ) };
BaseNumber.prototype.floor  = function floor(){  this.generic_one( Math.floor ) };
BaseNumber.prototype.fround = function fround(){ this.generic_one( Math.fround ) };
BaseNumber.prototype.round  = function round( value ){
    value = this._getValue( value );
    let val = _roundHelper( value, this._round );
    return this._safeUpdate( val );
};
BaseNumber.prototype.sign   = function sign(){ return Math.sign( this.value ); };

BaseNumber.prototype.changeRM =
    BaseNumber.prototype.changeRoundingMethod = function changeRoundingMethod( roundingMethodEnum ){
        if( !isIntegerInRange( roundingMethodEnum, 0, 8 ) )
            throw new Error( `the roundingMethodEnum, ${roundingMethodEnum}, must be an integer between 0 and 8` );

        this._round = roundingMethodEnum;
        return this;
    };


BaseNumber.prototype.isPositive = function isPositive(){
    return this.value > 0;
};
BaseNumber.prototype.isNegative = function isPositive(){
    return this.value < 0;
};
BaseNumber.prototype.isZero = function isZero(){
    return Object.is( this.value, 0 );
};
BaseNumber.prototype.precision = function getPrecision(){
    return types[ this.type ] + 0;
};

BaseNumber.prototype.negate = function negate(){
    return this.value * -1;
};

BaseNumber.prototype.toFixed = function toFixed( round ){
    if( isNull( round ) )
        round = this.round;

    let val = round( this.value );

    if( typeof val === "number" )
        return val.toFixed();
    else
        return val.value.toFixed();
};

BaseNumber.prototype.compareTo = function compareTo( value ){
    value = standardizeNumberInput( value );
    let current = this.value;

    if( current < value )
        return -1;
    else if( current > value )
        return 1;
    else
        return 0;
};
BaseNumber.prototype.greaterThan = function greaterThan( value ){
    value = standardizeNumberInput( value );
    return this.value > value;
};
BaseNumber.prototype.greaterThanOrEqual = function greaterThanOrEqual( value ){
    value = standardizeNumberInput( value );
    return this.value >= value;
};
BaseNumber.prototype.lessThan = function lessThan( value ){
    value = standardizeNumberInput( value );
    return this.value < value;
};
BaseNumber.prototype.lessThanOrEqual = function lessThanOrEqual( value ){
    value = standardizeNumberInput( value );
    return this.value <= value;
};
BaseNumber.prototype.eq =
    BaseNumber.prototype.equals = function eq( value ){
        return this.value === value
    };

BaseNumber.prototype.trunc  = function trunc(){  this.generic_one( Math.trunc ) };

BaseNumber.prototype.validate  = function validate( value ){
    value = this._getValue( value );
    return generic_validate( value, this.decCheck ) && this.rangeCheck( value, this.__lowerBound, this.__upperBound );
};

// measure functions
BaseNumber.prototype.mulByUnit = function({ unit, quantity }){

    let transitionMeasure = {};

    // handles passing a measure object in, in the unit property or not
    if (unit.isMeasure)
        transitionMeasure = unit;
    else
        transitionMeasure = createMeasure({unit, quantity});

    const currentMeasure = this;

    const val = currentMeasure.times( transitionMeasure.getQuantity() );

    return createMeasure({ unit: transitionMeasure.getUnit(), quantity: val })
};
BaseNumber.prototype.divByUnit = function({ unit, quantity }){

    let transitionMeasure = {};

    // handles passing a measure object in, in the unit property or not
    if (unit.isMeasure)
        transitionMeasure = unit;
    else
        transitionMeasure = createMeasure({unit, quantity});

    const transMeasure = transitionMeasure.getType();

    if( transMeasure !== "duration" )
        throw err.cannotConvert( "Scalar", transMeasure );

    const currentMeasure = this;
    const val = currentMeasure.dividedBy( transitionMeasure.getQuantity() );

    return createMeasure({ unit: "hertz", quantity: val })
};


BaseNumber.prototype.toMeasure   = function toMeasure( type ){
    let val = this.value;
    return createMeasure({ type, quantity: val });
};
BaseNumber.prototype.toDecimal   = function toDecimal( constructor = Decimal ){
    return new constructor( this.value )
};
BaseNumber.prototype.toInteger   = function toInteger( constructor = Decimal ){
    let num = this.round();
    return new constructor( num.value )
};
BaseNumber.prototype.toLong      = function toLong( constructor = Decimal ){
    let num = this.round();
    return new constructor( num.value )
};
BaseNumber.prototype.toUnsignedLong = function toUnsignedLong( constructor = Decimal ){
    let num = this.round();
    return new constructor( num.value )
};
BaseNumber.prototype.toDouble    = function toDouble(){
    return new BaseNumber( "double", this.value + 0 );
};
BaseNumber.prototype.toFloat     = function toFloat(){
    return new BaseNumber( "float", this.value + 0 );
};
BaseNumber.prototype.toByte      = function toByte(){
    let num = this.round();
    return new BaseNumber( "byte", num.value + 0 );
};
BaseNumber.prototype.toShort     = function toShort(){
    let num = this.round();
    return new BaseNumber( "short", num.value + 0 );
};
BaseNumber.prototype.toInt       = function toInt(){
    let num = this.round();
    return new BaseNumber( "int", num.value + 0 );
};
BaseNumber.prototype.toUnsignedByte  = function toUnsignedByte(){
    let num = this.round();
    return new BaseNumber( "unsignedByte", num.value + 0 );
};
BaseNumber.prototype.toUnsignedShort = function toUnsignedShort(){
    let num = this.round();
    return new BaseNumber( "unsignedShort", num.value + 0 );
};
BaseNumber.prototype.toUnsignedInt = function toUnsignedShort(){
    let num = this.round();
    return new BaseNumber( "unsignedInt", num.value + 0 );
};
BaseNumber.prototype.toNumber    = function toNumber(){
    return this.value;
};
BaseNumber.prototype.toJS        = function toJS(){
    return this.toNumber();
};
BaseNumber.prototype.toJSON      = function toJSON(){
    return this.toNumber();
};
BaseNumber.prototype.toString    = function( radix = 10 ){
    if( !isIntegerInRange( radix, 0, 32 ) )
        throw new Error( `The radix, ${radix}, must be with in the range 0 and 32` );

    return this.value.toString( radix );
};
/**
 * @return {string}
 */
BaseNumber.prototype.toBinaryStr = function TBS(){
    let val = this.value;
    if(val > -1) {
        // credit goes to
        // https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
        return val.toString( 2 );
    } else {
        // Credit goes to
        // https://stackoverflow.com/questions/4338315/inverting-a-binary-value-of-a-number
        let bitStr = val.toString( 2 );
        let mask = Math.pow(2, bitStr.length ) - 1; // calculate mask
        return ( ~x & mask ).toString( 2 );
    }
};
BaseNumber.prototype.toHex = function toHex(){
    return this.value.toString( 16 );
};
BaseNumber.prototype.toOctal = function toHex(){
    return this.value.toString( 8 );
};

BaseNumber.prototype.toBase64 = function toBase64(){
    // credit where its due
    // https://stackoverflow.com/questions/6213227/fastest-way-to-convert-a-number-to-radix-64-in-javascript#answer-6573119
    let number = this.value;
    let chars = this.base64Chars;
    let residual = Math.floor(number);
    let idx = -1;
    let result = '';

    if( isIntegerNegative( this.value ) )
        result = "-";

    while (true) {
        idx = residual % 64;
        result = chars.charAt(idx) + result;
        residual = Math.floor(residual / 64);
        if (residual === 0)
            break;
    }

    return result;
};
BaseNumber.prototype.valueOf   = function valueOf(){
    return this.toNumber();
};

BaseNumber.prototype.generic_one  = function generic_one( func, round ){
    if( isNull( round ) )
        round = this.round;

    let val = round( func( this.value ) );
    this._safeUpdate( val );

    return this;
};

BaseNumber.prototype.clone = function clone(){
    return new BaseNumber( this.type + "", this.value + 0 );
};


// Rounding methods
// ROUND_UP         0 Away from zero.
// ROUND_DOWN       1 Towards zero.
// ROUND_CEIL       2 Towards +Infinity.
// ROUND_FLOOR      3 Towards -Infinity.
// ROUND_HALF_UP    4 Rounds towards nearest neighbour. If equidistant, rounds away from zero
// 1.5 ~ 2 But 1.4 ~ 1 , -1.5 ~ -2

// ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, rounds towards zero.
// 1.5 ~ 1 But 1.6 ~ 2 ,  -1.5 ~ -1

// ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, rounds towards even neighbour
// 23.5 ~ 24 and 24.5 ~ 24,  −23.5 ~ -24

// Important to note this is good for not introducing bias in aggregations

// ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
// emulates Math.round

// ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
//

BaseNumber.prototype.roundAwayFrom0 = function roundAwayFromZero( value ){
    value = BaseNumber.prototype._getValue( value );
    return this._safeUpdate( _roundAwayFrom0( value ) );
};
BaseNumber.prototype.roundTowards0 = function roundTowardZero( value ){
    value = BaseNumber.prototype._getValue( value );
    return this._safeUpdate( _roundTowards0( value ) );
};
BaseNumber.prototype.roundTowardsInf = function roundTowardsInf( value ){
    value = BaseNumber.prototype._getValue( value );
    return this._safeUpdate( _roundTowardsInf( value ) );
};
BaseNumber.prototype.roundTowardsNegInf = function roundTowardsNegInf( value ){
    value = BaseNumber.prototype._getValue( value );
    return this._safeUpdate( _roundTowardsNegInf( value ) )
};
BaseNumber.prototype.roundHalfUp = function roundHalfUp( value ){
    value = BaseNumber.prototype._getValue( value );
    return this._safeUpdate( _roundHalfUp( value ) )
};
BaseNumber.prototype.roundHalfDown = function roundHalfDown( value ){
    value = BaseNumber.prototype._getValue( value );
    return this._safeUpdate( _roundHalfDown( value ) );
};
BaseNumber.prototype.roundHalfEven = function roundHalfEven( value ){
    value = BaseNumber.prototype._getValue( value );
    return this._safeUpdate( _roundHalfEven( value ) );
};
BaseNumber.prototype.roundHalfCeil = function roundHalfCeil( value ){
    value = BaseNumber.prototype._getValue( value );
    return this._safeUpdate( _roundHalfCeil( value ) );
};
BaseNumber.prototype.roundHalfFloor = function roundHalfFloor( value ){
    value = BaseNumber.prototype._getValue( value );
    return this._safeUpdate( _roundHalfFloor( value ) );
};
BaseNumber.prototype.roundBy = function( roundingMethodEnum = 4 ){
    let val = _roundHelper( this.value, roundingMethodEnum );
    return this._safeUpdate( val );
};

BaseNumber.prototype._safeUpdate = function safeUpdate( value ){
    if( this.validate( value ) ){
        this.value = value;
    } else
        throw new Error( `The calculated value, ${value}, is not a valid ${this.type}` );

    return this;
};

Object.freeze( BaseNumber.prototype );