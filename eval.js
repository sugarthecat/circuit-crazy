//let answers = [ ][ ];
//combination function implementation
function combination(){
for(let i = 0; i < n; i++){
    for(let k = 0; k < n; k++){
        unevaluatedNodes = Array.from({ length: n}, (_, i) => i + 1)
        evaluated = []
        while(len(unevaluatedNodes) != 0){
        if(unevaluatedNodes.includes(node)) {
            continue; 
        }else{
            node.evaluate()
            unevaluatedNodes.remove(node)
            evaluated.add(node)
        }
        if(length(unevaluated) == 0){
            evaluated(len(evaluated)).evaluate()
            return true; 
        }else{
            return false; 
        }
    }
}
}
}