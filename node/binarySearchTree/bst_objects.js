'use strict';


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

        if( !this.first ){
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

        // temp.next = null;

        --this.size;
        return temp;

    }

    toArray(){
        if( this.first === null ) return [];

        let current = this.first;
        let arr = [];
        while( current !== null ){
            arr.push(current.val);
            current = current.next;
        }

        return arr;
    }
}


class Node {
    constructor( value ){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

module.exports = class BST{
    constructor(){
        this.root = null;
    }

    /*
     * insert
     *
     * Purpose
     * Add a value to the binary search tree
     *
     * Result
     * Tree
     *
     * Examples
     * let bst = new BST(); // initialize the binary search tree
     * bst.insert(3)    // => the updated binary search tree
     * bst.insert(1)    // => the updated binary search tree
     * bst.insert(4)    // => the updated binary search tree
     * bst.insert(2)    // => the updated binary search tree
     *
     */
    insert( value ){
        let newNode = new Node( value );

        if( this.root === null ){
            this.root = newNode;
            return this;
        }

        let current = this.root;

        while( true ){
            if( value === current.value ) return undefined;
            if( value < current.value ){
                if( current.left === null ){
                    current.left = newNode;
                    return this;
                }
                current = current.left
            } else {
                if( current.right === null ){
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    /*
     * find
     *
     * Purpose
     * To identify the node where the value you are
     * looking for is located.
     *
     * Result
     * integer
     *
     * Examples
     * let bst = new BST(); // initialize the binary search tree
     * bst.insert(3)    // adding 3 to bst
     * bst.insert(1)    // adding 1 to bst
     * bst.insert(4)    // adding 4 to bst
     * bst.insert(2)    // adding 2 to bst
     *
     * bst.find(3)      // => node { value: 3, left: {}, right: {} }
     *                  // left and right will contain the remaining
     *                  // left or right tree represented here by {}
     * bst.find(5)      // => undefined
     *
     */
    find( value ){
        if(this.root === null) return false;

        let current = this.root;
        let found = false;

        while(current && !found){
            if(value < current.value){
                current = current.left;
            } else if(value > current.value){
                current = current.right;
            } else {
                found = true;
            }
        }
        if(!found) return undefined;
        return current;
    }

    /*
     * contains
     *
     * Purpose
     * specifies if the value being searched for is in the tree
     * exists or not.
     *
     * Result
     * Boolean
     *
     * Best use case is just to see if it exists in the tree.
     * Bad use case is to see if it exists and then search for it.
     *
     * The reason why this functions is not meant to see if a value
     * exists and then call .find is that this approach is doubling
     * the work because .find repeats the process. Instead just call
     * .find and account for the possible -1 result.
     *
     * Examples
     * let bst = new BST(); // initialize the binary search tree
     * bst.insert(3)    // adding 3 to bst
     * bst.insert(1)    // adding 1 to bst
     * bst.insert(4)    // adding 4 to bst
     * bst.insert(2)    // adding 2 to bst
     *
     * bst.contains( 3 ) // => true
     * bst.contains( 5 ) // => false
     *
     */
    contains( value ){
        if(this.root === null) return false;

        let current = this.root;
        let found = false;

        while(current && !found){
            if(value < current.value){
                current = current.left;
            } else if(value > current.value){
                current = current.right;
            } else {
                found = true;
            }
        }
        return !found;
    }

    /*
     * traverseBreadth
     *
     * Purpose
     * Walk the tree across all nodes at that level before
     * going the the next level.
     *
     * Result
     * arr of all values in tree
     *
     * Example
     * let bst = new BST(); // initialize the binary search tree
     * bst.insert(3)    // adding 3 to bst
     * bst.insert(1)    // adding 1 to bst
     * bst.insert(4)    // adding 4 to bst
     * bst.insert(2)    // adding 2 to bst
     *
     * bst.traverseBreadth() // [ 3, 1, 4, 2 ]
     *
     */
    traverseBreadth(){
        let queue = new Queue();
        let arr = [];
        let current = this.root;

        queue.enqueue( current );

        while( queue.size > 0 ){

            current = queue.dequeue().val;
            arr.push( current.value );

            if( current.left !== null ) queue.enqueue( current.left );
            if( current.right !== null ) queue.enqueue( current.right );
        }

        return arr;
    }

    /*
     * traverseDepthPreOrder
     *
     * Purpose
     * walk the tree by going deep until reached the second to last layer
     * and then goes left to right within each layer and works it way
     * back up until reaching the root.
     *
     * Result
     * arr of all values in tree
     *
     * Example
     * let bst = new BST(); // initialize the binary search tree
     * bst.insert(5);    // adding 5 to bst
     * bst.insert(3);    // adding 3 to bst
     * bst.insert(2);    // adding 2 to bst
     * bst.insert(4);    // adding 4 to bst
     * bst.insert(7);    // adding 7 to bst
     * bst.insert(6);    // adding 6 to bst
     * bst.insert(8);    // adding 8 to bst
     *
     * bst.traverseDepthPreOrder()  // => [ 5, 3, 2, 4, 7, 6, 8 ]
     *
     */
    traverseDepthPreOrder(){
        let arr = [];

        function traverse( node ){
            arr.push( node.value );

            if( node.left !== null ) traverse( node.left );
            if( node.right !== null ) traverse( node.right );
        }

        traverse( this.root );
        return arr;
    }

    /*
     * traverseDepthPostOrder
     *
     * Purpose
     * walk the tree by going deep until reached the last layer and
     * then works its way back up, left to right within each layer,
     * until it reaches the root node.
     *
     * Result
     * arr of all values in tree
     *
     * Example
     * let bst = new BST(); // initialize the binary search tree
     * bst.insert(5);    // adding 5 to bst
     * bst.insert(3);    // adding 3 to bst
     * bst.insert(2);    // adding 2 to bst
     * bst.insert(4);    // adding 4 to bst
     * bst.insert(7);    // adding 7 to bst
     * bst.insert(6);    // adding 6 to bst
     * bst.insert(8);    // adding 8 to bst
     *
     * bst.traverseDepthPostOrder();  // => [ 2, 4, 3, 6, 8, 7, 5 ]
     *
     */
    traverseDepthPostOrder(){
        let arr = [];

        function traverse( node ){
            if( node.left !== null ) traverse( node.left );
            if( node.right !== null ) traverse( node.right );

            arr.push( node.value );
        }

        traverse( this.root );
        return arr;
    }

    /*
     * traverseDepthInOrder
     *
     * Purpose
     * Return the nodes in sorted order, based on th sorting of
     * the binary search tree.
     *
     * Result
     * arr of all values in tree
     *
     * Example
     * let bst = new BST(); // initialize the binary search tree
     * bst.insert(5);    // adding 5 to bst
     * bst.insert(3);    // adding 3 to bst
     * bst.insert(2);    // adding 2 to bst
     * bst.insert(4);    // adding 4 to bst
     * bst.insert(7);    // adding 7 to bst
     * bst.insert(6);    // adding 6 to bst
     * bst.insert(8);    // adding 8 to bst
     *
     * bst.traverseDepthInOrder();  // => [ 2, 3, 4, 5, 6, 7, 8 ]
     *
     */
    traverseDepthInOrder(){
        let arr = [];

        function traverse( node ){
            if( node.left !== null ) traverse( node.left );
            arr.push( node.value );
            if( node.right !== null ) traverse( node.right );
        }

        traverse( this.root );
        return arr;
    }

   /*
    * validate
    *
    * Purpose
    * To make sure the binary search tree is properly
    * structured
    *
    * NOTE:
    * This has not been tested or verified that it
    * works...
    * TODO: verify that this works...
    *
    * Examples
    * let bst = new BST(); // initialize the binary search tree
    * bst.insert(5);    // adding 5 to bst
    * bst.insert(3);    // adding 3 to bst
    * bst.insert(2);    // adding 2 to bst
    * bst.insert(4);    // adding 4 to bst
    * bst.insert(7);    // adding 7 to bst
    * bst.insert(6);    // adding 6 to bst
    * bst.insert(8);    // adding 8 to bst
    *
    * bst.validate();  // => true
    */
    validate(){
        if( this.root === null ) return true;
        if( this.root.left === null && this.root.right === null ) return true;

        let current = this.root;
        let valid = true;

        while(current && valid){
            if(
                !current.left ||
                !current.right ||
                !current.left.value ||
                !current.right.value
            )
                break;
            if(current.value > current.left.value){
                current = current.left;
            } else if(current.value  < current.right.value){
                current = current.right;
            } else {
                valid = false;
            }
        }
        return valid;
    }

   /*
    * balance
    *
    * Purpose
    * To make sure that the binary search tree is optimally
    * structured for queries. It works on the following
    * principals.
    *   - the deepest a bst should be is LOG_2 of the number
    *   of items in the bst always rounded up.
    * It currently uses recursion which while valid, is not
    * always optimal anc can lead to a stack overflow error.
    * Therefore a future enhancement could be to change this
    * to an imperative method using a queue to track what
    * needs to be done.
    *
    * TODO: change from a recursive approach to an iterative
    * TODO(continued): one.
    *
    * Example
    * let bst = new BST(); // initialize the binary search tree
    * bst.insert(5); // adding 5 to bst
    * bst.insert(3); // adding 3 to bst
    * bst.insert(2); // adding 2 to bst
    * bst.insert(4); // adding 4 to bst
    * bst.insert(7); // adding 7 to bst
    * bst.insert(6); // adding 6 to bst
    * bst.insert(8); // adding 8 to bst
    *
    * bst.balance(); // => true
    *
    */
    balance(){

        function buildTree( arr ){
            if( arr.length === 1 ) return new Node( arr[0] );

            if( arr.length === 2 ){
                let newNode = new Node( arr[1] );
                newNode.left = arr[0];
                return newNode;
            }

            if( arr.length === 3 ){
                let newNode = new Node( arr[1] );
                newNode.left = arr[0];
                newNode.right = arr[2];
                return newNode;
            }

            let medianIndex = Math.ceil( arr.length / 2 ) - 1;

            let newNode = new Node( arr[medianIndex] );
            newNode.left = buildTree( arr.slice(0, medianIndex) );
            newNode.right = buildTree( arr.slice( medianIndex + 1 ) );
            return newNode;
        }
        if( this.root === null ) return true;
        if( this.root.left === null && this.root.right === null ) return true;

        let sorted = this.traverseDepthInOrder();

        this.root = buildTree( sorted );
        return this.validate();
    }
};
