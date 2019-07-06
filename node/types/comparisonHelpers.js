// 'use strict';

// checking if "newer" types and features exist in the current environment

const promiseExists = typeof Promise === 'function';

const symbolExists =             typeof Symbol !== 'undefined';
const mapExists =                typeof Map !== 'undefined';
const setExists =                typeof Set !== 'undefined';
const weakMapExists =            typeof WeakMap !== 'undefined';
const weakSetExists =            typeof WeakSet !== 'undefined';
const dataViewExists =           typeof DataView !== 'undefined';

const symbolIteratorExists =     symbolExists && typeof Symbol.iterator !== 'undefined';
const symbolToStringTagExists =  symbolExists && typeof Symbol.toStringTag !== 'undefined';
const setEntriesExists =         setExists && typeof Set.prototype.entries === 'function';
const mapEntriesExists =         mapExists && typeof Map.prototype.entries === 'function';
const setIteratorPrototype =     setEntriesExists && Object.getPrototypeOf(new Set().entries());
const mapIteratorPrototype =     mapEntriesExists && Object.getPrototypeOf(new Map().entries());
const arrayIteratorExists =      symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
const arrayIteratorPrototype =   arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
const stringIteratorExists =     symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
const stringIteratorPrototype =  stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
const toStringLeftSliceLength =  8;
const toStringRightSliceLength = -1;


const intFor = {
    "undefined":      1,
    "Undefined":      1,

    "null":           2,
    "Null":           2,

    "boolean":        3,
    "Boolean":        3,

    "number":         4,
    "Number":         4,

    "bigint":         5,
    "Bigint":         5,

    "string":         6,
    "String":         6,

    "symbol":         7,
    "Symbol":         7,

    "function":       8,
    "Function":       8,

    "object":         9,
    "Object":         9,

    "array":          10,
    "Array":          10,

    "regexp":         11,
    "regExp":         11,
    "Regexp":         11,
    "RegExp":         11,

    "date":           12,
    "Date":           12,

    "promise":        13,
    "Promise":        13,

    "set":            14,
    "Set":            14,

    "map":            15,
    "Map":            15,

    "weakset":        16,
    "weakSet":        16,
    "WeakSet":        16,

    "weakMap":        17,
    "weakmap":        17,
    "WeakMap":        17,

    "dataview":       18,
    "dataView":       18,
    "DataView":       18,

    "mapiterator":    19,
    "mapIterator":    19,
    "MapIterator":    19,

    "setiterator":    20,
    "setIterator":    20,
    "SetIterator":    20,

    "arrayiterator":  21,
    "arrayIterator":  21,
    "ArrayIterator":  21,

    "stringiterator": 22,
    "stringIterator": 22,
    "StringIterator": 22,

};

const _isType = (value, type ) => intFor[ typeof value ] === intFor[ type ];


function _typeofWrapper( value ){

    const type = intFor[ typeof value ];

    if( value === null )
        return intFor[ "null" ];

    if( type !== intFor[ "object" ] )
        return type ? type : -1;

    if(
        Array.isArray( value ) &&
        ( symbolToStringTagExists === false || Symbol.toStringTag in value )
    )
        return intFor[ "array" ];

    const stringTag = (symbolToStringTagExists && value[Symbol.toStringTag]);
    if ( _isType( stringTag, "string" ) )
        return stringTag;


    const objPrototype = Object.getPrototypeOf( value );

    if( objPrototype === RegExp.prototype )
        return intFor[ "regexp" ];

    if( objPrototype === Date.prototype )
        return intFor[ "date" ];

    if( promiseExists && objPrototype === Promise.prototype )
        return intFor[ "promise" ];

    if( setExists && objPrototype === Set.prototype )
        return intFor[ "set" ];

    if( mapExists && objPrototype === Map.prototype )
        return intFor[ "map" ];

    if( weakSetExists && objPrototype === WeakSet.prototype )
        return intFor[ "weakSet" ];

    if( weakMapExists && objPrototype === Map.prototype )
        return intFor[ "weakMap" ];

    if( dataViewExists && objPrototype === DataView.prototype )
        return intFor[ "dataView" ];

    if( mapExists && objPrototype === mapIteratorPrototype)
        return intFor[ "mapIterator" ];

    if( setExists && objPrototype === setIteratorPrototype)
        return intFor[ "setIterator" ];

    if( arrayIteratorExists && objPrototype === arrayIteratorPrototype)
        return intFor[ "arrayIterator" ];

    if( stringIteratorExists && objPrototype === stringIteratorPrototype )
        return intFor[ "stringIterator" ];

    if( objPrototype === null )
        return intFor[ "object" ];

    const typeStr = Object.prototype.toString.call( value ).slice( toStringLeftSliceLength, toStringRightSliceLength );

    return typeStr ? intFor[ typeStr ] ? intFor[ typeStr ] : -1 : -1
}


function _singleComparator( value, type ){
    let valueType = _typeofWrapper( value );
    let comparisonType =  intFor[ type ];

    // console.log(valueType);
    // console.log(comparisonType);

    if( valueType === -1 || comparisonType === -1 )
        return false;

    return valueType === comparisonType;
}


function _multipleComparator( value, type ){
    let valueType = _typeofWrapper( value );

    if( valueType === -1 )
        return false;

    let comparisonType = -1;

    for( let i = 0; i < type.length; ++i ){
        comparisonType = _typeofWrapper( type[i] );

        if( comparisonType !== intFor[ "string" ] )
            throw new TypeError( `the item at ${i} in type must be a string it was ${typeof type[i]}.` );

        if( valueType === -1 )
            return false;

        if( valueType !== comparisonType )
            break;
    }

    return valueType === comparisonType
}


function comparator( value, type ){

    if( _typeofWrapper( type ) !== intFor[ "string" ] && !Array.isArray( type ) )
        throw new TypeError( `type must be a string or an array of strings. It is currently ${ type }` );

    // if( Array.isArray( type ) )
    //     return _multipleComparator( value, type );
    // else
        return _singleComparator( value, type )
}



module.exports.comparator = comparator;