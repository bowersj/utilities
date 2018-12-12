/*
 *
 * walk.js
 *
 * Purpose
 * Generate an array of paths as strings based off of a starting point, 
 * path, and the folder structure beneath that path.
 * 
 * Parameters
 *   @path - string: a string containing the path to the starting point.
 *     if the string leads to a file the path is returned.
 *     if the path leads to a directory then it recurses through the file structure
 * 
 * Notes 
 *   Recursion is being used so if the folder structure is deeeeeeeeeeeeeeeeeeeeply nested then another method will need to be developed.
 *   This useses a synchronous approach to traverse the file system so shouldn't be used as part of an app server.
 *
 *
 */
'use strict';

const fs = require('fs');

const nPath = require("path");


function recurse( path, arr ){
    let stats =  fs.statSync( path );

    if( stats.isDirectory()  ) {

        let paths = fs.readdirSync( path );

        for( let i = 0; i < paths.length; ++i ){

            let newPath = nPath.join( path, paths[i] );
            let pathStats = fs.statSync( newPath );

            // console.log( pathStats.isDirectory() );

            if( pathStats.isDirectory() ){
                recurse( newPath, arr );
            } else {
                arr.push( newPath );
            }
        }
    } else { return path }
}

function walk( path ){
    let arr = [];
    recurse( path, arr );
    return arr;
}

// Test Case
// fs.writeFileSync(
//     "addressIndex.json",
//     JSON.stringify(
//         walk( "D:\\fakeData\\fakeDataGenerator-js\\_sourceData\\addresses\\us" )
//     )
// );

module.export.walk = walk;
