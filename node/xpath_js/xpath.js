function XPathNode( data, index ){
    this.data = data;
    this.index = index;
}
const isDigit = /^\d+$/g;

function getTokenId( val ){
    switch( val ){
        case "":
            return 0;
        case "/":
            return 10;
        case "=":
            return 20;
        case ".":
            return 30;
        case "..":
            return 40;
        case "[":
            return 50;
        case "]":
            return 50;
        default:
            if( val.charAt( 0 ) === ("'" || '"') || isDigit.test( val ) )
                return 60;

            return 70;
    }
}

function TokenNode( val, query = false, props = [] ){
    this.type = getTokenId( val );
    this.token = val;
    this.query = query;

    for( let i = 0; i < props.length; ++i )
        this[ props[i][0] ] = props[i][1];
}

function _tokenize( expression ){
    const initial = expression.split( /([\/\[\]=])/g );
    let queryStartIdx = -1;
    let isQuery = false;
    let stack = [];
    let val = "";

    /*
     * TODO's:
     *      add 1 level wild card
     *      add any descendant wild card
     *      add tracking, the start and end, for expressions
     *          - operators: =, !=. and, or, xor
     */

    for( let i = 0, l = initial.length; i < l; ++i ){
        val = initial[i].trim();
        switch( val ) {
            case "[":
                queryStartIdx = i;
                isQuery = true;
                stack.push( new TokenNode( val, isQuery, [ [ "queryStart", i ], [ "queryEnd", -1 ] ] ) );
                break;
            case "]":
                stack[ queryStartIdx ].queryEnd = i;
                stack.push( new TokenNode( val, isQuery, [ [ "queryStart", queryStartIdx ], [ "queryEnd", i ] ] ) );
                isQuery = false;
                break;
            default:
                stack.push( new TokenNode( val, isQuery ) );
        }

        // console.log( stack );
    }

    return stack;
}

function _shouldSave(index, steps ){
    return index >= steps.length - 1
}

function parseXPath( source, expression, isArray = Array.isArray ){
    console.time( "parse xpath" );
    let result = [];
    let steps = expression.split( "/" );
    // ignore the "" in the first index
    let idx = 1;
    let step = steps[ idx ];

    if( !step )
        return source;

    if( steps[ steps.length - 1 ] === "" )
        steps.pop();

    let nextVal = source[ step ];

    if( !nextVal )
        throw new ReferenceError( `The first step, "${step}", does not exist in the source` );

    let stack = [ new XPathNode( nextVal, idx ) ];
    let current = new XPathNode( {}, -1 );
    let saveResult = _shouldSave( idx, steps );
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
                stack.push( new XPathNode( nextVal[ steps[ idx ] ], idx ) );
                saveResult = _shouldSave( idx, steps );
                continue;
            }

            for( let i = 0, l = nextVal.length; i < l; ++i ){
                stack.push( new XPathNode( nextVal[i], idx ) );
            }

        } else {
            ++idx;

            for( let prop in nextVal ){
                if( prop === steps[ idx ] ){
                    stack.push( new XPathNode( nextVal[ prop ], idx ) );
                    break;
                }
            }

            saveResult = _shouldSave( idx, steps );
        }
    }
    result = result.reverse();
//     if( idx !== steps.length - 1 )
//         throw new ReferenceError( `There was a mismatch` );
    console.timeEnd( "parse xpath" );
    return result;
}
