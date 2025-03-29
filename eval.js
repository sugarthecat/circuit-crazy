//let answers = [ ][ ]; should this be a 3-D array? 
//combination function implementation
function eval(unevaluatedNodes = []){
    evaluated = []
        while(unevaluatedNodes.length != 0) { // keep looping through the array until all nodes are evaluted
            for (let k = 0; k < unevaluatedNodes.length; k++) { // loop through unevaluated nodes
                unevaluated_depenencies_flag = false
                node = unevaluatedNodes[k]
                dependencies = node.dependencies
                // if the current node's dependencies are unevaluated, skip that node
                for (let dependency of dependencies) {
                    if (unevaluatedNodes.includes(dependency)) {
                        unevaluated_depenencies_flag = true
                         break;
                    }
                }
                if (unevaluated_depenencies_flag) { 
                        continue
                }
                // evalute the node, and make necessary adjustments to arrays
                node.evaluate()
                unevaluatedNodes.splice(k, 1)
                evaluated.push(node)
                k--
                if (unevaluatedNodes.length === evaluated.length) {
                    return (evaluated[evaluated.length - 1]).evaluate() == answer; 
                } 
            }
        }
    }
}
