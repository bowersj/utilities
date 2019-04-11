# How to call a function using just a string

##Credit where it is due
This approach was found and adapted from [Stack Overflow](https://stackoverflow.com/questions/912596/how-to-turn-a-string-into-a-javascript-function-call#answer-12380392).
Written originally by [Siamak A.Motlagh](https://stackoverflow.com/users/944948/siamak-a-motlagh)


### Why does this work
So how does this work? A string is not a function, but every function has 
a name which is a string. This name uniquely identifies the function so 
if two functions share the same name and they are with in the same scope 
the latter will override the previous. So, this works by getting the 
function by its name, but where from? Well, the logical place to start is 
the global scope and then if necessary traverse through it to find the
desired function, that is what the provided function does.


### What you need to know about Scope
In client side JavaScript every function lives inside of the global scope, 
or window, in node it is literally global. Since functions can be declared 
in subsets of the global scope, ie with in another function, this method 
must be able to traverse the scope.


### Caveats

The following techniques of declaring functions __will not__ be discoverable 
by this method.

```javascript
let func1 = function(){
    return "I am Funtion 1";
};

const func2 = function(){
    return "I am Funtion 2";
};

class class1{
    constructor(){
        this.message = "I am a class";
    }
}
```

The reason is that these techniques do not add the function to the global scope, thus making
them not globally accessible, which is why these techniques exist.