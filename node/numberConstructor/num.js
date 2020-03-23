import {
    getMedian, getMode,
    getSampleStandardDeviation, getStandardDeviation, sampleVariance
} from "../utilities/math";
import { create, avg, getStats, usl_min_helper,
    usl_max_helper, usl_hypot_helper,_roundAwayFrom0,
    _roundTowards0, _roundTowardsInf, _roundTowardsNegInf,
    _roundHalfUp, _roundHalfDown, _roundHalfEven,
    _roundHalfCeil, _roundHalfFloor
} from "./helpers";
import {BaseNumber} from "./BaseNumber";

/**
 * @typedef roundingFunction
 * @param {Number}
 */

/**
 * @typedef Stats
 * @property {Number} mean or average
 * @property {Number} median
 * @property {Number} mode
 * @property {Number} std - standard deviation
 * @property {Number} sVar - sample variance
 */

export let USLNumber = {
    create,
    isUSLNumber: ( val ) => val instanceof BaseNumber,
    min:   ( type, ...rest ) => create( type, usl_min_helper( rest ) ),
    max:   ( type, ...rest ) => create( type, usl_max_helper( rest ) ),
    hypot: ( type, round, ...rest ) => create( type, usl_hypot_helper( round, rest ) ),
    avg,
    mean: avg,
    median:  ( type, round, ...rest ) => create( type, round( getMedian( rest ) ) ),
    mode:    ( type, round, ...rest ) => create( type, round( getMode( rest ) ) ),
    std:     ( type, round, ...rest ) => create( type, round( getSampleStandardDeviation( rest ) ) ),
    std_pop: ( type, round, ...rest ) => create( type, round( getStandardDeviation( rest ) ) ),
    sVar:    ( type, round, ...rest ) => create( type, round( sampleVariance( rest ) ) ),
    stats:   ( round, ...rest ) => getStats( round, rest ),
    roundUp:        value => create( "best", _roundAwayFrom0( value ) ),
    roundDown:      value => create( "best", _roundTowards0( value ) ),
    roundCeil:      value => create( "best", _roundTowardsInf( value ) ),
    roundFloor:     value => create( "best", _roundTowardsNegInf( value ) ),
    roundHalfUp:    value => create( "best", _roundHalfUp( value ) ),
    roundHalfDown:  value => create( "best", _roundHalfDown( value ) ),
    roundHalfEven:  value => create( "best", _roundHalfEven( value ) ),
    roundHalfCeil:  value => create( "best", _roundHalfCeil( value ) ),
    roundHalfFloor: value => create( "best", _roundHalfFloor( value ) ),
    ROUND_UP:    BaseNumber.prototype.ROUND_UP,
    ROUND_DOWN:  BaseNumber.prototype.ROUND_DOWN,
    ROUND_CEIL:  BaseNumber.prototype.ROUND_CEIL,
    ROUND_FLOOR: BaseNumber.prototype.ROUND_FLOOR,
    ROUND_HALF_UP:    BaseNumber.prototype.ROUND_HALF_UP,
    ROUND_HALF_DOWN:  BaseNumber.prototype.ROUND_HALF_DOWN,
    ROUND_HALF_EVEN:  BaseNumber.prototype.ROUND_HALF_EVEN,
    ROUND_HALF_CEIL:  BaseNumber.prototype.ROUND_HALF_CEIL,
    ROUND_HALF_FLOOR: BaseNumber.prototype.ROUND_HALF_FLOOR,
};