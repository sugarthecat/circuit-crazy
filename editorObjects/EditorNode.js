class EditorNode {
    constructor(x, y, width, height, symbol, inputs, outputs,) {
        this.inputs = []
        for (let i = 0; i < inputs.length; i++) {
            this.inputs.push({ label: inputs[i], conn: false })
        }
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
    GetInputPosition(index) {
        return { x: this.x + (2 * (1 + index) / (1 + this.inputs.length) - 1) * this.width, y: this.y - this.height }
    }
    GetOutputPosition(index) {
        return { x: this.x + (2 * (1 + index) / (1 + this.outputs.length) - 1) * this.width, y: this.y + this.height }
    }
    Draw() {
        image(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
    }
    DrawCircuit() {
        push()
        //draw nodes
        stroke(0)
        strokeWeight(5)
        for (let i = 0; i < this.inputs.length; i++) {
            line(this.x, this.y, this.GetInputPosition(i).x, this.GetInputPosition(i).y)
            if (this.inputs[i].conn) {
                let pos = this.inputs[i].conn.node.GetOutputPosition(this.inputs[i].conn.idx)
                line(this.GetInputPosition(i).x, this.GetInputPosition(i).y,pos.x,pos.y)
            }
        }
        for (let i = 0; i < this.outputs.length; i++) {
            line(this.x, this.y, this.GetOutputPosition(i).x, this.GetOutputPosition(i).y)
        }
        pop()
    }
    ConnectInputToOutput(idx, other, otherIdx) {
        console.log(0)
        this.inputs[idx].conn = { node: other, idx: otherIdx }
    }
    static getSymbol() {
        return Assets.ham;
    }
    static DrawSymbol(x, y) {
        push()
        image(this.getSymbol(), x, y, this.getWidth(), this.getHeight())
        pop()
    }
}