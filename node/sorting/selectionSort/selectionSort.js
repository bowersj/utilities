'use strict';

function selectionSort( arr ){
    if( arr.length === 0 ) return [];

    let min;

    for( let i = 0; i < arr.length; ++i ){
        min = i;
        for( let j = i; j < arr.length; ++j ){
            if( arr[j] < arr[min] ){
                min = j;
            }
        }
        if( min !== i ){
            let temp = arr[min];
            arr[min] = arr[i];
            arr[i] = temp;
        }
    }
    return arr;
}

// console.log( selectionSort([1,5,9,8,6,3,4,7,0]) );