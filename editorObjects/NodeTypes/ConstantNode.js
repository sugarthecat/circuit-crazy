class ConstantNode extends EditorNode{
    static image = "ham"
    static inputNodes = 0;
    static outputNodes = 1;
    constructor(x,y){
        super(x,y,[],["Constant output"]);
    }
}