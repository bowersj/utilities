'use strict';

function swap( arr, i, j ){
    let temp = arr[ i ];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr;
}

function bubbleSort( arr ){
    if( arr.length === 0 ) return [];
    let noSwaps;

    for( let i = arr.length - 1; i > 0; --i  ){
        noSwaps = true;
        for( let j = 0; j < i - 1; ++j ){
            if( arr[j] > arr[j+ 1] ){
                swap( arr, j, j+1 );
                noSwaps = false;
            }
        }
        if(noSwaps) break;
    }
    return arr;
}

console.log( bubbleSort( [5,8,1,3,2,8,4,3,9] ) ); //[1,2,3,3,4,5,8,8,9]