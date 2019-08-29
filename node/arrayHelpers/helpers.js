/**
 * Common array helper functions that perform well.
 *
 * Currently the intersection_fast is not really that fast and needs a significant overhaul
 */

module.exports.intersect = intersection_fast;
module.exports.intersect_slow = intersection_naive;


function intersection_fast( ...arrays ){
    const ordered = (
        arrays.length === 1 ?
            arrays :
            arrays.sort( ( arr1, arr2 ) => arr1.length - arr2.length )
        ),
        shortest = ordered[0],
        set = new Set(),
        result = [];

        let item,
        every = true;

    for( let i = 0; i < shortest.length; ++i ){
        item = shortest[i];
        every = true;

        for( let j = 1; j < ordered.length; ++j ){
            if( ordered[j].includes( item ) ) continue;

            every = false;
            break;
        }

        if( !every || set.has( item ) ) continue;
        // if( !every || set[ item ] ) continue;

        set.add( item );
        // set[ item ] = true;
        result[ result.length ] = item;
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
};

// console.log( fastIntersection( [1,2,3,4,5,6,7,8,9], [10,1,2,23,5,87,4], [10,20,30,40,50,60,70,80,90,100] ) );
// console.log( fastIntersection2( [1,2],[1,4,5,6],[1,7,8,9] ) );
// console.log( fastIntersection( [1,2],[1,4,5,6],[1,7,8,9] ) );
// console.log( intersection( [1,2],[1,4,5,6],[1,8,9] ) );