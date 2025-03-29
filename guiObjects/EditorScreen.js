class EditorScreen extends GUI{
    constructor() {
        super();
        this.itemsAvailable = []
        this.tableObjects = []
        this.itemSelected = false;
    }
    Reset(itemsAvailable = []){
        this.itemsAvailable = [];
        this.tableObjects = []
    }
    Draw(x,y){
        background(220)
        fill (0)
        rect (400, -OFFSET.y, 10, OFFSET.y * 2 + 400)

        //draw "table" objects

        fill (100)
        rect (410, -OFFSET.y, 290 + OFFSET.x, OFFSET.y * 2 + 400)

        for(let i = 0; i<this.itemsAvailable.length; i++){
            //draw "menu" object
        }
    }
    mousePressed(x,y){
        if(x < 400){
            //select "table" object
            //or the ground 
        }else if(x > 410){
            //select "menu" object
            //or the menu back
        }
    }
    HandleClick(x,y){
        super.HandleClick(x,y)
    }
}