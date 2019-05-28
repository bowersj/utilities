'use strict';

const binaryHeap = (function(){
    let value = [];


    function insert( val ){
        value.push( val );

        _bubbleUp();
        return true;
    }


    /*
     * bubbleUp
     *
     * This is to move the value into its proper place in the binary heap.
     *
     */
    function _bubbleUp(){
        let indx = value.length - 1;
        let child = value[ indx ];

        console.log( `index: ${indx}` );
        console.log( `child: ${child}` );

        let parentIndx;
        let parent;

        while( indx > 0 ){
            parentIndx = Math.floor( ( indx - 1 ) / 2 );
            parent = value[ parentIndx ];

            console.log( `parent index: ${parentIndx}` );
            console.log( `parent: ${parent}` );

            if( child <= parent ) break;

            value[ parentIndx ] = child;
            value[ indx ] = parent;

            indx = parentIndx;

            console.log( value );
        }
    }


    function log(){
        console.log( value );
    }


    return {
        insert: insert,
        log: log
    };

}());

binaryHeap.insert( 41 );
binaryHeap.insert( 27 );
binaryHeap.insert( 55 );
binaryHeap.log();