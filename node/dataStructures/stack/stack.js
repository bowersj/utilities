'use strict';
/*
 * stack
 *
 * Last in First out (FIFO)
 *
 */

class Node{
    constructor(val){
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}


class Stack {
    constructor(){
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    pop(){
        if( this.size === 0 ) return false;

        let head = this.first;
        if( this.size === 1 ){
            this.first = null;
            this.last = null;
        } else {
            this.first = head.next;
            this.first.prev = null;

            head.next = null;
        }

        --this.size;
        return head.val;
    }

    push( val ){
        let newNode = new Node( val );

        if( this.size === 0 ){
            this.first = newNode;
            this.last = newNode;
        } else {
            this.first.prev = newNode;
            newNode.next = this.first;
            this.first = newNode;
        }

        return ++this.size;
    }
}

let stack = new Stack();
stack.push(5);
stack.push(10);
stack.push(15);
stack.push(20);

console.log( stack );

console.log( stack.pop() );
console.log( stack.pop() );
console.log( stack.pop() );
console.log( stack.pop() );
