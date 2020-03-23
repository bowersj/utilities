let test = "0000000011011010011100000110000001111110100111110011111100000000000111011111111011111011111000000101100011111100000111110011101100000100000";
let test2 = "11000001";
let res = "···· · −·−−   ·−−− ··− −·· ·";
let res2 = "· ·";

const MORSE_CODE = {
    '-.-.--': '!', '.-..-.': '"', '...-..-': '$', '.-...': '&', '.----.': '\'', '-.--.': '(',
    '-.--.-': ')', '.-.-.': '+', '--..--': ',', '-....-': '-', '.-.-.-': '.', '-..-.': '/',
    '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5', '-....': '6',
    '--...': '7', '---..': '8', '----.': '9', '---...': ':', '-.-.-.': ';', '-...-': '=', '..--..': '?',
    '.--.-.': '@', '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G',
    '....': 'H', '..': 'I',  '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
    '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W',
    '-..-': 'X', '-.--': 'Y', '--..': 'Z', '..--.-': '_', '...---...': 'SOS'
};

function buildGetUitGroupFunction( tokens ){
    let sorted = tokens.slice().sort( ( a, b ) => a.length - b.length );

    // console.log( sorted );
    /**
     * since the smallest unit of time is either a dot (1's) or a space (0's)
     * we know that the values for a dot or space between dots and dashes must
     * be less than tree times the minimum otherwise it would be considered
     * either a dash or space between characters in a word.
     *
     * Another way to look at this would be to analyze where the size of string
     * jumps up, indicating a new group.
     */
    // let averages = [];
    // let smallest = sorted[0].length;
    // let baseRange = ( ( sorted[ sorted.length - 1 ].length - smallest ) / 2 );
    // let range = sorted.length % 2 === 1 ? baseRange : baseRange - 1;
    //
    // for( let i = 1; i < 4; ++i ){
    //     averages.push({ unit: i, range: range * i })
    // }


    // let diff = 0;
    // let seqLen = -1;
    //
    // for( let i = 1, l = sorted.length; i < l; ++i ){
    //     seqLen = sorted[i].length;
    //     diff = ( seqLen + smallest ) / 2;
    //     // console.log( diff );
    //     if( diff > range ){
    //         averages.push({
    //             unit,
    //             range: seqLen
    //         });
    //         smallest = sorted[ i + 1 < sorted.length ? i + 1 : i ].length;
    //         ++unit;
    //     }
    // }

    // averages.push({
    //     unit,
    //     range: sorted[ sorted.length - 1 ].length
    // });

    // console.log( breakPoints );

    // let smallestInGroup = sorted[0].length;
    // let bpScalars = [ 7 ,3 ];
    // // initialize as a double
    // let breakPoint = Number.MAX_VALUE;
    // breakPoint = smallestInGroup * bpScalars.pop();
    // // console.log( breakPoint );
    // let len = 0;
    // let unit = 1;
    // let median = Number.MAX_VALUE;
    // let averages = [];
    //
    // for( let i = 0, l = sorted.length; i < l; ++i ){
    //     len = sorted[i].length;
    //
    //     if( len >= breakPoint ){
    //         // console.log( samples );
    //         median = ( smallestInGroup + sorted[i - 1].length ) / 2;
    //
    //         // console.log( average );
    //
    //         averages.push({
    //             unit,
    //             range: sorted[i - 1].length,
    //             med: median
    //         });
    //         ++unit;
    //         smallestInGroup = len;
    //         breakPoint = Math.floor( median * bpScalars.pop() ) || Infinity;
    //
    //         // console.log( breakPoint );
    //     }
    //
    // }
    // // might not need med and the lower limit in the range
    // averages.push({
    //     unit,
    //     range:sorted[ sorted.length - 1 ].length,
    //     med: ( smallestInGroup + sorted[ sorted.length - 1 ].length ) / 2,
    // });

    console.log( averages );

    return function( seq ){
        // console.log( seq );
        let len = seq.length;

        for( let i = 0, l = averages.length; i < l; ++i ){
            if( len <= averages[i].range )
                return averages[i].unit;
        }
    }
}

/**
 * NOT WORKING, see below for details
 * expected: ···· · −·−−   ·−−− ··− −·· ·
 * result:   ...- . -.--   ---- .. - --. .
 * diff:        *          *      *******
 *
 * Notes:
 * some how an extra space was added near the end. Check tokens to make sure the source is right.
 * Besides the extra space, the only other problem is that some slashes should be dots. These
 *  mistakes do result in a valid morse code character, so need to check the algorithm.
 *
 */
function decodeBitsAdvanced( bits ){
    let tokens = bits.replace( /^0+|0+$/ ).match( /(0+)+|(1+)+/g );

    // console.log( tokens );

    const getUnitGroup = buildGetUitGroupFunction( tokens );
    let seq = "";
    let res = "";

    for( let i = 0, l = tokens.length; i < l; ++i ){
        seq = tokens[i];
        // console.log( seq );
        switch( getUnitGroup( seq ) ){
            case 1:
                if ( seq.charAt(0) === "1" ) {
                    res += ".";
                }
                break;
            case 2:
                switch( seq.charAt(0) ){
                    case "0":
                        res += " ";
                        break;
                    case "1":
                        res += "-";
                        break;
                }
                break;
            case 3:
                res += "   ";
                break;
        }
    }

    return res;
}

console.log( "expected:", res );
console.log( "result:  ", decodeBitsAdvanced( test ) );
console.log( "expected:", res2 );
console.log( "result:  ", decodeBitsAdvanced( test2 ) );