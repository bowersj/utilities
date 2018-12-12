# node-walk-filesystem-sync
This only contains code for walking the file system using built in node packages.

One function is exported from the `walk.js` file, `walk`.

It accepts one parameter, path. This parameter must be a string.

If the provided path leads to a file then the path is returned. If it leads to a 
directory then it recursively goes through the file system and gathers all the
subsequent paths below the specified directory.

```diff
- Please note that since recursion is used deeply nested file strucutres could cause stack overflow errors.
- Please note that `walk` uses a synchronous approach. Thus, it shouldn't be used in an appserver.
```

### Examples

```javascript
walk( "D:\\fakeData\\fakeDataGenerator-js\\_sourceData\\addresses\\us" )
```
returns
```json
[
  "D:\\fakeData\\fakeDataGenerator-js\\_sourceData\\addresses\\us\\ak\\anchorage.json",
  "D:\\fakeData\\fakeDataGenerator-js\\_sourceData\\addresses\\us\\ak\\city_of_juneau.json",
  "D:\\fakeData\\fakeDataGenerator-js\\_sourceData\\addresses\\us\\ak\\fairbanks_north_star_borough.json",
  "D:\\fakeData\\fakeDataGenerator-js\\_sourceData\\addresses\\us\\ak\\haines.json",
  "D:\\fakeData\\fakeDataGenerator-js\\_sourceData\\addresses\\us\\ak\\kenai_peninsula_borough.json",
  ...
]
```
