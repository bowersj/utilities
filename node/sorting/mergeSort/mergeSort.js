function merge( arr1, arr2 ){
    let res = [];

    let i = 0;
    let j = 0;

    while( i < arr1.length && j < arr2.length ){
        if( arr1[i] < arr2[j] ){
            res.push( arr1[i] );
            ++i;
        } else {
            res.push( arr2[j] );
            ++j;
        }
    }

    // the previous loop catches most but there could be
    // some values left over in either array
    while( i < arr1.length ){
        res.push( arr1[i] );
        ++i;
    }

    while( j < arr2.length ){
        res.push( arr2[j] );
        ++j;
    }
    return res;
}

// console.log( merge( [100], [0,2,4,6,7] ) );


function mergeSort( arr ){
    if( arr.length <= 1 ) return arr;

    let middle = arr.length / 2;
    // split arrays down to either length of 1 or 0 thus yielding multiple arrays that are sorted
    let right = mergeSort( arr.slice(0, middle) );
    let left = mergeSort( arr.slice( middle ) );
    // combine arrays in sorted order
    return merge( right, left )
}

console.log( mergeSort([1,2,7,5,4,6,9,2,3,8]) );