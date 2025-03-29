class EditorScreen extends GUI{
    constructor() {
        super();
        this.itemsAvailable = [ConstantNode]
        this.tableObjects = []
        this.itemSelected = false;
        this.itemTypeSelected = '';
    }
    Reset(itemsAvailable = [ConstantNode]){
        this.itemsAvailable = itemsAvailable;
        this.tableObjects = []
    }
    Draw(x,y){
        //deselect item if let go
        if(this.itemSelected && !mouseIsPressed){
            if(this.itemTypeSelected == "blueprint"){
                if( x < 400){
                    this.tableObjects.push(new this.itemSelected(x,y))
                }
            }else if(this.itemTypeSelected == "instance"){
                //do nothing. win.
            }
            this.itemSelected = false;
        }
        background(220)

        for(let i = 0; i<this.tableObjects.length; i++){
            this.tableObjects[i].Draw();
        }

        fill (0)
        rect (400, -OFFSET.y, 10, OFFSET.y * 2 + 400)
        fill (100)
        rect (410, -OFFSET.y, 290 + OFFSET.x, OFFSET.y * 2 + 400)
        let menuSymbolSize = 100;
        for(let i = 0; i<this.itemsAvailable.length; i++){
            this.itemsAvailable[i].DrawSymbol(450,i * (20 + menuSymbolSize) + 50, menuSymbolSize)
        }
        //
        if(this.itemSelected){
            if(this.itemTypeSelected == "blueprint"){
                this.itemSelected.DrawSymbol(x-50,y-50,100)
            }else if(this.itemTypeSelected == "instance"){
                this.itemSelected.x = x ;
                this.itemSelected.y = y ;
            }
        }
        fill (0)
    }
    mousePressed(x,y){
        if(x < 400){
            //select heavy object
            for(let i = 0; i<this.tableObjects.length; i++){
                let node = this.tableObjects[i]
                if(mouseInRange(node.x - node.width / 2, node.y - node.height / 2, node.width, node.height)){
                    this.itemSelected = node;
                    this.itemTypeSelected = "instance"
                }
            }
            //or wire
            //or the ground 
        }else if(x > 410){
            //select "menu" object
            for(let i = 0; i<this.itemsAvailable.length; i++){
                if(mouseInRange(450,i * (20 + 100) + 50),100,100){
                    this.itemSelected = this.itemsAvailable[i];
                    this.itemTypeSelected = "blueprint";
                }
            }
            //or the menu back
        }
    }
    HandleClick(x,y){
        super.HandleClick(x,y)
    }
}