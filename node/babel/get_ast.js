const babel = require( "babel-core" );
const fs = require( "fs" );

const code = fs.readFileSync( "./example.js" ).toString();

let res = babel.transform( code );

let pretty_code = JSON.stringify( res, null, 2 );

fs.writeFileSync( "./babel_transform_output.json", pretty_code );

console.log( "finished" );

