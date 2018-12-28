'use strict';

function insertionSort( arr ){
    if( arr.length === 0 ) return [];
    let last;

    for( let i = 0; i < arr.length; ++i ){
        for( let j = i; j > 0; --j ){
            last = arr[j - 1];
            if( arr[j] < last ){
                arr[j - 1] = arr[j];
                arr[j] = last;
            }
        }
    }

    return arr;
}

// console.log( insertionSort([9,5,8,3,1,4,6,0,7] ) );

function insertionSort_solution( arr ){
    for( let i = 1; i < arr.length; ++i ){
        let currentVal = arr[i];
        let j = i - 1;
        for( j; j >= 0 && arr[j] > currentVal; --j ){
            arr[j+1] = arr[j];
        }
        arr[ j + 1 ] = currentVal;
    }
    return arr;
}

// console.log( insertionSort_solution([9,5,8,3,1,4,6,0,7] ) );