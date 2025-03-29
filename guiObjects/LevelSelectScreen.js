
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
        //Level 1:
        levels.push({ items: [ConstantNode, OutputNode], inputs: [], instructions: "If you have x tigers and y lions, how many apples do you have?" })

        //Level 2:
        levels.push({ items: [ConstantNode, InputNode, OutputNode], inputs: ["X"], instructions: "If you have x tigers, how many tigers do you have?" })

        //Level 3:
        levels.push({ items: [ConstantNode, InputNode, AddNode, OutputNode], inputs: ["X", "Y"], instructions: "If you have x tigers in one enclosure, y in the other, and 3 roaming the zoo, how many tigers do you have?" })

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