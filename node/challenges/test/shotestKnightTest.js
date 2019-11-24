const knight = require( "./../shortestKnightPath.js" );

let arr = [['a1', 'c1', 2], ['a1', 'f1', 3], ['a1', 'f3', 3], ['a1', 'f4', 4], ['a1', 'f7', 5]];

console.log( knight( arr[0][0], arr[0][1] ) );
console.log( knight( arr[1][0], arr[1][1] ) );
console.log( knight( arr[2][0], arr[2][1] ) );
console.log( knight( arr[3][0], arr[3][1] ) );
console.log( knight( arr[4][0], arr[4][1] ) );

// for (let i of arr) Test.assertEquals(knight(i[0], i[1]), i[2]);

let id = 0;

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
        return temp.val;

    }
}

function convert( pos ){
    let [ x, y ] = pos.split( "" );
    return [ x.toLowerCase().charCodeAt(0) - 96, parseInt( y ) ];
}

function Node( x, y, dist ){
    this.id = id;
    this.x = x;
    this.y = y;
    this.dist = dist;

    ++id;
}

module.exports = function knight( start, finish ) {
    const dest = convert( finish );
    const shift = [
        [ 2, -1 ], [ 2, 1 ],  [ -2, 1 ], [ -2, -1 ],
        [ 1, 2 ],  [ 1, -2 ], [ 1, -2 ], [ -1, -2 ]
    ];
    let queue = new Queue();
    let initial = convert( start );
    queue.enqueue( new Node( initial[0], initial[1], 0 ) );


    const visitedNodes = new Set();
    // console.log( q );

    let next_x = -1;
    let next_y = -1;
    let x = -1;
    let y = -1;
    let dist = -1;
    let id = "";

    while( queue.size > 0 ){
        initial = queue.dequeue();
        x = initial.x;
        y = initial.y;
        dist = initial.dist;
        id = initial.id;

        if( x === dest[0] && y === dest[1] )
            return dist;

        if( !visitedNodes.has( id ) ){

            visitedNodes.add( id );

            for( let i = 0; i < 8; ++i ){
                next_x = x + shift[i][0];
                if( next_x < 1 || next_x > 8 ) continue;

                next_y = y + shift[i][1];
                if( next_y < 1 || next_y > 8 ) continue;

                queue.enqueue( new Node( next_x, next_y, dist + 1 ) )
            }

        }
    }

    return Infinity;
};