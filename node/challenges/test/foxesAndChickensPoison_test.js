const hungryFoxes = require( "../foxesAndChickensPoison.js" );
const Test = require('assert');

describe("Example Tests", function() {

    // assertEquals actual/expected

    it("ex1", function(){
        const before = "CCC[CCC]FCC[CCCCC]CFFFF[CCC]FFFF";
        const after = "...[CCC]F..[CCCCC].FFFF[CCC]FFFF";
        Test.strictEqual(hungryFoxes(before), after);
    });

    it("ex2", function(){
        const before = "...[CCC]...[CCCFC].....[CCC]....";
        const after = "...[CCC]...[...F.].....[CCC]....";
        Test.strictEqual(hungryFoxes(before), after);
    });

    it("ex3", function(){
        const before = "CCCCC...XCCCCCCCCC....FFF.X..CF";
        const after = "CCCCC...X.................X....";
        Test.strictEqual(hungryFoxes(before), after);
    });

    it("ex4", function(){
        const before = "...CC...X...[CCC]CCC[CCCXCCCF]CCCC[CFC]FCC";
        const after = "...CC...X...[CCC]...[CCCX....]....[.F.]...";
        Test.strictEqual(hungryFoxes(before), after);
    });


});