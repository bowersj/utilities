'use strict';

function binarySearch( arr, search ) {
    let start = 0;
    let end   = arr.length;

    // console.log( start, end );

    while( start <= end ){
        let mid = Math.floor( ( end - start )/2 ) + start;
        // console.log( start, end );

        if( arr[mid] === search ) return mid;

        if( arr[mid] < search ){
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }

    return -1
}

console.log(
    binarySearch(
        [1,2,3,4,5],
        2
    )
);
console.log(
    binarySearch(
        [1,2,3,4,5],
        3
    )
);
console.log(
    binarySearch(
        [1,2,3,4,5],
        5
    )
);
console.log(
    binarySearch(
        [1,2,3,4,5],
        6
    )
);
console.log(
    binarySearch(
        [5,6,10,13,14,18,30,34,35,37,40,44,64,79,84,86,95,96,98,99],
        10
    )
);
console.log(
    binarySearch(
        [5,6,10,13,14,18,30,34,35,37,40,44,64,79,84,86,95,96,98,99],
        95
    )
);
console.log(
    binarySearch(
        [5,6,10,13,14,18,30,34,35,37,40,44,64,79,84,86,95,96,98,99],
        100
    )
);