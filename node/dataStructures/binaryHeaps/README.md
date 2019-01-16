# Binary Heaps (Max Binary Heap)

A Binary Heap, as I have implamented it, is an array contain values in a sorted order, lowest to highest (ascending) or highest 
to lowest (descending). The followning methods come with the heap class I implamented.

* __[insert](https://github.com/bowersj/utilities/blob/2400c39386ac836181aa06fae4fd01b100b2a019/node/dataStructures/binaryHeaps/binaryHeaps.js#L7)__ - adds a value to the heap in sorted order, thus maintaining the requirement of a heap.
* __[bubbleUp](https://github.com/bowersj/utilities/blob/2400c39386ac836181aa06fae4fd01b100b2a019/node/dataStructures/binaryHeaps/binaryHeaps.js#L13)__- a helper method for _[insert](https://github.com/bowersj/utilities/blob/db39eaf06a7972d456bf2a6cbf5f02133158f4af/node/dataStructures/binaryHeaps/binaryHeaps.js#L8)_. It is what maintains the sorted order.
* __[getMax](https://github.com/bowersj/utilities/blob/db39eaf06a7972d456bf2a6cbf5f02133158f4af/node/dataStructures/binaryHeaps/binaryHeaps.js#L33)__- removes and returns the max value in the heap.
* __[sink](https://github.com/bowersj/utilities/blob/db39eaf06a7972d456bf2a6cbf5f02133158f4af/node/dataStructures/binaryHeaps/binaryHeaps.js#L45)__- a helper method for _[getMax](https://github.com/bowersj/utilities/blob/db39eaf06a7972d456bf2a6cbf5f02133158f4af/node/dataStructures/binaryHeaps/binaryHeaps.js#L33)_. It is what ensures that after the removal of the max the values are still in sorted order.
* __[clear](https://github.com/bowersj/utilities/blob/db39eaf06a7972d456bf2a6cbf5f02133158f4af/node/dataStructures/binaryHeaps/binaryHeaps.js#L83)__- removes all the values from the heap.

