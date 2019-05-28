class Node{
    constructor(val){
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}


class DoublyLinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val){
        let newNode = new Node(val);
        if(this.length === 0){
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        ++this.length;
        return this;
    }
    pop(){
        if( this.length === 0 )return false;
        let tail = this.tail;

        if( this.length === 1 ){
            this.head = null;
            this.tail = null;
        }

        this.tail = tail.prev;
        this.tail.next = null;

        --this.length;

        // return only the node and no links
        tail.prev = null;
        return tail;
    }

    shift(){
        if( this.length === 0 ) return false;

        let head = this.head;
        if( this.length === 1 ){
            this.head = null;
            this.tail = null;
        } else {
            this.head = head.next;
            this.head.prev = null;

            head.next = null;
        }

        --this.length;
        return head;
    }

    unshift( val ){
        let newNode = new Node( val );

        if( this.length === 0 ){
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        ++this.length;
        return this;
    }

    get( index ){
        if( index < 0 || index >= this.length ) return false;

        let current;
        let count;

        if( index <= this.length/2 ){
            count = 0;
            current = this.head;
            while( count !== index ){
                current = current.next;
                ++count;
            }
        } else {
            count = this.length - 1;
            current = this.tail;
            while( count !== index ){
                current = current.prev;
                --count;
            }
        }

        return current;
    }

    set( index, val ){
        let node = this.get( index );
        if( node !== null ){
            node.val = val;
            return true;
        }
        return false;
    }

    insert( index, val ){
        if( index < 0 || index > this.length ) return false;
        if( index === 0 ) return !!this.unshift( val );
        if( index === this.length ) return !!this.push( val );

        let newNode = new Node( val );
        let node = this.get( index - 1 );
        let next = node.next;

        newNode.prev = node;
        node.next = newNode;

        next.prev = newNode;
        newNode.next = next;

        ++this.length;

        return true;
    }

    remove( index ){
        if( index < 0 || index >= this.length ) return null;

        let node;
        if( index === 0 ){
            node = this.shift();

            node.next = null;
            node.prev = null;

            return node;
        }
        if( index === this.length - 1 ){
            node = this.pop();

            node.next = null;
            node.prev = null;

            return node;
        }

        node = this.get( index );
        let next = node.next;
        let prev = node.prev;

        prev.next = next;
        next.prev = prev;

        node.next = null;
        node.prev = null;
        --this.length;

        return node;
    }

    reverse(){
        let temp = null;
        let current = this.head;

        // reverse head
        while( current !== null ){
            // save to reference latter
            temp = current.prev;
            // reverse the order
            current.prev = current.next;
            current.next = temp;
            // setup for next iteration
            current = current.prev;
        }

        if( temp !== null ){
            this.head = temp.prev;
            // console.log(this.head);
        }

        // currently this code changed the order of head while working on the tail.
        // I do not know why but I need to move on...
        // let temp1 = null;
        // let current1 = this.tail;
        //
        // this.tail = null;
        //
        // while( current1 !== null ){
        //     // save to reference latter
        //     temp1 = current1.prev;
        //     // reverse the order
        //     current1.prev = current1.next;
        //     current1.next = temp1;
        //     // setup for next iteration
        //     current1 = current1.prev;
        // }
        //
        // if( temp1 !== null ){
        //     this.tail = temp1.prev;
        //
        //     this.tail.prev = this.tail.next;
        //     this.tail.next = null;
        // }

        // this.head.next = this.head.prev;
        // this.head.prev = null;
        return this;
    }
}

let list = new DoublyLinkedList();
list.push(5).push(10).push(15).push(20);
list.reverse();

console.log( list );

// checks for reverse
// console.log( list.length );
// console.log( list.head.val );
// console.log( list.head.next.val );
// console.log( list.head.next.next.val );
// console.log( list.head.next.next.next.val );

// console.log( list.reverse() );