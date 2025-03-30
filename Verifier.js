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
        for (let j = 0; j < 12; j++) {
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
    let failCases = [];
    let succCases = [];
    for (let i = 0; i < data.length; i++) {
        let correctSolution = solSet.outputs(data[i]);
        let userSolution = screens.editor.EvaluateForInput(data[i]);
        if(!userSolution.complete){
            userSolution.output = 0;
        }
        if ( userSolution.output != correctSolution) {
            if (userSolution.complete) {
                failCases.push({ input: data[i], output: userSolution.output, correct: correctSolution })
            } else {
                failCases.push({ input: data[i], output: 0, correct: correctSolution })
            }
            isTrue = false;
        } else {
            succCases.push({ input: data[i], output: userSolution.output, correct: correctSolution })
        }
    }
    let successRate = succCases.length / data.length;
    let shownCases = []
    if (succCases.length > 0) {
        shownCases.push(succCases[0])
        succCases.shift()
    }
    while ((shownCases.length < 4 || (succCases.length == 0 && shownCases.length < 5)) && failCases.length > 0) {
        let rand = floor(random(failCases.length))
        shownCases.push(failCases[rand])
        failCases.splice(rand, 1);
    }
    while (shownCases.length < 5 && succCases.length > 0) {
        let rand = floor(random(succCases.length))
        shownCases.unshift(succCases[rand])
        succCases.splice(rand, 1);
    }
    return { success: isTrue, cases: shownCases, successRate: successRate }
}   