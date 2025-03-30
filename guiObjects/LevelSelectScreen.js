
let levelsUnlocked = 20;
let levelOn = 0;
class LevelSelectScreen extends GUI {
    constructor() {
        super();
        this.ResetLevels();
    }
    Draw(x, y) {
        background(200)
        super.Draw(x, y)
    }
    ResetLevels() {
        let levels = []
        // Level 1:
levels.push({ 
    items: [ConstantNode, OutputNode], 
    inputs: [], 
    instructions: "If you have x tigers and y lions, how many apples and oranges do you have?" 
});

// Level 2:
levels.push({ 
    items: [ConstantNode, InputNode, OutputNode], 
    inputs: ["X", "Y"], 
    instructions: "If you have x tigers and y lions, how many tigers and lions are there?" 
});

// Level 3 (Addition Unlocked):
levels.push({ 
    items: [ConstantNode, InputNode, AddNode, OutputNode], 
    inputs: ["X", "Y"], 
    instructions: "You put x tigers in each of y buckets. How many tigers are there in total?" 
});

// Level 4 (Multiplication Unlocked):
levels.push({ 
    items: [ConstantNode, InputNode, AddNode, MulNode, OutputNode], 
    inputs: ["X", "Y"], 
    instructions: "You have x tigers. Y are taken away from you. How many tigers do you have?" 
});

// Level 5 (Subtraction Unlocked):
levels.push({ 
    items: [ConstantNode, InputNode, AddNode, SubNode, OutputNode], 
    inputs: ["X", "Y"], 
    instructions: "You have x tigers. You put them into y buckets. Each bucket has the same number of tigers-- any leftover tigers are put away. How many tigers are in each bucket?" 
});

// Level 6 (Division Unlocked):
levels.push({ 
    items: [ConstantNode, InputNode, AddNode, SubNode, DivNode, OutputNode], 
    inputs: ["X", "Y"], 
    instructions: "A tiger has n stripes. Each stripe could be k colors. How many possible stripe patterns could this tiger have?" 
});

// Level 7 (Exponentiation Unlocked):
levels.push({ 
    items: [ConstantNode, InputNode, AddNode, SubNode, DivNode, ExpNode, OutputNode], 
    inputs: ["N", "K"], 
    instructions: "A tiger has n stripes. Each stripe could be k colors. How many possible stripe patterns could this tiger have?" 
});

// Level 8 (Modulus Unlocked):
levels.push({ 
    items: [ConstantNode, InputNode, AddNode, SubNode, DivNode, ModNode, OutputNode], 
    inputs: ["X", "Y"], 
    instructions: "You have x tigers. You put them into y buckets. Each bucket has the same number of tigers-- any leftover tigers are put away. How many tigers are left over?" 
});

// Level 9 (Factorial Unlocked):
levels.push({ 
    items: [ConstantNode, InputNode, FactorialNode, OutputNode], 
    inputs: ["N"], 
    instructions: "How many ways can you order n unique tigers?" 
});

// Level 10 (Combinations and Permutations Unlocked):
levels.push({ 
    items: [ConstantNode, InputNode, FactorialNode, DivNode, OutputNode], 
    inputs: ["N", "K"], 
    instructions: "There's a pen of n tigers. How many groups of tigers of size k can you make?" 
});

levels.push({ 
    items: [ConstantNode, InputNode, FactorialNode, DivNode, OutputNode], 
    inputs: ["N", "K"], 
    instructions: "There's a pen of n tigers. You choose a group of tigers of size k. How many different ways can you line them up?" 
});

 


        this.elements = []
        for (let i = 0; i < 15; i++) {
            if (levelsUnlocked > i) {
                let lvl = i;
                this.elements.push(new LevelButton(75 + 100 * (i % 5), 150 + 80 * floor(i / 5), 60, 60, (i + 1).toString(),
                    function () {
                        screenOn = "editor";
                        levelOn = lvl+1;
                        screens.editor.Reset(levels[lvl].items, levels[lvl].inputs, levels[lvl].instructions)
                    }
                ))
            }
        }
    }
}