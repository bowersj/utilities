'use strict';

// pivot will start at the first element.
// there are other options

function getPivot( arr, start = 0, end = arr.length + 1 ){

    let pivotVal = arr[ start ];
    let swapIndex = start;

    for( let i = start + 1; i < arr.length; ++i ){
        if( pivotVal > arr[i] ){
            ++swapIndex;
            let temp = arr[swapIndex];
            arr[swapIndex] = arr[i];
            arr[i] = temp;

        }
    }
    let temp = arr[start];
    arr[start] = arr[swapIndex];
    arr[swapIndex] = temp;
    return swapIndex;
}

// console.log( getPivot( [5,4,3,1,9,6,8,7] ) );

function quickSort( arr, left = 0, right = arr.length - 1 ){
    if( right > left ){
        let pivot = getPivot( arr, left, right );
        quickSort( arr, left, pivot );
        quickSort( arr, pivot + 1, right );
    }
    return arr;
}

console.log( quickSort([100,5,4,3,-9,1,9,6,8,7]) );