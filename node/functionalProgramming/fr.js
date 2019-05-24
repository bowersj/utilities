/**
 * Sources
 * General Ideas
 * https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983
 *
 * currying
 * https://stackoverflow.com/questions/27996544/how-to-correctly-curry-a-function-in-javascript#answer-30249365
 *
 * partial currying (useful if you need to get it down to the second to last function)
 * https://stackoverflow.com/questions/42164000/how-to-reconcile-javascript-with-currying-and-function-composition/42164779#42164779
 *
 */
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