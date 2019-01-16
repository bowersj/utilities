'use strict';

class MaxBinaryHeap{
    constructor(){
        this.values = [];
    }

    insert( val ){
        this.values.push( val );

        this.bubbleUp();
        return true;
    }

    bubbleUp(){
        let idx = this.values.length - 1;
        let child = this.values[ idx ];

        let parentIdx;
        let parent;

        while( idx > 0 ){
            parentIdx = Math.floor( ( idx - 1 ) / 2 );
            parent = this.values[ parentIdx ];

            if( child <= parent ) break;

            // swap child and parent
            this.values[ parentIdx ] = child;
            this.values[ idx ] = parent;

            idx = parentIdx;
        }
    }

    getMax(){
        // swap first and last
        let max = this.values[0];
        let end = this.values.pop();
        if( this.values.length > 0 ){
            this.values[0] = end;
            this.sink();
        }

        return max;
    }

    sink(){
        let len = this.values.length;
        let parentIdx = 0;
        let parent = this.values[ parentIdx ];

        let child1;
        let child2;
        let swap;

        while( true ){
            let child1Idx = 2 * parentIdx + 1;
            let child2Idx = 2 * parentIdx + 2;
            swap = null;

            if( child1Idx < len ){
                child1 = this.values[ child1Idx ];
                if( child1 > parent ){
                    swap = child1Idx;
                }
            }
            if( child2Idx < len ){
                child2 = this.values[ child2Idx ];
                if(
                    ( swap === null && child2 > parent ) ||
                    ( swap !== null && child2 > child1 )
                ){
                    swap = child2Idx;
                }
            }

            if( swap === null ) break;

            this.values[ parentIdx ] = this.values[ swap ];
            this.values[ swap ] = parent;

            parentIdx = swap;
        }
    }
    clear(){
        if( this.values.length === 0 ) return true
        alert( "Are you sure you would like to remove all the values from the heap?" );
        this.values = [];
        return true;
    }
}

let heap = new MaxBinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(55);
heap.insert(12);

console.log( heap.getMax() );
console.log( heap.getMax() );
console.log( heap.getMax() );
console.log( heap.getMax() );
console.log( heap.getMax() );
console.log( heap.getMax() );
console.log( heap.getMax() );
console.log( JSON.stringify( heap, null, 2 ) );
