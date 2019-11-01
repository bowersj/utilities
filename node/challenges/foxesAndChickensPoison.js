/**
 * Story
 Old MacDingle had a farm.

 It was a free-range chicken farm with a fox problem, as we learned earlier:

 Ref: The Hunger Games - Foxes and Chickens
 So old MacDingle decided to lay fox bait around the farm to poison the foxes.

 Foxes F eat chickens C

 When foxes eat fox bait X they die.

 Fox bait is harmless to chickens.

 Chickens in cages [] are safe (unless a fox has got into the cage with them!)

 Kata Task
 Given the initial configuration of foxes and chickens what will the farm look like the next morning after the hungry foxes have been feasting?

 Examples
 Ex1 - chickens outside cages when foxes about	Before
 CCC[CCC]FCC[CCCCC]CFFFF[CCC]FFFF
 After
 ...[CCC]F..[CCCCC].FFFF[CCC]FFFF
 Ex2 - a fox in a chicken cage	Before
 ...[CCC]...[CCCFC].....[CCC]....
 After
 ...[CCC]...[...F.].....[CCC]....
 Ex3 - foxes are poisoned	Before
 CCCCC...XCCCCCCCCC....FFF.X..CF
 After
 CCCCC...X.................X....
 Ex4 - a bit of everything	Before
 ...CC...X...[CCC]CCC[CCCXCCCF]CCCC[CFC]FCC
 After
 ...CC...X...[CCC]...[CCCX....]....[.F.]...
 Notes
 Anything not a fox, a chicken, fox bait, or a cage is just dirt .
 All cages are intact (not open-ended), and there are no cages inside other cages
 The same fox bait can kill any number of foxes
 A hungry fox will always eat as many chickens as he can get to, before he is tempted by the bait

 https://www.codewars.com/kata/the-hunger-games-foxes-and-chickens-poison/train/javascript/5dbbb27b12e6b0001a32791b
 */

module.exports = hungryFoxes;


function poisonLogic( item ){
    if( item.hasFox ){
        let groups = item.farmArea.split( "X" );

        for( let j = 0, jl = groups.length; j < jl; ++j ){
            if( groups[j].includes( "F" ) )
                groups[j] = groups[j].replace( /[CF]/g, "." )
        }

        groups = groups.join( "X" );
        item.farmArea = groups;
    }

    return item;
}


function tokenize( farm ){
    let token = farm.split( "" );
    let items = [];

    let cage = "";
    let noCage = "";
    let inCage = false;
    let foxInCage = false;
    let foxOutside = false;
    let poisonInCage = false;
    let poisonOutside = false;
    let start = -1;

    for( let i = 0, l = token.length; i < l; ++i ){

        switch ( token[i] ) {
            case "[":
                inCage = true;
                noCage += "[";
                start = i;
                break;
            case "]":
                items.push({ inCage, farmArea: cage, start, hasFox: foxInCage, hasPoison: poisonInCage });
                noCage += "]";
                inCage = false;
                foxInCage = false;
                poisonInCage = false;
                cage = "";
                break;
            case "F":
                if( inCage ){
                    cage += token[i];
                    foxInCage = true;
                } else {
                    noCage += token[i];
                    foxOutside = true;
                }
                break;
            case "X":
                if( inCage ){
                    cage += token[i];
                    poisonInCage = true;
                } else {
                    noCage += token[i];
                    poisonOutside = true;
                }
                break;
            default:
                if( inCage ){
                    cage += token[i];
                } else {
                    noCage += token[i];
                }
        }
    }

    items.push({ inCage, farmArea: noCage, start, hasFox: foxOutside, hasPoison: poisonOutside });

    return items;
}


function hungryFoxes(farm) {
    let items = tokenize( farm );
    let group = {};

    for( let i = 0, l = items.length; i < l; ++i ){
        group = items[i];
        if( group.hasPoison )
            group = poisonLogic( group );
        else if( group.hasFox )
            group.farmArea = group.farmArea.replace( /C/g, "." );
    }

    let nextDay = items[ items.length - 1 ].farmArea;

    for( let i = 0, l = items.length; i < l; ++i ){
        if( items[i].inCage )
            nextDay = nextDay.substring( 0, items[i].start + 1 ) + items[i].farmArea + nextDay.substring( items[i].start + 1 )
    }

    return nextDay;
}


// const before = "...CC...X...[CCC]CCC[CCCXCCCF]CCCC[CFC]FCC";
// const after = "...CC...X...[CCC]...[CCCX....]....[.F.]...";
//
// console.log( "before:", before );
// console.log( "rest:", hungryFoxes( before ) );
// console.log( "goal:", after );