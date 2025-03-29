class GameScreen extends GUI {
    constructor() {
        super();
    }
    Draw(x,y){
        background(255)
        super.Draw(x,y)
        fill (255,0,0)
        rect(0,0,400,600)
    }
}