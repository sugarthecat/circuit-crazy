
let levelsUnlocked = 1;
let levelOn = 0;
class LevelSelectScreen extends GUI {
    constructor() {
        super();
        this.ResetLevels();
        this.elements.push(new Button(585, 15, 60, 30, "⇦", function () { screenOn = "title"; }))
    }
    Draw(x, y) {
        background(214, 207, 180)
        super.Draw(x, y)
    }
    ResetLevels() {
        let levels = []
        //Level 1: count 0
        levels.push({ items: [ConstantNode, OutputNode], inputs: [], instructions: "If you have x tigers and y lions, how many apples do you have?" })

        //Level 2: count tigers
        levels.push({ items: [ConstantNode, InputNode, OutputNode], inputs: ["X"], instructions: "If you have x tigers, how many tigers do you have?" })

        //Level 3: Add tigers
        levels.push({ items: [ConstantNode, InputNode, AddNode, OutputNode], inputs: ["X", "Y"], instructions: "If you have x tigers in one enclosure, y in the other, and 3 roaming the zoo, how many tigers do you have?" })

        // level 4: Divide tigers
        levels.push({ items: [ConstantNode, InputNode, SubNode, AddNode, MultNode, OutputNode], inputs: ["X", "Y"], instructions: "You put x tigers in each of y buckets. How many tigers are there in total?" })

        // level 5: Mod tigers 
        levels.push({ items: [ConstantNode, InputNode, AddNode, MultNode, OutputNode], inputs: ["X", "Y"], instructions: "You have x tigers. You put them into y buckets. Each bucket has the same number of tigers-- any leftover tigers are put away. How many tigers are left over?" })

        // level 6: choose
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, FactorialNode, OutputNode], inputs: ["X", "Y"], instructions: "There are X tigers. You need to form a group of Y tigers for a hackathon. How many unique groups of tigers can you make?" })

        // level 7: permutations
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, FactorialNode, ChooseNode, OutputNode], inputs: ["N", "K"], instructions: "A tiger has n stripes. Each stripe could be k colors. How many possible stripe patterns could this tiger have?" })

        // level 8: circular permutation
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, FactorialNode, ChooseNode, OutputNode], inputs: ["N"], instructions: "How many ways can you arrange n unique tigers in a circle?" })

        //level 9: 2 heads, coin flip
        levels.push({ items: [ConstantNode, AddNode, SubNode, MultNode, DivNode, FactorialNode, ChooseNode, OutputNode], inputs: [""], instructions: "You have a fair tiger-shaped coin. What're the chances that you get two heads in a row, if you toss the coin twice?" })

        // level 10: n coins 
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, FactorialNode, ChooseNode, OutputNode], inputs: ["N"], instructions: "You have a fair tiger-shaped coin. What're the chances that you get n heads in a row, if you toss the coin n times?" })

        // level 11: March Madness 
        levels.push({ items: [ConstantNode, AddNode, SubNode, MultNode, DivNode, FactorialNode, ChooseNode, OutputNode], inputs: [""], instructions: "What are the chances of the March Madness winning team being Tigers, assuming that every team has an equal chance of winning? (Hint: 68 teams compete in March madness. Assume 5 of them have tigers as their mascot)" })

        // level 12: birthdays
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, FactorialNode, ChooseNode, OutputNode], inputs: ["N"], instructions: "Find the probability that, in a set of n randomly chosen people, at least two will share the same birthday" })

        // level 13: stones
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, FactorialNode, ChooseNode, OutputNode], inputs: ["N"], instructions: "You are given n stones. One of them is much lighter than the others; the rest are of equal weight. Given a scale, how many weighings do you need to find the light stone?" })

        // level 14: odds & evens
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, FactorialNode, ChooseNode, OutputNode], inputs: ["N"], instructions: "Given an integer n, if n is even return n/2. If n is odd, return 3n + 1." })

        // level 15: and gate
        levels.push({ items: [ConstantNode, InputNode, AddNode, SubNode, MultNode, DivNode, FactorialNode, ChooseNode, OutputNode], inputs: ["X", "Y"], instructions: "Given two integers, x and y, that both can be either 0 or 1, recreate an 'AND' gate. (hint: an and gate returns 1 if and only if all its inputs are 1)" })

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