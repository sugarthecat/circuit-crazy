
let levelsUnlocked = 20;
let levelOn = 0;
class LevelSelectScreen extends GUI {
    constructor() {
        super();
        this.ResetLevels();
        this.elements.push(new Button(585, 15, 60, 30, "⇦", function () { screenOn = "title"; }))
    }
    Draw(x, y) {
        background(200)
        super.Draw(x, y)
    }
    ResetLevels() {
        let levels = []
        //Level 1:
        levels.push({ items: [ConstantNode, OutputNode], inputs: [], instructions: "If you have x tigers and y lions, how many apples do you have?" })

        //Level 2:
        levels.push({ items: [ConstantNode, InputNode, OutputNode], inputs: ["X"], instructions: "If you have x tigers, how many tigers do you have?" })

        //Level 3:
        levels.push({ items: [ConstantNode, InputNode, AddNode, OutputNode], inputs: ["X", "Y"], instructions: "If you have x tigers in one enclosure, y in the other, and 3 roaming the zoo, how many tigers do you have?" })

        // level 4: 
        levels.push({ items: [ConstantNode, InputNode, AddNode, MultNode, OutputNode], inputs: ["X", "Y"], instructions: "You put x tigers in each of y buckets. How many tigers are there in total?" })

        // level 5: division 
        levels.push({ items: [ConstantNode, InputNode, AddNode, MultNode, OutputNode], inputs: ["X", "Y"], instructions: "You put x tigers in each of y buckets. How many tigers are there in total?" })

        // level 6: choose
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, FactorialNode, MultNode, OutputNode], inputs: ["X", "Y"], instructions: "There are X tigers. You need to form a group of Y tigers for a hackathon. How many unique groups of tigers can you make?" })

        // level 7: permutations
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, FactorialNode, MultNode, OutputNode], inputs: ["N", "K"], instructions: "A tiger has n stripes. Each stripe could be k colors. How many possible stripe patterns could this tiger have?" })

        // level 8: circular permutation
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, FactorialNode, MultNode, OutputNode], inputs: ["N"], instructions: "How many ways can you arrange n unique tigers in a circle?" })


        this.elements = []
        for (let i = 0; i < 15; i++) {
            if (levelsUnlocked > i) {
                let lvl = i;
                this.elements.push(new LevelButton(75 + 100 * (i % 5), 150 + 80 * floor(i / 5), 60, 60, (i + 1).toString(),
                    function () {
                        screenOn = "editor";
                        levelOn = lvl + 1;
                        screens.editor.Reset(levels[lvl].items, levels[lvl].inputs, levels[lvl].instructions)
                    }
                ))
            }
        }
    }
}