/**
 * Write a function called that takes a string of parentheses, and determines if the order of the parentheses is valid.
 * The function should return true if the string is valid, and false if it's invalid.
 *
 * Examples
 * "()"              =>  true
 * ")(()))"          =>  false
 * "("               =>  false
 * "(())((()())())"  =>  true
 *
 * Constraints
 * 0 <= input.length <= 100
 */

function validParentheses_mySolution( parens ){
    let parenExists = {
        "(": ")"
    };

    let tokens = parens.split('');
    let stack = [];

    for( let i = 0; i < tokens.length; ++i ){
        if( parenExists[ tokens[i] ] ){
            stack.push( parenExists[ tokens[i] ] );
        } else {
            if( stack.pop() !== tokens[i] )
                return false;
        }
    }

    return stack.length <= 0;



}

function validParentheses_bestSolution(string){
    var tokenizer = /[()]/g, // ignores characters in between; parentheses are
        count = 0,           // pretty useless if they're not grouping *something*
        token;
    while(token = tokenizer.exec(string), token !== null){
        if(token == "(") {
            count++;
        } else if(token == ")") {
            count--;
            if(count < 0) {
                return false;
            }
        }
    }
    return count == 0;
}