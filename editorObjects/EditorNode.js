class EditorNode {
    constructor(x, y,width, height, symbol, inputs, outputs, ) {
        this.inputs = inputs;
        this.outputs = outputs;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = symbol;
    }
    MoveTo(x, y) {
        this.x = x;
        this.y = y;
    }
    DrawLabels(x, y) {

    }
    Draw() {
        image(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
    }
    static getSymbol(){
        return Assets.ham;
    }
    static DrawSymbol(x, y) {
        push()
        image(this.getSymbol(), x, y, this.getWidth(), this.getHeight())
        pop()
    }
}