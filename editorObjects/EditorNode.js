class EditorNode{
    constructor(symbol, inputs, outputs){
        this.symbol = symbol;
        this.inputs = inputs;
        this.outputs = outputs;
        this.x = 0;
        this.y = 0;
    }
    MoveTo(x,y){
        this.x = x;
        this.y = y;
    }
    
}