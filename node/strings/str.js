 function _getNumberEndingsZeroToTwenty( number ){
    switch( number ){
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

// Ordinal Indicator is the st, nd, rd, th after a number
function getOrdinalIndicator( number ){
		let typeOf = typeof number;
		
    if( typeOf !== "number" )
    	throw new TypeError( `number must be a number not a ${typeOf}` );

    if( number > 20 )
        return _getNumberEndingsZeroToTwenty( number % 10 );
    else
        return _getNumberEndingsZeroToTwenty( number );

}

function capitalizeFirst( str ){
    let first = str.charAt( 0 );
    return str.replace( first, first.toUpperCase() );
}