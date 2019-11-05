let test = "000110011001100110000001100000011111100110011111100111111000000000000001100111111001111110011111100000011001100111111000000111111001100110000001100000";
let test2 = "1100000011";
let res = "···· · −·−−   ·−−− ··− −·· ·";

function getTransmissionRate( tokens ){
    return tokens.slice().sort( ( a, b ) => a.length - b.length )[0].length;
}

/**
 * Time units vary, in this example it is two.
 * Dot - 1 time unit (2 in example)
 * Dash - 3 time units (6 in example)
 * Pause between dots and dashes in a character - 1 time unit (2 in example)
 * Pause between characters inside a word - 3 time units (6 in example)
 * Pause between words - 7 time units (14 in example)
 *
 */
function decodeBits( bits ){
    let tokens = bits.match( /(0+)+|(1+)+/g );
    const zeroRegEx = /0+/;

    if( zeroRegEx.test( tokens[0] ) )
        tokens.shift();

    if( zeroRegEx.test( tokens[ tokens.length - 1 ] ) )
        tokens.pop();

    const tr = getTransmissionRate( tokens );
    let seq = "";
    let res = "";

    for( let i = 0, l = tokens.length; i < l; ++i ){
        seq = tokens[i];
        switch( seq.charAt(0) ){
            case "0":
                switch( seq.length / tr ){
                    case 3:
                        res += " ";
                        break;
                    case 7:
                        res += "   ";
                        break;
                }
                break;
            case "1":
                switch( seq.length / tr ){
                    case 1:
                        res += ".";
                        break;
                    case 3:
                        res += "-";
                        break;
                }
                break;
        }
    }

    return res;
}

console.log( ". ." );
console.log( decodeBits( test2 ) );