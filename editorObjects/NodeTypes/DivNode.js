class DivNode extends EditorNode {
    constructor(x, y) {
        super(x, y, 50, 50, Assets.divNode, ["Dividend", "Divisor"], ["Quotient","Remainder"]);
    }
    static getSymbol(){
        return Assets.divNode;
    }
    static getWidth(){
        return 50;
    }
    static getHeight(){
        return 50;
    }
    getFunction(){
        return ( (inputs)=> {
            return [(inputs[0] - inputs[0] % inputs[1]) / inputs[1], inputs[0] % inputs[1]]
        })
    }
}