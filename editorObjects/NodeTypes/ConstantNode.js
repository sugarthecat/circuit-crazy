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
class ConstantNode2 extends EditorNode {
    constructor(x, y) {
        super(x, y, 100, 50, Assets.ham, ["Simple input"], ["Constant output"]);
    }
    static getSymbol(){
        return Assets.ham;
    }
    static getWidth(){
        return 100;
    }
    static getHeight(){
        return 50;
    }
}