// TODO: need to add error handling and smart defaults, see
//  https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string#answer-42171078
//  for an example

window.getFunctionFromString = function ( string, scope ) {
    let scopeSplit = string.split('.');
    for (i = 0; i < scopeSplit.length - 1; i++) {
        scope = scope[scopeSplit[i]];

        if (scope === undefined) return;
    }

    return scope[scopeSplit[scopeSplit.length - 1]];
};