let BST = require( "./bst_objects.js" );

// BST testing
let bst = new BST();

bst.insert(1);
bst.insert(2);
bst.insert(3);
bst.insert(4);
bst.insert(5);
bst.insert(6);
bst.insert(7);
bst.insert(8);
bst.insert(9);
// console.log(JSON.stringify( bst , null, 2));
// console.log( bst.contains(0) );

// bst.traverseBreadth();
// console.log( bst.traverseBreadth() );
// console.log( bst.traverseDepthPreOrder() );
// console.log( bst.traverseDepthPostOrder() );
// console.log( bst.traverseDepthInOrder() );
console.log( bst.balance() );
console.log( JSON.stringify( bst, null, 2 ) );

// console.log( bst.validate() );