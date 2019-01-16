'use strict';

class Node {
    constructor(val){
        this.val = val;
        this.next = null
    }
}

// test
// let first = new Node( "Hi" );
// first.next = new Node( "Again" );
//
// console.log(JSON.stringify( first ));

class SinglyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push( val ){
        let newNode = new Node( val );
        if( this.head === null ){
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode
        }

        ++this.length;
        return this;
    }

    pop(){
        if( this.head === null ) return undefined;

        let length = this.length;
        let lastNode = this.head;

        while( length > 2 ){
            lastNode = lastNode.next;
            --length;
        }

        let next = lastNode.next;
        lastNode.next = null;
        this.tail = lastNode;
        --this.length;
        // console.log( JSON.stringify( lastNode ) );
        return next;
    }

    shift(){
        if( this.length === 0 ) return undefined;

        let oldHead = this.head;
        this.head = oldHead.next;

        --this.length;
        if(this.length === 0) this.tail = null;

        oldHead.next = null;
        return oldHead;
    }

    unshift( val ){
        let newNode = new Node(val);

        if( this.head === null ){
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        ++this.length;
        return this;
    }

    get( index ){
        if( index < 0 || index >= this.length ) return null;

        let counter = 0;
        let current = this.head;

        while( index !== counter ){
            current = current.next;
            ++counter;
        }
        return current;
    }

    set( index, val ){
        let node = this.get( index );
        if( node ){
            node.val = val;
            return true;
        }
        return false;
    }

    insert( index, val ){
        if( index < 0 || index > this.length ) return false;

        if( index === this.length ) return !!this.push( val );
        else if( index === 0 ) return !!this.unshift( val );
        else {
            let newNode = new Node( val );
            let previous = this.get( index - 1 );

            newNode.next = previous.next;
            previous.next = newNode;
            ++this.length;
            return true;
        }
    }

    remove( index ){
        if( index < 0 || index >= this.length ) return false;

        if( index === this.length - 1 ) return this.pop().val;
        else if( index === 0 ) return this.shift().val;
        else{
            let previous = this.get( index - 1 );
            let removed = previous.next;
            previous.next = removed.next;

            --this.length;
            return previous.val;
        }
    }

    // TODO: study logic!!!!!
    reverse(){
        if( this.length === 0 ) return this.head;

        let node = this.head;

        this.head = this.tail;
        this.tail = node;

        let next;
        let previous = null;

        for( let i = 0; i < this.length; ++i ){
            next = node.next;
            node.next = previous;

            previous = node;
            node = next;
        }
        return this;
    }
}

let list = new SinglyLinkedList();
list.push("hi");
list.push("there");
list.push("again");
// list.push("and again");

// console.log( list.pop() );
// console.log( JSON.stringify( list ) );

// console.log( list.shift() );
// console.log( JSON.stringify( list ) );

// console.log( list.unshift( "Bye" ) );
// console.log( JSON.stringify( list ) );

// console.log( list.get(0) );
// console.log( list.get(1) );
// console.log( list.get(2) );

// console.log( list.set( 2, "Not another value..." ) );
// console.log( JSON.stringify( list ) );

// console.log( list.insert( 0, 1 ) );
// console.log( list.insert( 4, 2 ) );
// console.log( list.insert( 2, 3 ) );
// console.log( JSON.stringify( list, null, 2 ) );

// console.log( list.remove( 0) );
// console.log( JSON.stringify( list ) );

console.log( JSON.stringify( list.reverse() ) );