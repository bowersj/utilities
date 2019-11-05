export const addOne_arrow = ( value ) => value + 1;
export function addOne( value ){
    return value + 1;
}

export function sumEven( start = 0, end = 5 ){
    let res = 0;
    let val = 0;

    for( let i = start; i < end; ++i ){
        val = addOne(i);

        if( val % 2 === 0 )
            res += val;
    }

    return res;
}