module.exports = {
    parse
};

function Node( data, index ){
    this.data = data;
    this.index = index;
}

function parse( source, expression, isArray = Array.isArray ){
    let result = [];
    let steps = expression.split( "/" );
    // ignore the "" in the first index
    let idx = 1;
    let step = steps[ idx ];

    if( !step )
        return source;

    let nextVal = source[ step ];

    if( !nextVal )
        throw new ReferenceError( `The first step, "${step}", does not exist in the source` );

    let stack = [ new Node( source[ step ], idx ) ];
    let current = new Node( {}, -1 );
    let saveResult = false;
    let regex = /\d+/;

    while( stack.length > 0 ){
        current = stack.pop();
        nextVal = current.data;
        idx = current.index;

        if( saveResult ){

            result.push( nextVal );
            saveResult = false;

        } else if( isArray( nextVal ) ){

            if( regex.test( steps[ idx + 1 ] ) ){
                ++idx;
                stack.push( new Node( nextVal[ steps[ idx ] ], idx ) );
                continue;
            }

            for( let i = 0, l = nextVal.length; i < l; ++i ){
                stack.push( new Node( nextVal[i], idx ) );
            }

        } else {
            ++idx;

            for( let prop in nextVal ){
                if( prop === steps[ idx ] ){
                    stack.push( new Node( nextVal[ prop ], idx ) );
                    break;
                }
            }

            saveResult = idx === steps.length - 1;
//             saveResult = steps[ idx ] === steps[ steps.length - 1 ];
        }
    }

//     if( idx !== steps.length - 1 )
//         throw new ReferenceError( `There was a mismatch` );

    return result;
}
