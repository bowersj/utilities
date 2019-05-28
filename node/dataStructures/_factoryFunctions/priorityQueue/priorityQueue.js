'use strict';

class Node {
    constructor( val, priority ){
        this.val = val;
        this.priority = priority;
    }
}

class PriorityQueue{
    constructor(){
        this.values = [];
    }

    enqueue( val, priority ){
        let newNode = new Node( val, priority );
        this.values.push( newNode );

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

            // this is what makes it a priority queue
            if( child.priority <= parent.priority ) break;

            // swap child and parent
            this.values[ parentIdx ] = child;
            this.values[ idx ] = parent;

            idx = parentIdx;
        }
    }

    dequeue(){
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

        let leftChild;
        let rightChild;
        let swap;

        while( true ){
            let leftChildIdx = 2 * parentIdx + 1;
            let rightChildIdx = 2 * parentIdx + 2;
            swap = null;

            if( leftChildIdx < len ){
                leftChild = this.values[ leftChildIdx ];
                if( leftChild.priority > parent.priority ){
                    swap = leftChildIdx;
                }
            }
            if( rightChildIdx < len ){
                rightChild = this.values[ rightChildIdx ];
                if(
                    ( swap === null && rightChild.priority > parent.priority ) ||
                    ( swap !== null && rightChild.priority > leftChild.priority )
                ){
                    swap = rightChildIdx;
                }
            }

            if( swap === null ) break;

            this.values[ parentIdx ] = this.values[ swap ];
            this.values[ swap ] = parent;

            parentIdx = swap;
        }
    }
}

let ER = new PriorityQueue();
ER.enqueue("common cold",5);
ER.enqueue("gunshot wound", 1);
ER.enqueue("high fever",4);
ER.enqueue("broken arm",2);
ER.enqueue("glass in foot",3);

console.log( JSON.stringify( ER, null, 2 ) );