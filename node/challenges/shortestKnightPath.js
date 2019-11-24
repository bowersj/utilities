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
    const shift_x = [ 2, 2, -2, -2, 1, 1, -1, -1 ];
    const shift_y = [ -1, 1, 1, -1, 2, -2, 2, -2 ];
    let q = new Queue();
    let initial = convert( start );
    q.enqueue( new Node( initial[0], initial[1], 0 ) );


    const visited = new Set();
    // console.log( q );

    let next_x = -1;
    let next_y = -1;
    let x = -1;
    let y = -1;
    let dist = -1;

    while( q.size > 0 ){
        initial = q.dequeue();

        // console.log( initial );

        x = initial.x;
        y = initial.y;
        dist = initial.dist;

        // console.log( "y", y );
        // console.log( "dest y", dest[1] );

        if( x === dest[0] && y === dest[1] )
            return dist;

        if( !visited.has( id ) ){

            visited.add( id );

            for( let i = 0; i < 8; ++i ){
                next_x = x + shift_x[i];
                if( next_x < 1 || next_x > 8 ) continue;

                next_y = y + shift_y[i];
                if( next_y < 1 || next_y > 8 ) continue;

                q.enqueue( new Node( next_x, next_y, dist + 1 ) )
            }

        }
    }

    return Infinity;
};