import {getAverage, getDigit, getMedian} from "../utilities/math";
import {isFunction, isInfinity, isIntegerInRange, isNan, isNull, isIntegerEven, isNegativeZero} from "../isType/allTypes";
import {getEpochMilliseconds, getValueOfPrimitiveObject} from "../dateTime_helpers";
import {typeOf} from "../typeof";
import {alwaysTrue} from "../schema/def_v2";
import {types, BaseNumber} from "./BaseNumber";

export function _roundAwayFrom0( value ){
    if( value > 0 )
        return Math.ceil( value );
    else
        return Math.floor( value );
}
export function _roundTowards0( value ){
    if( value > 0 )
        return Math.floor( value );
    else
        return Math.ceil( value );
}
export function _roundTowardsInf( value ){
    return Math.ceil( value );
}
export function _roundTowardsNegInf( value ){
    return Math.floor( value );
}
export function _roundHalfUp( value ){

    if( value > 0 )
        return Math.round( value );
    else if( value < 0 ){
        return -Math.round( -value );
    } else {
        return 0
    }

}
export function _roundHalfDown( value ){
    if( value > 0 )
        return -Math.round( -value );
    else if( value < 0 ){
        return Math.round( value );
    } else {
        return 0
    }
}
export function _roundHalfEven( value ){
    let whole = parseInt( value, 10 );

    if( getDigit( value, -1 ) === 5 ){

        if( value > 0 ){

            if( isIntegerEven( whole ) )
                return Math.floor( value );
            else
                return Math.ceil( value );

        } else {
            if( isIntegerEven( whole ) )
                return Math.ceil( value );
            else
                return Math.floor( value );
        }
    }
    return Math.round( value );
}
export function _roundHalfCeil( value ){
    return Math.round( value );
}
export function _roundHalfFloor( value ) {
    return -Math.round( -value );
}

export function validateRM( value ){
    if( !isIntegerInRange( value, 0, 8 ) )
        throw new Error( `the roundingMethodEnum, ${value}, must be an integer between 0 and 8` );
}

export function validateType( type, value ){
    const typeDef = types[ type ];
    if( !( typeDef.decCheck( value ) && typeDef.rangeCheck( value ) ) )
        throw new Error( `the value, ${value}, is not a valid ${type}.` );
}

export function _roundHelper( value, roundingMethodEnum ){
    if( !isIntegerInRange( roundingMethodEnum, 0, 8 ) )
        throw new Error( `the roundingMethodEnum, ${roundingMethodEnum}, must be an integer between 0 and 8` );

    switch( roundingMethodEnum ){
        case 0 :
            return _roundAwayFrom0( value );
        case 1:
            return _roundTowards0( value );
        case 2:
            return _roundTowardsInf( value );
        case 3:
            return _roundTowardsNegInf( value );
        case 4:
            return _roundHalfUp( value );
        case 5:
            return _roundHalfDown( value );
        case 6:
            return _roundHalfEven( value );
        case 7:
            return _roundHalfCeil( value );
        case 8:
            return _roundHalfFloor( value );
    }
}

export function standardizeNumberInput( value ){
    if( isNegativeZero( value ) )
        value = 0;

    if( value instanceof BaseNumber )
        return this.value;

    value = getValueOfPrimitiveObject( value );

    let _typeOf = typeOf( value );
    let val = -1;

    switch( _typeOf ){
        case "string":
            if( value === "" ){
                val = null;
                break;
            }
        case "number":
        case "double":
        case "boolean":
            val = +value;
            break;

        case "decimal":
            val = value.toNumber();
            break;
        case "date":
        case "time":
        case "dateTime":
        case "duration":
        case "period":
        case "zonedDateTime":
            val = getEpochMilliseconds( value );
            break;
        default:
            val = null;
    }

    if( !generic_validate( val ) )
        throw new Error( `The value, ${value}, cannot be parsed into a USL number type.` );

    return val;
}

