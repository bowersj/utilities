# Tips on Writing Efficient JavaScript

## Treat JavaScript as a Typed Language - Define your Types
The reason this is so effective is that the JS interpreter is written in a fixed type language, usually. 
As such when you dynamically change types on the interpreter it has to handel that in ways that are 
not native to that language, i.e. custom methods, that are slow. But if you can keep types consistent
you are allowing the JS interpreter to used a more native solution which is faster.

### Exampls

#### Bad Code
```javascript
let name = null;
name = "Josh";
name = 1;
```

This simple example changes the type of name three times which means internally to the interpreter has
to handel those changes in a language that doesn't allow types to change. Meaning more work for the
interpreter and more wait time for your end users.

#### Good Code

```javascript
let name = "";
let nameType = 0;

name = "Josh";
nameType = 1;
```

Creating an extra variable to store the type of name might not make sense at first but it ultimately
makes your code more readable and therefore more maintainable as well as faster.

#### Bad Code

```javascript
function badFunc( str, strOrNum, ObjArr ){
    //... do something here
}

// example usages
badFunc( "", "", {} );
badFunc( "", 0, {} );
badFunc( "", "", [] );
badFunc( "", 0, [] );
```

This function definition might seem harmless but, it is a potential slowdown because arguments can
be different types. Why does this matter? Simple, other programing languages _require_ you to 
specify the type of a parameter in the function definition. Also, the parameters of a function are
 part of the function signature. So the function call  `badFunc( "", "", {} );` in another 
language is completely different from `badFunc( "", 0, [] );` because the types of at least one,
or in this case two, of the parameters are different. Also, in other languages, you would have to 
have a separate function declaration accounting for those different types, even though the functions
have the same name. But in JS they have the same signature because the parameters are not part of 
the function signature, so the interpreter has to do extra work to cope with this, which means a 
potential slow down. But what can you do if you have to allow a function to accept different types
for the same parameter?

#### Good Code

```javascript
function goodFunc1( str, str, Obj ){
    //... do something here
}

function goodFunc2( str, num, Obj ){
    //... do something here
}

function goodFunc3( str, str, arr ){
    //... do something here
}

function goodFunc4( str, num, arr ){
    //... do something here
}

// example usages
goodFunc1( "", "", {} );
goodFunc2( "", 0, {} );
goodFunc3( "", "", [] );
goodFunc4( "", 0, [] );
```

So what do we gain from doing this other than just more lines of code to maintain? Well, code that is
easier to fully optimize by the JIT compiler. Recall that JS interpreters are built using fixed 
languages which means when a function is defined in that language it's parameters and the parameters
types are part of the function signature. Therefore, when your poorly typed JS comes along, the 
interpreter has to read in between the lines, or more accurately the curly braces
:stuck_out_tongue_winking_eye:, to see what is going on. To make things more complicated, if you 
have lots of logic to handel different types then it can, in lay mans terms, confuse the JIT 
comelier and potentially lead it deoptimize your code, or avoid optimizing that function at least,
:cry:. So, when you can help it, don't mix types, even in function declarations! But what if you 
have to support multiple types of the same parameter? Well, you'll have to punt it by building a 
function that calls the proper function based on the type.

_A continuation of the code above._
```javascript
function myHubFunc( str, strOrNum, ObjArr ) {
    if( typeof strOrNum === "string" && isObject( objArr ) )
        return goodFunc1( str, strOrNum, ObjArr );
    else if( typeof strOrNum === "number" && isObject( objArr ) )
        return goodFunc2( str, strOrNum, ObjArr );
    else if( typeof strOrNum === "string" && Array.isArray( objArr ) )
         return goodFunc3( str, strOrNum, ObjArr );
     else if( typeof strOrNum === "number" && Array.isArray( objArr ) )
         return goodFunc4( str, strOrNum, ObjArr );
}
``` 

Note, `isObject()` is a function to datetime if that parameter is an object or not, it is not native
to JS, but know that it returns a boolean indicating weather or not the value passed to it is an 
object.


### Bad Code

```javascript
let anInt, aFloat, myObject;
//... compute things
anInt = 0;
//... compute things
aFloat = 0.0 ;
myObject = {}
```

This, hopefully, should be clearly a bad idea. The reason being you are changing types, but how? Well,
when a variable is defined without a value it is assigned `undefined`, then when you update the value
it ultimately is changing the type to the updated value.

### Good Code

```javascript
let anInt = 0, aFloat = 0.0, myObject = {};
```

To solve this problem assign a value, a default value if you like, that is the type the variable should
be. This not only is nice for us humans to understand, but it also helps the JIT compiler know what
types to assign to what variables, and as long as we don't change types on the compiler it can greatly
enhance performance.

### Bad Code

```javascript
function MyConstructor( width, height ){
    this.width = width;
    this.height = height;
}

// some added prototype methods
```

Then in another part of your code, most likely in another file.

```javascript
MyConstructor.prototype.myMethod = function(){
    // some awesome, but temporary code
};
```

The Problem with this is that under the hood the compiler might be turning the class `MyConstructor`
into a class of the language the compiler/interpreter is written in. This can be a problem because
in most other languages a classes method has to be defined up front when means when you add one latter
it has to changed that class which ultimately leads to the JIT compiler not optimizing that class.


### Good Code

Add the code in the same location, make sure you are not updating methods dynamically, because if you do
you will force a decontamination to occur. 


## Treat JavaScript as a Typed Language - Pick your Types Wisely


