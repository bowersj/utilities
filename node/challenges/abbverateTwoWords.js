/**
 * Write a function to convert a name into initials. This kata strictly takes two words with one space in between them.
 * The output should be two capital letters with a dot separating them.
 * It should look like this:
 *
 * Sam Harris => S.H
 * Patrick Feeney => P.F
 */
function abbreviate( str ){
    let parsed = str.split( /\s+/ );
    if( parsed === null )
        throw new TypeError( "The string is incorrectly formatted." );

    let [ first, last ] =  parsed;
    let newStr = `${first.charAt(0)}.${last.charAt(0)}`;
    return newStr.toUpperCase();
}

console.log( abbreviate( "Sam Harris" ) );
console.log( abbreviate( "Patrick Feeney" ) );