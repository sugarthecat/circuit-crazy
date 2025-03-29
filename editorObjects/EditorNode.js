class EditorNode {
    static image = 'ham';
    constructor(x, y, inputs, outputs, nodeWidth = 100, nodeHeight = 100) {
        this.inputs = inputs;
        this.outputs = outputs;
        this.x = x;
        this.y = y;
        this.width = nodeWidth;
        this.height = nodeHeight
    }
    MoveTo(x, y) {
        this.x = x;
        this.y = y;
    }
    DrawLabels(x, y) {

    }
    Draw() {
        image(Assets.ham, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
    }
    static DrawSymbol(x, y, size) {
        push()
        image(Assets[this.image], x, y, size, size)
        pop()
    }
}