export function generic_validate( value, decCheck = alwaysTrue ){
    value = BaseNumber.prototype._getValue( value );

    return !( isNull( value ) || isNan( value ) ) && decCheck( value );
}


export function create( type, value = 0, roundingMethodEnum = 4 ){
    validateRM( roundingMethodEnum );

    value = standardizeNumberInput( value );

    if( type === "best" ){
        if( isInfinity( value ) )
            return new BaseNumber( "double", value, roundingMethodEnum );

        let t = types.names;
        let b = {};
        for( let i = 0, l = t.length; i < l; ++i ){
            b = types[ t[i] ];
            if( b.__lowerBound < value && b.__upperBound > value ){
                return new BaseNumber( t[i], value, roundingMethodEnum );
            }
        }

        throw new Error( `A type does not exist which can represent that number.` );

    } else if( Object.hasOwnProperty.call( types, type ) ){
        return new BaseNumber( type, value );
    } else
        throw new Error( `The type, ${type}, is not defined.` );
}

export function usl_min_helper( rest ){
    // let decMin = Decimal.min.apply( null, rest );
    // let min = decMin.toNumber();
    let val = 0.1;

    for( let i = 0, l = rest.length; i < l; ++i ){
        val = standardizeNumberInput( rest[i] );

        if( !generic_validate( val ) )
            throw new Error( `The value, ${rest[i]}, is not in a parsable USL number format.` );

        rest[i] = val;
    }

    return Math.min.apply( null, rest );
}

export function usl_max_helper( rest ){
    // let decMax = Decimal.max.apply( null, rest );
    // let max = decMax.toNumber();
    let val = 0.1;

    for( let i = 0, l = rest.length; i < l; ++i ){
        val = standardizeNumberInput( rest[i] );

        if( !generic_validate( val ) )
            throw new Error( `The value, ${rest[i]}, is not in a parsable USL number format.` );

        rest[i] = val;
    }

    return Math.max.apply( null, rest );
}

export function usl_hypot_helper( round, rest ){
    if( typeof round !== "function" )
        throw new Error( `round must be a function to round each value.` );

    let val = 0.1;

    for( let i = 0, l = rest.length; i < l; ++i ){
        val = standardizeNumberInput( rest[i] );

        if( !generic_validate( val ) )
            throw new Error( `The value, ${rest[i]}, is not in a parsable USL number format.` );

        rest[i] = val;
    }

    return round( Math.hypot.apply( null, rest ) );
}

export const avg = ( type, round, ...rest ) => create( type, round( getAverage( rest ) ) );

/**
 * @returns {Stats} obj
 */
export function getStats( round, arr ){
    if( !isFunction( round ) )
        throw new Error( `round must be a function not a(n) ${typeof round}.` );

    let type = "best";
    let sum = 0;
    let freq = {};
    let maxOccurs = 0;
    let num = -Infinity;
    let numStr = "";
    let l = arr.length;

    for( let i = 0; i < l; ++i ){
        num = standardizeNumberInput( arr[i] );
        arr[i] = num;
        sum += num;
        numStr = num.toString();

        freq[numStr] = (freq[numStr] || 0) + 1;

        if( freq[numStr] > maxOccurs )
            maxOccurs = freq[numStr];
    }

    let modes = [];
    for( let prop in freq ){
        if( freq.hasOwnProperty( prop ) ){
            if( freq[ prop ] === maxOccurs ){
                modes.push( create( type, round( +prop ) ) );
            }
        }
    }

    let avg = sum / arr.length;
    let sumOfSquaredDiffs = arr.reduce( ( acc, val ) => acc + Math.pow( val - avg, 2 ), 0 );
    let sampleVariance = sumOfSquaredDiffs / l;

    return {
        mean:   create( type, round( avg ) ),
        median: create( type, round( getMedian( arr ) ) ),
        mode:   modes,
        std:    create( type, round( Math.sqrt( sampleVariance ) ) ),
        sVar:   create( type, round( sampleVariance ) )
    };
}