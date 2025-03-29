
let levelsUnlocked = 3;
class LevelSelectScreen extends GUI {
    constructor() {
        super();
    }
    Draw(x,y){
        background(255)
        super.Draw(x,y)
        fill (255,0,0)
        rect(0,0,400,600)
    }
    ResetLevels(){
        if(level >= 1){
            this.elements.push(new LevelButton(10,10,30,30,"1"),)
        }
        if(level >= 2){
            this.elements.push(new LevelButton(60,10,30,30,"2"),)

        }
    }
}