# Doubly Linked Lists

A Doubly Linked List is a like a singly linked list expect it contains references to the previous node as well as the next node.

Below is a list of the methods associated with the DoublyLinkedList class.

* __[push](https://github.com/bowersj/utilities/blob/9964886ea1b4a2f7212ad961917f2ef4af7ceaec/node/dataStructures/doublyLinkedLists/doublyLinkedLists.js#L16)__          - A method for adding a value to the list.
* __[pop](https://github.com/bowersj/utilities/blob/9964886ea1b4a2f7212ad961917f2ef4af7ceaec/node/dataStructures/doublyLinkedLists/doublyLinkedLists.js#L29)__           - A mothod for getting the last value from the list.
* __[shift](https://github.com/bowersj/utilities/blob/9964886ea1b4a2f7212ad961917f2ef4af7ceaec/node/dataStructures/doublyLinkedLists/doublyLinkedLists.js#L48)__         - A method for replacing the first position with a new node and moving the replaced node, and all its connections, to the previous of the the new first position node.
* __[unshift](https://github.com/bowersj/utilities/blob/9964886ea1b4a2f7212ad961917f2ef4af7ceaec/node/dataStructures/doublyLinkedLists/doublyLinkedLists.js#L66)__       - A method for adding a new node to the next property of the head and the old next property, and all the nodes related to it, to the new node's next property. 
* __[get](https://github.com/bowersj/utilities/blob/9964886ea1b4a2f7212ad961917f2ef4af7ceaec/node/dataStructures/doublyLinkedLists/doublyLinkedLists.js#L81)__           - A method for getting a value at a certain position in the list.
* __[set](https://github.com/bowersj/utilities/blob/771dc75e0ae5399cc1f137a40c4d05759b599d51/node/dataStructures/doublyLinkedLists/doublyLinkedLists.js#L106)__          - A method for replacing a node at a specific position with a new node.
* __[insert](https://github.com/bowersj/utilities/blob/771dc75e0ae5399cc1f137a40c4d05759b599d51/node/dataStructures/doublyLinkedLists/doublyLinkedLists.js#L115)__       - A method for adding a node at a specific position and taking the neod already in that position and puting it, and all the nodes related to it, as the previous to the current node
* __[remove](https://github.com/bowersj/utilities/blob/771dc75e0ae5399cc1f137a40c4d05759b599d51/node/dataStructures/doublyLinkedLists/doublyLinkedLists.js#L135)__       - A method for deleteing a node at a specific index and making its parent equal to all the nodes related to it.
* __[reverse](https://github.com/bowersj/utilities/blob/771dc75e0ae5399cc1f137a40c4d05759b599d51/node/dataStructures/doublyLinkedLists/doublyLinkedLists.js#L190-L191)__ -- _currently not working..._ -- A method for reversing the orrder of the Doubly Linked List
