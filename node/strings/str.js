

/**
 * @function _getNumberEndingsZeroToTwenty
 * @version 1.0.0
 * @private
 *
 * Ordinal Indicator - the st, nd, rd, th after a number
 *
 * a helper function for getting the ordinal indicator of a number from 0 to 20;
 *
 * @return {String} the ordinal indicator
 */
function _getNumberEndingsZeroToTwenty( number ){
   switch( number ){
       case 1: return "st";
       case 2: return "nd";
       case 3: return "rd";
       default: return "th";
   }
}

 /**
  * @function getOrdinalIndicator
  * @version 1.0.0
  * @public
  *
  * Ordinal Indicator - the st, nd, rd, th after a number
  *
  *@return {String} the ordinal indicator of a provided number
  *
  */
function getOrdinalIndicator( number ){
		let typeOf = typeof number;
		
    if( typeOf !== "number" )
    	throw new TypeError( `number must be a number not a ${typeOf}` );

    if( number > 20 )
        return _getNumberEndingsZeroToTwenty( number % 10 );
    else
        return _getNumberEndingsZeroToTwenty( number );

}

 /**
  * @function capitalizeFirst
  * @version 1.0.0
  * @public
  *
  * capitialize the first character of the provided string.
  *
  * @return {String}
  *
  */
function capitalizeFirst( str ){
    let first = str.charAt( 0 );
    return str.replace( first, first.toUpperCase() );
}


/**
 * @function strContains
 * @version 1.0.0
 * @public
 *
 * A simple wrapper around seardhing for a seaquence of characters in a string where case does not matter.
 *
 * @return {String}
 *
 */
function strContains( str, value ){
     return str.toString().toLowerCase().indexOf( value ) !== -1;
}


/**
 * @function genRegExp
 * @version 1.0.0
 * @public
 *
 * generates a regualar expression for identifying if a provided term is okay or not.
 *
 * inspired by https://stackoverflow.com/questions/8854817/in-javascript-how-can-i-use-regex-to-match-unless-words-are-in-a-list-of-exclud/34816310#34816310
 *
 * @return {RegExp} a regular expression listing terms which would yeild true if they exist.
 */
function genRegExp( terms ){
    return new RegExp( terms.join('|') );
}

// Tests
// let searchTerms   = genRegExp( ['use', 'utilize'] );
// let excludedTerms = genRegExp( ['fish', 'something'] );
//
//
// let isValidStr = function (str) {
//     return (searchTerms.test(str) && !excludedTerms.test(str));
// };
//
// console.log( isValidStr('use fish') );
// console.log( isValidStr('utilize hammer') );