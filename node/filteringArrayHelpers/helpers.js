/**
 * @function filterArrayByArray
 * @version 1.0.0
 * @public
 *
 * filters an array by another array, this has the potential to be very slow so if working with massive
 * data sets consider sorting and then using a method similar to this one.
 *
 *
 * @param {Array} array - the array to filter
 * @param {Array} filterArray - the array whose values you would like to filter by.
 * @param {Function} filterFunc - the function to use to filter the array in the array parameter.
 *          Note: it must be a traditional function since arrow functions have lexical scoping and this
 *          works by using using JavaScript function's original scoping.
 *
 * @return {Array} the filtered array
 *
 */
function filterArrayByArray( array, filterArray, filterFunc ){
    return array.filter(
        filterFunc,
        filterArray
    );
}