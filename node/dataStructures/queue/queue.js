'use strict';

/*
 * queue
 *
 * First in First out (FIFO)
 *
 */

class QueueNode {
    constructor(val){
        this.val = val;
        this.next = null
    }
}

class Queue{
    constructor(){
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    enqueue( val ){
        let newQueueNode = new QueueNode(val);

        if( this.first === null ){
            this.first = newQueueNode;
            this.last = newQueueNode;
        } else {
            this.last.next = newQueueNode;
            this.last = newQueueNode;
        }
        return ++this.size;
    }

    dequeue(){
        if( this.first === null ) return null;

        let temp = this.first;

        if( this.first === this.last ){
            this.last = null;
        }
        this.first = temp.next;

        temp.next = null;

        --this.size;
        return temp;

    }
}

let q = new Queue();
console.log( q.enqueue("hi") );
console.log( q.enqueue("there") );
console.log( q.enqueue("again") );

console.log( q );

console.log( q.dequeue() );
console.log( q.dequeue() );
console.log( q.dequeue() );