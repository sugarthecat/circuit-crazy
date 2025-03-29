function getNumberRange() {
    let cases = []
    for (let i = 0; i < 12; i++) {
        cases.push([i])
    }
    return cases;
}
function getDualNumberRange() {
    let cases = []
    for (let i = 0; i < 12; i++) {
        for (let j = i; j < 12; j++) {
            cases.push([j, i])
        }
    }
    return cases;
}
function VerifyCurrentSolution() {
    const correctSolutions = [
        { inputs: getNumberRange, outputs: function (input) { return 0; } },
        { inputs: getNumberRange, outputs: function (input) { return input[0]; } },
        { inputs: getDualNumberRange, outputs: function (input) { return input[0] + input[1] + 3; } },
    ]
    //verify current level
    let solSet = correctSolutions[levelOn - 1];
    let data = solSet.inputs();
    let isTrue = true;
    for (let i = 0; i < data.length; i++) {
        let correctSolution = solSet.outputs(data[i]);
        let userSolution = screens.editor.EvaluateForInput(data[i]);
        if(!userSolution.complete || userSolution.output != correctSolution){
            isTrue = false;
        }
    }
    return isTrue;
}