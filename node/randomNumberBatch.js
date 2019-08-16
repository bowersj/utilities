module.exports.batch = getRBatch_noParseInt;


let Benchmark = require( "benchmark" );


function getRBatch_noParseInt( batchSize = 15 ){
    let digits = [];

    let num = Math.floor( Math.random() * Math.pow( 10, 14 ) );

    let digit = -1;

    while( num > 0 ){
        digit = num % 10;
        digits.push( digit );
        num = ( num - digit ) / 10;

        if( digits.length === batchSize ){
            break;
        }

        if( num < 1 ){
            num = Math.floor( Math.random() * Math.pow( 10, 14 ) );
        }
    }

    return digits;
}

// function getRBatch_noParseInt( minBatchSize = 15 ){
//     let digits = [];
//     while( true ){
//         [].push.apply( digits, _getRBatch_noParseInt() );
//
//         if( digits.length > minBatchSize + 1 )
//             break;
//     }
//
//     return digits;
// }

// console.log( getRBatch_noParseInt( ).length );

let batch = [];
let pass = [];
let badBatches = [];
let batchSize = 20;
for( let i = 0; i < 10000; ++i ){
    batch = getRBatch_noParseInt( batchSize );
    pass.push( batch.length === batchSize );

    if( batch.length < batchSize )
        badBatches.push( batch.length );
    else if( batch.length > batchSize )
        badBatches.push( batch.length );
}

// console.log( `${batchSize} digits created reliably ${pass.reduce( ( boo, acc ) => boo && acc, true )}` );
// console.log( badBatches );


function _getRBatch_parseInt(){
    let digits = [];

    let num = Math.floor( Math.random() * Math.pow( 10, 14 ) );

    let digit = -1;

    while( num > 0 ){
        // digit = num % 10;
        digits.push( num % 10 );
        // num = ( num - digit ) / 10;
        num = parseInt( num / 10 );
    }

    return digits;
}


function getRBatch_parseInt( minBatchSize = 15 ){
    let digits = [];
    while( true ){
        [].push.apply( digits, _getRBatch_parseInt() );

        if( digits.length > minBatchSize + 1 )
            break;
    }

    return digits;
}


// console.log( getRBatch_noParseInt() );
// console.log( getRBatch_parseInt() );


let suite = new Benchmark.Suite;

function buildRes( context ){
    let acc = [];
    context.map(
        ( obj ) => {
            if( !obj.name.includes( "WARM UP" ) )
                acc.push( `${obj.name}: Opts per Sec. ${ Math.floor(obj.hz).toLocaleString( "en-US" ) }` );
        }
    );
    return acc.join( "\n" );
}

suite
    .add( "===== WARM UP FOR getRBatch_noParseInt =====", function(){
        getRBatch_noParseInt(30)
    } )
    .add( "===== WARM UP FOR getRBatch_parseInt =====", function(){
        getRBatch_parseInt(30)
    } )
    .add( "===== getRBatch_noParseInt =====", function(){
        getRBatch_noParseInt(30)
    } )
    .add( "===== getRBatch_parseInt =====", function(){
        getRBatch_parseInt(30)
    } )
    .on( "complete", function(){
        // console.log( this );
        console.log( "Summary \n" +
            buildRes( this )
        )
    } )
    .run();
