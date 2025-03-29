class GameScreen extends GUI {
    constructor() {
        super();
    }
    Draw(x,y){
        background(255)
        super.Draw(x,y)
        fill (255,0,0)
        rect(10,10,SCREEN_DIMENSIONS.x-20,SCREEN_DIMENSIONS.y-20)
    }
}