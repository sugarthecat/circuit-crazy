
let levelsUnlocked = 20;
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
        this.elements = []
        for (let i = 0; i < 15; i++) {
            if (levelsUnlocked > i) {
                this.elements.push(new LevelButton(100 + 100 * (i % 5), 160 + 80 * floor(i / 5), 60, 60, (i+1).toString()))
            }
        }
    }
}