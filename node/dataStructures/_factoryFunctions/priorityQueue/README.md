# Priority Queue

A Priority Queue is a queue that is ordered in some way based on a priority of some sort.

Below is a list of the methods associated with the PriorityQueue class.

* __[enqueue](https://github.com/bowersj/utilities/blob/11387f8be1b818efe8805cdf20414dc654b1a44a/node/dataStructures/priorityQueue/priorityQueue.js#L15)__  - Addes a value to the list based on its priority.
* __[bubbleUp](https://github.com/bowersj/utilities/blob/11387f8be1b818efe8805cdf20414dc654b1a44a/node/dataStructures/priorityQueue/priorityQueue.js#L23)__ - A helper function for _[enqueue](https://github.com/bowersj/utilities/blob/11387f8be1b818efe8805cdf20414dc654b1a44a/node/dataStructures/priorityQueue/priorityQueue.js#L15)_ which implaments the adding of a value based on it priority.
* __[dequeue](https://github.com/bowersj/utilities/blob/11387f8be1b818efe8805cdf20414dc654b1a44a/node/dataStructures/priorityQueue/priorityQueue.js#L45)__   - Removes the value with the largest priority.
* __[sink](https://github.com/bowersj/utilities/blob/11387f8be1b818efe8805cdf20414dc654b1a44a/node/dataStructures/priorityQueue/priorityQueue.js#L57)__     - A helper function for _[dequeue](https://github.com/bowersj/utilities/blob/11387f8be1b818efe8805cdf20414dc654b1a44a/node/dataStructures/priorityQueue/priorityQueue.js#L45)_ which implaments the removal of the highest priority and reorders the PriorityQueue's values based on their priority.
