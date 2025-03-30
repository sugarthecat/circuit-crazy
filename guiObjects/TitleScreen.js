
class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(100, 250, 400, 50, "START", function () { screenOn = "levelselect"; })]
    }
    Draw(x, y) {
        background(214, 207, 180)
        fill(214, 207, 180)
        rect(0, 0, 600, 400)
        super.Draw(x, y)
    }
}