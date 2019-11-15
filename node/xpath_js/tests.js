const xpath = require( "./xpath.js" );

const simpleObj = {
    prop1: "1prop",
    prop2: "2prop",
    prop3: "3prop",
    prop4: "4prop",
    prop5: "5prop"
};
const simpleObj_test = "/prop2";
const simpleObj_test_expected = "2";

console.log( xpath.parse( simpleObj, simpleObj_test ) );
console.log( xpath.parse( simpleObj, simpleObj_test ) );

const simpleArr = [ "1arr", "2arr", "3arr", "4arr" ];
const simpleArr_test = "/1";
const simpleArr_test_expected = "2";

console.log( xpath.parse( simpleArr, simpleArr_test ) );
console.log( xpath.parse( simpleArr, simpleArr_test ) );

const obj1 = {
    name: "josh",
    age: Infinity,
    birthDate: "None of you business",
    likes:[
        { link: "https://myFavoriteWebsite.com/cats",     dateOfLike: "2019-11-15" },
        { link: "https://myFavoriteWebsite.com/dogs",     dateOfLike: "2018-01-30" },
        { link: "https://myFavoriteWebsite.com/ducks",    dateOfLike: "2019-12-08" },
        { link: "https://myFavoriteWebsite.com/tigers",   dateOfLike: "2015-05-18" },
        { link: "https://myFavoriteWebsite.com/dolphins", dateOfLike: "2016-02-09" },
    ]
};

console.log( xpath.parse( obj1, "/likes/link" ) );

const obj2 = {
    name: "josh",
    age: Infinity,
    birthDate: "None of you business",
    likes:[
        { link: "https://myFavoriteWebsite.com/cats",
            dateOfLike: "2019-11-15",
            relatedPages:[
                "https://myFavoriteWebsite.com/dogs",
                "https://myFavoriteWebsite.com/ducks",
                "https://myFavoriteWebsite.com/tigers",
                "https://myFavoriteWebsite.com/dolphins",
            ]
        },
        { link: "https://myFavoriteWebsite.com/dogs",
            dateOfLike: "2018-01-30",
            relatedPages:[
                "https://myFavoriteWebsite.com/cats",
                "https://myFavoriteWebsite.com/ducks",
                "https://myFavoriteWebsite.com/tigers",
                "https://myFavoriteWebsite.com/dolphins",
            ]
        },
        { link: "https://myFavoriteWebsite.com/ducks",
            dateOfLike: "2019-12-08",
            relatedPages:[
                "https://myFavoriteWebsite.com/cats",
                "https://myFavoriteWebsite.com/dogs",
                "https://myFavoriteWebsite.com/tigers",
                "https://myFavoriteWebsite.com/dolphins",
            ]
        },
        { link: "https://myFavoriteWebsite.com/tigers",
            dateOfLike: "2015-05-18",
            relatedPages:[
                "https://myFavoriteWebsite.com/cats",
                "https://myFavoriteWebsite.com/dogs",
                "https://myFavoriteWebsite.com/ducks",
                "https://myFavoriteWebsite.com/dolphins",
            ]
        },
        { link: "https://myFavoriteWebsite.com/dolphins",
            dateOfLike: "2016-02-09",
            relatedPages:[
                "https://myFavoriteWebsite.com/cats",
                "https://myFavoriteWebsite.com/dogs",
                "https://myFavoriteWebsite.com/ducks",
                "https://myFavoriteWebsite.com/tigers",
            ]
        },
    ]
};

console.log( xpath.parse( obj2, "/likes/relatedPages" ) );

const obj3 = {
    name: "josh",
    age: Infinity,
    birthDate: "None of you business",
    likes:[
        { link: "https://myFavoriteWebsite.com/cats",
            dateOfLike: "2019-11-15",
            relatedPages:[
                { link: "https://myFavoriteWebsite.com/dogs", importance: 1},
                {link: "https://myFavoriteWebsite.com/ducks", importance: 2},
                {link: "https://myFavoriteWebsite.com/tigers", importance: 3},
                {link: "https://myFavoriteWebsite.com/dolphins", importance: 4},
            ]
        },
        { link: "https://myFavoriteWebsite.com/dogs",
            dateOfLike: "2018-01-30",
            relatedPages:[
                {link: "https://myFavoriteWebsite.com/cats", importance: 5},
                {link: "https://myFavoriteWebsite.com/ducks", importance: 6},
                {link: "https://myFavoriteWebsite.com/tigers", importance: 7},
                {link: "https://myFavoriteWebsite.com/dolphins", importance: 8},
            ]
        },
        { link: "https://myFavoriteWebsite.com/ducks",
            dateOfLike: "2019-12-08",
            relatedPages:[
                {link: "https://myFavoriteWebsite.com/cats", importance: 9},
                {link: "https://myFavoriteWebsite.com/dogs", importance: 10},
                {link: "https://myFavoriteWebsite.com/tigers", importance: 11},
                {link: "{https://myFavoriteWebsite.com/dolphins", importance: 12},
            ]
        },
        { link: "https://myFavoriteWebsite.com/tigers",
            dateOfLike: "2015-05-18",
            relatedPages:[
                {link: "https://myFavoriteWebsite.com/cats", importance: 13},
                {link: "https://myFavoriteWebsite.com/dogs", importance: 14},
                {link: "https://myFavoriteWebsite.com/ducks", importance: 15},
                {link: "https://myFavoriteWebsite.com/dolphins", importance: 16},
            ]
        },
        { link: "https://myFavoriteWebsite.com/dolphins",
            dateOfLike: "2016-02-09",
            relatedPages:[
                {link: "https://myFavoriteWebsite.com/cats", importance: 17},
                {link: "https://myFavoriteWebsite.com/dogs", importance: 18},
                {link: "https://myFavoriteWebsite.com/ducks", importance: 19},
                {link: "https://myFavoriteWebsite.com/tigers", importance: 20},
            ]
        },
    ]
};

console.log( xpath.parse( obj3, "/likes/0/relatedPages/importance" ) );