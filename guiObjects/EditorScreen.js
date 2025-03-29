class EditorScreen extends GUI {
    constructor() {
        super();
        this.itemsAvailable = [ConstantNode, AddNode, DivNode, SubNode, InputNode, OutputNode]
        this.tableObjects = []
        this.itemSelected = false;
        this.itemTypeSelected = '';
        this.tableXOffset = 0;
        this.tableYOffset = 0;
    }
    Reset(itemsAvailable = [ConstantNode]) {
        this.itemsAvailable = itemsAvailable;
        this.tableObjects = []
        this.tableXOffset = 0;
        this.tableYOffset = 0;
    }
    Draw(x, y) {
        //deselect item if let go
        this.UpdateItemSelection(x, y);
        //draw background
        background(125)
        push()
        for (let i = -OFFSET.x + (frameCount / 10 % 50); i < 650 + OFFSET.x; i += 50) {
            stroke(50, 140, 180)
            strokeWeight(15)
            line(i, -OFFSET.y, i - 50, 400 + OFFSET.y)
            stroke(80, 200, 230)
            strokeWeight(5)
            line(i, -OFFSET.y, i - 50, 400 + OFFSET.y)
        }
        pop()
        push()
        translate(this.tableXOffset, this.tableYOffset)
        for (let i = 0; i < this.tableObjects.length; i++) {
            this.tableObjects[i].DrawCircuit();
        }
        for (let i = 0; i < this.tableObjects.length; i++) {
            this.tableObjects[i].Draw();
            if ((this.itemTypeSelected == "outputNode" && this.itemSelected) || !this.itemSelected) {
                for (let j = 0; j < this.tableObjects[i].inputs.length; j++) {
                    let pos = this.tableObjects[i].GetInputPosition(j);
                    if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 50) {
                        circle(pos.x, pos.y, 15)
                    }
                }
            }
            if ((this.itemTypeSelected == "inputNode" && this.itemSelected) || !this.itemSelected) {
                for (let j = 0; j < this.tableObjects[i].outputs.length; j++) {
                    let pos = this.tableObjects[i].GetOutputPosition(j);
                    if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 50) {
                        circle(pos.x, pos.y, 15)
                    }

                }
            }
        }
        pop()

        fill(0)
        rect(400, -OFFSET.y, 10, OFFSET.y * 2 + 400)
        fill(100)
        rect(410, -OFFSET.y, 290 + OFFSET.x, OFFSET.y * 2 + 400)
        //draw menu
        let vertOffset = 20 - OFFSET.y
        for (let i = 0; i < this.itemsAvailable.length; i++) {
            this.itemsAvailable[i].DrawSymbol((405 + 600 + OFFSET.x - this.itemsAvailable[i].getWidth()) / 2, vertOffset)
            vertOffset += this.itemsAvailable[i].getHeight() * 1.2;
        }
        this.DrawSelectedItem(x, y);
        this.DrawLabels(x, y);
    }
    DrawLabels(x, y) {
        push()
        translate(this.tableXOffset, this.tableYOffset)
        for (let i = 0; i < this.tableObjects.length; i++) {
            if ((this.itemTypeSelected == "outputNode" && this.itemSelected) || !this.itemSelected) {
                for (let j = 0; j < this.tableObjects[i].inputs.length; j++) {
                    let pos = this.tableObjects[i].GetInputPosition(j);
                    if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 15) {
                        this.tableObjects[i].DrawInputLabel(j)
                    }
                }
            }
            if ((this.itemTypeSelected == "inputNode" && this.itemSelected) || !this.itemSelected) {
                for (let j = 0; j < this.tableObjects[i].outputs.length; j++) {
                    let pos = this.tableObjects[i].GetOutputPosition(j);
                    if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 15) {
                        this.tableObjects[i].DrawOutputLabel(j)
                    }

                }
            }
        }
        pop()
    }
    DrawSelectedItem(x, y) {

        //Draw selected item
        if (this.itemSelected) {
            if (this.itemTypeSelected == "blueprint") {
                this.itemSelected.DrawSymbol(x - this.itemSelected.getWidth() / 2, y - this.itemSelected.getHeight() / 2)
            } else if (this.itemTypeSelected == "instance") {
                this.itemSelected.x = x - this.tableXOffset;
                this.itemSelected.y = y - this.tableYOffset;
            } else if (this.itemTypeSelected == "table") {
                this.tableXOffset += x - this.itemSelected.x
                this.tableYOffset += y - this.itemSelected.y
                this.itemSelected.x = x;
                this.itemSelected.y = y;
            } else if (this.itemTypeSelected == "inputNode") {
                push()
                stroke(0)
                strokeWeight(5)
                line(
                    this.itemSelected.obj.GetInputPosition(this.itemSelected.idx).x + this.tableXOffset,
                    this.itemSelected.obj.GetInputPosition(this.itemSelected.idx).y + this.tableYOffset,
                    x,
                    min(y, this.itemSelected.obj.GetInputPosition(this.itemSelected.idx).y + this.tableYOffset)
                )
                pop()
            } else if (this.itemTypeSelected == "outputNode") {
                push()
                stroke(0)
                strokeWeight(5)
                line(
                    this.itemSelected.obj.GetOutputPosition(this.itemSelected.idx).x + this.tableXOffset,
                    this.itemSelected.obj.GetOutputPosition(this.itemSelected.idx).y + this.tableYOffset,
                    x,
                    max(y, this.itemSelected.obj.GetOutputPosition(this.itemSelected.idx).y + this.tableYOffset)
                )
                pop()
            }
        }
    }
    UpdateItemSelection(x, y) {

        if (this.itemSelected && !mouseIsPressed) {
            if (this.itemTypeSelected == "blueprint") {
                if (x < 400) {
                    this.tableObjects.push(new this.itemSelected(x - this.tableXOffset, y - this.tableYOffset))
                }
            } else if (this.itemTypeSelected == "instance") {
                if (x > 400) {
                    //delete node
                    this.itemSelected.isDead = true;
                    this.tableObjects.splice(this.tableObjects.indexOf(this.itemSelected), 1);

                }
            } else if (this.itemTypeSelected == "inputNode") {

                for (let i = 0; i < this.tableObjects.length; i++) {
                    for (let j = 0; j < this.tableObjects[i].outputs.length; j++) {
                        let pos = this.tableObjects[i].GetOutputPosition(j);
                        if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 15
                        ) {
                            this.itemSelected.obj.ConnectInputToOutput(this.itemSelected.idx, this.tableObjects[i], j);

                        }

                    }
                }
            } else if (this.itemTypeSelected == "outputNode") {

                for (let i = 0; i < this.tableObjects.length; i++) {
                    for (let j = 0; j < this.tableObjects[i].inputs.length; j++) {
                        let pos = this.tableObjects[i].GetInputPosition(j);
                        if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 15
                        ) {

                            this.tableObjects[i].ConnectInputToOutput(j, this.itemSelected.obj, this.itemSelected.idx);

                        }

                    }
                }
            }
            this.itemSelected = false;
        }

    }
    mousePressed(x, y) {
        if (x < 400) {
            //select heavy object
            for (let i = 0; i < this.tableObjects.length; i++) {
                let node = this.tableObjects[i]
                if (mouseInRange(node.x - node.width / 2 + this.tableXOffset,
                    node.y - node.height / 2 + this.tableYOffset,
                    node.width,
                    node.height)) {
                    if (!node.hasInteraction(x - this.tableXOffset - node.x,
                        y - this.tableYOffset - node.y)) {
                        this.itemSelected = node;
                        this.itemTypeSelected = "instance"
                    }
                    return
                }
            }
            //or wire
            for (let i = 0; i < this.tableObjects.length; i++) {
                for (let j = 0; j < this.tableObjects[i].inputs.length; j++) {
                    let pos = this.tableObjects[i].GetInputPosition(j);
                    if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 15) {
                        this.tableObjects[i].ClearInputNode(j)
                        this.itemTypeSelected = "inputNode"
                        this.itemSelected = { obj: this.tableObjects[i], idx: j }
                        return;
                    }
                }
                for (let j = 0; j < this.tableObjects[i].outputs.length; j++) {
                    let pos = this.tableObjects[i].GetOutputPosition(j);

                    if (dist(pos.x, pos.y, x - this.tableXOffset, y - this.tableYOffset) < 15) {
                        this.itemTypeSelected = "outputNode"
                        this.itemSelected = { obj: this.tableObjects[i], idx: j }
                        return;
                    }
                }
            }
            //or the ground 
            if (this.itemSelected == false) {
                this.itemTypeSelected = "table"
                this.itemSelected = { x: x, y: y }
            }
        } else if (x > 410) {
            //select "menu" object
            let vertOffset = 20 - OFFSET.y
            for (let i = 0; i < this.itemsAvailable.length; i++) {
                if (mouseInRange((405 + 600 + OFFSET.x - this.itemsAvailable[i].getWidth()) / 2, vertOffset, this.itemsAvailable[i].getWidth(), this.itemsAvailable[i].getHeight())) {
                    this.itemSelected = this.itemsAvailable[i];
                    this.itemTypeSelected = "blueprint";
                    return;
                }
                vertOffset += this.itemsAvailable[i].getHeight() * 1.2;
            }
            //or the menu back
        }
    }
    HandleClick(x, y) {
        super.HandleClick(x, y)
    }
}