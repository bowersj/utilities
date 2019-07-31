"use strict";

function MySet(){
    this.values = [];
    this.isUnique = {};
    this.length = 0;
}

MySet.prototype.push = function( values ){

    if( Array.isArray( values ) )
        _pushMany( this, values );
    else
        _pushOne( this, values );

    return this;
}

MySet.prototype.toArray = function( returnCopy = false ){
    if( returnCopy )
        return deepCopy( this.values );
    else
        return this.values;
}

MySet.prototype.forEach = function( func ){
    this.values.forEach( func );
};

MySet.prototype.delete = function( values ){
    if( Array.isArray( values ) )
        _deleteMany( this, values );
    else
        _deleteOne( this, values );

    return this;
};

MySet.prototype.exists = function( value ){
    return isPosInt( this.isUnique[ value ] )
};

MySet.prototype.reset = function( returnOld = false ){
    let oldSet = deepCopy( this );

    this.values = [];
    this.isUnique = {};
    this.length = 0;

    if( returnOld )
        return oldSet

    return this;
}

function _deleteOne( context, value ){
    if( context.exists( value ) ){
        context.values.splice( context.isUnique[ value ], 1 )
        delete context.isUnique[ value ];
        --context.length;
    }
}

function _deleteMany( context, values ){
    for( let i = 0; i < values.length; ++i )
        _deleteOne( context, values[i] );
}

function _pushOne( context, value ){
    if( !context.exists( value ) ){
        context.isUnique[ value ] = context.values.length;
        context.values.push( value );
        ++context.length;
    }
}


function _pushMany( context, values ){
    for( let i = 0; i < values.length; ++i )
        _pushOne( context, values[i] );
}

function deepCopy( value ){
    return JSON.parse( JSON.stringify( value ) )
}

function isPosInt( int ){
    return Number.isInteger( int ) && int > -1;
}

// basic functionality tests
// let set = new MySet();
//
// set.push( "hi" );
// set.push( [ "there", "again" ] );
//
// set.forEach( item => console.log(item) );
//
// console.log( set.toArray( false ) );
// console.log( set.toArray( true ) );
//
// set.delete( "again" );
// set.delete( [ "there", "hi" ] );
//
// console.log( "set after delete", set )
//
// set.push( "hi 2" );
// set.push( [ "there 2", "again 2" ] );
//
// console.log( "Before reset", set );
//
// let oldSet = set.reset( true );
//
// console.log( "old set", oldSet );
//
// set.push( "hi 3" );
// set.push( [ "there 3", "again 3" ] );
//
// console.log( "Before reset", set );
//
// let newSet = set.reset( false );
//
// console.log( "new set", newSet );