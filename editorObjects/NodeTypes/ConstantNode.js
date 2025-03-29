class ConstantNode extends EditorNode {
    constructor(x, y) {
        super(x, y, 100, 100, Assets.ham, [], ["Constant output"]);
    }
    static getSymbol(){
        return Assets.ham;
    }
    static getWidth(){
        return 100;
    }
    static getHeight(){
        return 100;
    }
}