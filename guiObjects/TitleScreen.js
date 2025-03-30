
class TitleScreen extends GUI {
    constructor() {
        super();
        this.elements = [new Button(100, 200, 400, 50, "Start", function () { screenOn = "levelselect"; })]
    }
    Draw(x, y) {
        background(255)
        fill(214, 207, 180)
        rect(0, 0, 600, 400)
        super.Draw(x, y)
    }
}