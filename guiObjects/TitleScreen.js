class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(100, 200, 400, 50, "Test", function(){screenOn = "levelselect";})]
    }
    Draw(x,y){
        background(255)
        fill (255,0,0)
        rect(0,0,600,400)
        super.Draw(x,y)
    }
}