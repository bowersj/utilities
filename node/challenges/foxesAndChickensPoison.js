module.exports = hungryFoxes;


function hungryFoxes(farm) {
    let token = farm.split( "" );
    const l = token.length;
    let items = [];
    let cage = "";
    let noCage = "";
    let inCage = false;
    let start = -1;


    for( let i = 0; i < l; ++i ){

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
    let item = {};

    for( let i = 0, l = items.length; i < l; ++i ){
        item = items[i];
        if( item.val.includes( "X" ) ){

            let groups = item.val.split( "x" );

            for( let j = 0, jl = groups.length; ++j ){
                if( groups[j].includes( "F" ) )
                    groups[j] = groups[j].replace( /[CF]/g, "." )
            }

        } else {
            if( item.val.includes( "F" ) ){
                item.val = item.val.replace( /C/g, "." );
            }
        }
    }

    console.log( items );

    let nextDay = "";

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

    console.log( items );

    return nextDay;
}


const before = "...CC...X...[CCC]CCC[CCCXCCCF]CCCC[CFC]FCC";
const after = "...CC...X...[CCC]...[CCCX....]....[.F.]...";

console.log( "before:", before );
console.log( "rest:", hungryFoxes( before ) );
console.log( "goal:", after );