class EditorScreen extends GUI {
    constructor() {
        super();
        this.itemsAvailable = [ConstantNode, AddNode, DivNode, SubNode, MultNode, FactorialNode, InputNode, OutputNode]
        this.tableObjects = []
        this.inputs = []
        this.itemSelected = false;
        this.instructions = ""
        this.itemTypeSelected = '';
        this.tableXOffset = 0;
        this.tableYOffset = 0;
        this.menuYOffset = 0;
    }
    Reset(itemsAvailable = [ConstantNode], inputs = [], instructions = "") {
        this.itemsAvailable = itemsAvailable;
        this.inputs = inputs;
        this.instructions = instructions;
        this.tableObjects = []
        this.tableXOffset = 0;
        this.tableYOffset = 0;
        this.menuYOffset = 0;
    }
    Draw(x, y) {
        //deselect item if let go
        this.UpdateItemSelection(x, y);
        //draw background
        push()

        background(241, 234, 210)
        for (let i = -OFFSET.x + (frameCount / 10 % 50); i < 800 + OFFSET.x; i += 50) {
            stroke(230, 222, 194)
            strokeWeight(25)
            line(i, -OFFSET.y, i - 200, 400 + OFFSET.y)
        }
        pop()
        push()
        translate(this.tableXOffset, this.tableYOffset)
        for (let i = 0; i < this.tableObjects.length; i++) {
            this.tableObjects[i].DrawCircuitLayer1();
        }
        for (let i = 0; i < this.tableObjects.length; i++) {
            this.tableObjects[i].DrawCircuitLayer2();
        }
        fill(195, 66, 59)
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
        //rect(400, -OFFSET.y, 10, OFFSET.y * 2 + 400)
        fill(214, 207, 180)
        rect(410, -OFFSET.y, 290 + OFFSET.x, OFFSET.y * 2 + 400)
        //draw menu
        push()
        translate(0, this.menuYOffset)
        let vertOffset = 20 - OFFSET.y
        for (let i = 0; i < this.itemsAvailable.length; i++) {
            this.itemsAvailable[i].DrawSymbol((405 + 600 + OFFSET.x - this.itemsAvailable[i].getWidth()) / 2, vertOffset)
            vertOffset += this.itemsAvailable[i].getHeight() * 1.2;
        }
        pop()
        this.DrawSelectedItem(x, y);
        this.DrawLabels(x, y);
        push()
        fill(0)
        textSize(20)
        textAlign(CENTER)
        text(this.instructions, 20 - OFFSET.x, 25 - OFFSET.y, 360 + OFFSET.x, 100)
        pop()
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
    EvaluateForInput(inputArr) {
        let updating = true;
        let discoveredValues = [];
        let undiscoveredValues = []
        for (let i = 0; i < this.tableObjects.length; i++) {
            if (this.tableObjects[i] instanceof InputNode) {
                discoveredValues.push([this.tableObjects[i], inputArr]);
            } else {
                undiscoveredValues.push(this.tableObjects[i])
            }
        }
        while (updating) {
            updating = false;
            for (let i = 0; i < undiscoveredValues.length; i++) {
                if (undiscoveredValues[i].CanEvaluate(discoveredValues)) {
                    if (undiscoveredValues[i] instanceof OutputNode) {
                        return { complete: true, output: undiscoveredValues[i].Evaluate(discoveredValues)[0] }
                    }
                    discoveredValues.push([undiscoveredValues[i], undiscoveredValues[i].Evaluate(discoveredValues)])
                    undiscoveredValues.splice(i, 1)
                    i--;
                    updating = true;
                }
            }
        }
        return { complete: false, output: 0 }
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
            } else if (this.itemTypeSelected == "menu") {
                this.menuYOffset += y - this.itemSelected.y
                this.itemSelected.y = y;
                let vertOffset = 20 - OFFSET.y
                for (let i = 0; i < this.itemsAvailable.length; i++) {
                    vertOffset += this.itemsAvailable[i].getHeight() * 1.2;
                }
                this.menuYOffset = constrain(this.menuYOffset, min(0, 400 - OFFSET.y * 2 - vertOffset), 0)
            } else if (this.itemTypeSelected == "inputNode") {
                push()
                stroke(195, 66, 59)
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
                stroke(195, 66, 59)
                strokeWeight(8)
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
                    if (this.itemSelected == OutputNode) {
                        for (let i = 0; i < this.tableObjects.length; i++) {
                            if (this.tableObjects[i] instanceof OutputNode) {
                                this.tableObjects[i].isDead = true;
                                this.tableObjects.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    this.tableObjects.push(new this.itemSelected(x - this.tableXOffset, y - this.tableYOffset))
                    if (this.itemSelected == InputNode) {
                        this.tableObjects[this.tableObjects.length - 1].outputs = this.inputs;
                    }

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
                if (mouseInRange(
                    (405 + 600 + OFFSET.x - this.itemsAvailable[i].getWidth()) / 2,
                    vertOffset + this.menuYOffset,
                    this.itemsAvailable[i].getWidth(),
                    this.itemsAvailable[i].getHeight())) {
                    this.itemSelected = this.itemsAvailable[i];
                    this.itemTypeSelected = "blueprint";
                    return;
                }
                vertOffset += this.itemsAvailable[i].getHeight() * 1.2;
            }
            //or the menu back
            if (this.itemSelected == false) {
                this.itemTypeSelected = "menu"
                this.itemSelected = { y: y }
            }
        }
    }
    HandleClick(x, y) {
        super.HandleClick(x, y)
    }
}