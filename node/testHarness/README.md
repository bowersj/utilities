# Test Harness

### Credit Where it is Due
In all fairness I did not build this test harness, Mike Bowers did and 
since I use this often I have added it to this repo.


### Why Should you use this
The idea is simple, before you write your code you should figure out basic,
and in some cases some more advanced, use cases that your code is going to 
be built to handle i.e. math using big nubmers, empty stings, how you account
for null and undefined safely, and so forth. This list can get quite large
and burdensome to try to memorize esspecially if you work or have worked in 
many different programming languages. So, enter unit testing a practice that
many if not all developers should live by but tend to either run out of time
for or just dont want to do it. So how can we make this simple and easy to do?
Many modules have attempted this and while they are quite good at many things
they tend to miss the mark in little ways. Thus enter this module.


### How it works
* Write the code you want to test
* Build out values that you want to test your code against
	* i.e. empty strings, null, undefined, unexpected falsy values, ect.
* Register your tests and the fucntion you want to test
* Run test
* Check array of results that failed your tests
* Repeat until desired results are met