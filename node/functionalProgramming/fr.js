"use strict";

/**
 * @function compose
 * @version 1.0.0
 * @public
 *
 */
let compose = ( ...fns ) => x => fns.reduceRight( ( y, f ) => f(y), x);


/**
 * @function pipe
 * @version 1.0.0
 * @public
 *
 */
let pipe = ( ...fns ) => x => fns.reduce( ( y, f ) => f(y), x );