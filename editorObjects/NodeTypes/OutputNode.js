class OutputNode extends EditorNode {

    constructor(x, y) {
        super(x, y, 80, 40, Assets.outputNode, ["Output"], []);
    }
    static getSymbol() {
        return Assets.outputNode;
    }
    static getWidth() {
        return 80;
    }
    static getHeight() {
        return 40;
    }
    getFunction(){
        return ( (inputs)=> {
            return [inputs[0]]
        })
    }
}