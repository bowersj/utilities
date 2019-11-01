module.exports = hungryFoxes;


function removeChickensIfFoxesExistInGroup( item ){
    let groups = item.val.split( "X" );

    for( let j = 0, jl = groups.length; j < jl; ++j ){
        if( groups[j].includes( "F" ) ){
            groups[j] = groups[j].replace( /[CF]/g, "." )
        }
    }

    groups = groups.join( "X" );

    item.val = groups;

    return item;
}


function tokenize( farm ){
    let token = farm.split( "" );
    let items = [];

    let cage = "";
    let noCage = "";
    let inCage = false;
    let start = -1;

    for( let i = 0, l = token.length; i < l; ++i ){

        switch ( token[i] ) {
            case "[":
                inCage = true;
                noCage += "[";
                start = i;
                break;
            case "]":
                items.push({ inCage, val: cage, start });
                noCage += "]";
                inCage = false;
                cage = "";
                break;
            default:
                if( inCage ){
                    cage += token[i];
                } else {
                    noCage += token[i];
                }
        }
    }

    items.push({ inCage: false, val: noCage });

    return items;
}


function hungryFoxes(farm) {
    let items = tokenize( farm );

    let item = {};

    for( let i = 0, l = items.length; i < l; ++i ){
        item = items[i];
        if( item.val.includes( "X" ) ){
            item = removeChickensIfFoxesExistInGroup( item );
        } else {
            if( item.val.includes( "F" ) ){
                item.val = item.val.replace( /C/g, "." );
            }
        }
    }

    let nextDay = items[ items.length - 1 ].val;

    for( let i = 0, l = items.length; i < l; ++i ){
        if( items[i].inCage )
            nextDay = nextDay.substring( 0, items[i].start + 1 ) + items[i].val + nextDay.substring( items[i].start + 1 )
    }

    return nextDay;
}


function hungryFoxes_v1(farm) {

    let items = farm.replace( /[\[]/g, "!$" ).split( /[!]/g );
    const l = items.length;

    for( let i = 0; i < l; ++i ){
        if( items[i].includes( "F" ) ){
            console.log( items[i] );
            items[i] = items[i].replace( /C/g, "." );

            if( i % 2 === 1 ){

            }
        }
    }

    let nextDay = "";

    for( let i = 0; i < l; ++i ){
        if( i % 2 === 1 )
            nextDay += `[${items[i]}]`;
        else
            nextDay += items[i];
    }

    return nextDay;
}


// const before = "...CC...X...[CCC]CCC[CCCXCCCF]CCCC[CFC]FCC";
// const after = "...CC...X...[CCC]...[CCCX....]....[.F.]...";
//
// console.log( "before:", before );
// console.log( "rest:", hungryFoxes( before ) );
// console.log( "goal:", after );