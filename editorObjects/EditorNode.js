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
        push ()
        //draw nodes
        stroke(0)
        strokeWeight(5)
        for(let i = 0; i<this.inputs.length; i++){
            line (this.x,this.y, this.x + (2*(1+ i) /(1 + this.inputs.length)-1) * this.width, this.y - this.height)
        }
        for(let i = 0; i<this.outputs.length; i++){
            line (this.x,this.y, this.x + (2*(1+ i) /(1 + this.outputs.length)-1) * this.width, this.y + this.height)
        }
        image(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
        pop ()
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