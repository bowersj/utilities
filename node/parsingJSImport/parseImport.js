const lineRegex = /[^\r\n]+/g;
const importSymbol = "import";
const importRegex = /\s*import\s+/g;
const quotesRegex = /['|"]*/g;
const parentSymbol = "..";
const currentSymbol = ".";

/**
 * when used in conduction with functions the function parser will need to assign a unique id to the function as well
 * as track what file the function is in. Then, at the bottom of the resultant file an export statement should be added
 * renaming the functions to what they are named and resolving any conflicts algorithmically.( this could be done through a appending a number/letter )
 */

function parseImport( importStatement, fileLoc = "" ){
    if( typeof importStatement !== "string" )
        throw new TypeError( "importStatement must be a string." );

    if( typeof fileLoc !== "string" )
        throw new TypeError( "fileLoc must be a string." );

    const res = [];
    const lines = importStatement.match( lineRegex );
    let line = "";
    let temp = {};
    let variables = "";
    let moduleLoc = "";
    let baseLine = "";

    for( let i = 0, l = lines.length; i < l; ++i ){
//         line = lines[i].trim().replace( importRegex, "" ).replace( "'", "" );
        line = lines[i].trim().replace( quotesRegex, "" );

        if( line.includes( "from" ) ){
            temp = {};

            if( baseLine === "" )
                temp = parseImportLine( line, fileLoc );
            else {
                baseLine += line;
                temp = parseImportLine( baseLine, fileLoc );
            }

            moduleLoc = temp.moduleLoc;
            variables = temp.variables;

            res.push({ line: line.includes( "import" ) ? lines[i] : baseLine, importing: variables, from: moduleLoc });
            baseLine = "";
        } else {
            // two scenarios, importing just a module or multiline import statement
            if( line.includes( "import" ) ){
                baseLine = line;
            } else {
                baseLine += line;
                continue;
            }

//           variables = "";
//           moduleLoc = parseModuleLoc( line, fileLoc );
        }
    }
    return res;
}

function parseImportLine( line, fileLoc ){
    line = line.replace( "import", "" );
    let temp = line.split( "from" );
    let obj = {}
    obj.variables = parseVariables( temp[0] );
    obj.moduleLoc = parseModuleLoc( temp[1], fileLoc );

    return obj
}

function parseVariables( varStr ){

    if( varStr.includes( "{" ) ){
        varStr = varStr.replace( /[{|}]/g, "" );
    }

    let res = [];
    let vars = varStr.split( "," );
    let _var = "";
    let isAliased = false;

    for( let i = 0,l = vars.length; i < l; ++i ){
        _var = vars[i];
//         if( aliasRegex.test( _var ) ){
        if( _var.includes( "as" ) ){
            _var = _var.split( "as" );
            res.push({ var: _var[0].trim(), alias: _var[1].trim() })
        } else {
            res.push({ var: _var.trim(), alias: "" })
        }
    }

    return res;
}

function parsePath( pathStr ){
    let node = pathStr.split( "/" );

    if( node[0] === "" )
        node = node.slice( 1 );

    if( node[ node.length - 1 ] === "" )
        node.pop();

    return node;
}

function parseModuleLoc( moduleLoc, fileLoc = "" ){
    moduleLoc = moduleLoc.trim();
    fileLoc   = fileLoc.trim();

    if( !moduleLoc.includes( ".js" ) )
        moduleLoc += ".js";


    let node = parsePath( moduleLoc );
    let base = parsePath( fileLoc );
    let _node = "";

    for( let i = 0, l = node.length; i < l; ++i ){
        _node = node[i].trim();

        if( _node === currentSymbol ){
            node = node.slice( i + 1 );
            break;
        } else if( _node === parentSymbol ){
            base.pop();
//             node = node.slice( i + 1 );
//             --i;
//             console.log( node )
//             console.log( i )
        } else {
            break;
        }
    }

    base.push.apply( base, node );

    let path = base.join( "/" ).replace( "../", "" );

    return { resolvedPath: path, basePath: fileLoc, modulePath: moduleLoc };
}

const str = `
  import defaultA from './moduleA.js'
  import defaultB, { namedB } from './moduleB'
  import { namedC } from './moduleC'
  import { namedD as otherName } from './moduleD'
  import * as moduleE from './moduleE'
  import './moduleF'
  import {\n foo as otherName2     ,\n bar,\n foobar\n} from 'another-module.js',
  import defaultA from './../moduleA.js'
`;

// const str = `

//   import defaultA from './../moduleA.js'

// `;

parseImport( str, "D:/josh" );