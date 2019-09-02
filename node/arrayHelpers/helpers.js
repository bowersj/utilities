/**
 * Common array helper functions that perform well.
 *
 * Currently the intersection_fast is not really that fast and needs a significant overhaul
 */

module.exports.intersect_slow = intersection_naive;
module.exports.intersection_recursive = intersection_recursive;
module.exports.intersection_hash_nonUnique = intersection_hash_nonUnique;
module.exports.intersection_hash_unique = intersection_hash;


function intersection_hash( ...arrays ){
    const ordered =
        arrays.length === 1 ?
            arrays :
            arrays.sort( ( arr1, arr2 ) => arr1.length - arr2.length );
    const shortest = ordered[0];
    const result = [];
    let valueInSmallest = {};
    let last = ordered[ ordered.length - 1 ];
    let orderedLen = ordered.length - 1;
    let shortestLen = shortest.length;
    let orderedChildLen = -1;

    for( let i = 0; i < shortestLen; ++i ){
        valueInSmallest[ shortest[i] ] = 1;
    }

    for( let j = 1; j < orderedLen; ++j ){

        orderedChildLen = ordered[j].length;

        for( let k = 0; k < orderedChildLen; ++k ){
            if( valueInSmallest[ ordered[j][k] ] )
            // if( (ordered[j][k] in valueInSmallest) )
                ++valueInSmallest[ ordered[j][k] ];
        }
    }

    for( let m = 0; m < last.length; ++m ){
        if( valueInSmallest[ last[m] ] ){
        // if( last[m] in valueInSmallest ){
            ++valueInSmallest[ last[m] ];

            if( valueInSmallest[ last[m] ] === arrays.length )
                result.push( last[m] );
        }
    }

    return result;
}


function intersection_hash_nonUnique( ...arrays ){
    const ordered =
        arrays.length === 1 ?
            arrays :
            arrays.sort( ( arr1, arr2 ) => arr1.length - arr2.length );
    const shortest = ordered[0];
    const result = [];
    let valueInSmallest = {};
    let repeated = {};
    let last = ordered[ ordered.length - 1 ];
    let orderedLen = ordered.length - 1;
    let shortestLen = shortest.length;
    let orderedChildLen = -1;

    for( let i = 0; i < shortestLen; ++i ){
        valueInSmallest[ shortest[i] ] = 1;
    }

    for( let j = 1; j < orderedLen; ++j ){

        orderedChildLen = ordered[j].length;

        for( let k = 0; k < orderedChildLen; ++k ){
            if( (ordered[j][k] in valueInSmallest) && !( ordered[j][k] in repeated ) )
                ++valueInSmallest[ ordered[j][k] ];

            repeated[ ordered[j][k] ] = 1;
        }

        repeated = {};
    }

    for( let m = 0; m < last.length; ++m ){
        if( last[m] in valueInSmallest ){
            ++valueInSmallest[ last[m] ];

            if( valueInSmallest[ last[m] ] === arrays.length )
                result.push( last[m] );
        }
    }

    return result;
}

function intersection_naive (...args){
    // loop across all arguments
    return args.reduce(function(previous, current){
        // include only those items in the accumulator
        return previous.filter(function(element){
            // already in the accumulator,
            // which defaults to the first argument
            return current.includes(element);
        });
    });
}


function intersection_recursive( ...arrays ){

    if( arrays.length < 2 )
        return arrays[0] || [];

    arrays = arrays.sort( ( arr1, arr2 ) => arr1.length - arr2.length );

    while( arrays.length > 1 ){

        arrays.push( _intersect( arrays.pop(), arrays.pop() ) );

    }

    return arrays[0];

    function _intersect( a1, a2 ){
        // console.log( "a2", a2 );
        // console.log( "a1", a1 );
        let res = [];

        for( let i = 0; i < a1.length; ++i ){
            if( a2.indexOf( a1[i] ) > -1 )
                res.push( a1[i] );
        }

        // console.log( "res", res );

        return res;
    }
}

// console.log( intersection_fast( [1,2,3,4,5,6,7,8,9], [10,1,2,23,5,87,4], [10,20,30,40,50,60,70,80,90,100] ) );
// console.log( intersection_fast( [1,2],[1,4,5,6],[1,7,8,9] ) );
// console.log( intersection_fast( [1,2],[1,4,5,6],[1,7,8,9] ) );
// console.log( intersection_fast( [1,2],[1,4,5,2],[1,2,4] ) );
// console.log( intersection_recursive( [3,1,2],[1,3,5,2],[1,2,3],[1,2,3] ) );
// console.log( intersection_hash( [3,1,2],[1,3,5,2,3,1],[1,2,3,2,3,1],[1,2,3,2,3,1] ) );