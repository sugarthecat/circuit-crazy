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
function getDualNumberRangeDecreasing() {
    let cases = []
    for (let i = 0; i < 12; i++) {
        for (let j = i; j < 12; j++) {
            cases.push([j, i])
        }
    }
    return cases;
}
function getDuoProblemDomain() {
    let cases = []
    for (let i = 3; i < 10; i++) {
        for (let j = 2; j < 40; j++) {
            if ((j % i) % 2 == 0) {
                cases.push([j, i])
            }
        }
    }
    return cases;
}

function VerifyCurrentSolution() {
    const correctSolutions = [
        //count 0
        { inputs: getNumberRange, outputs: function (input) { return 0; } },
        //input to output
        { inputs: getNumberRange, outputs: function (input) { return input[0]; } },
        //
        { inputs: getDualNumberRange, outputs: function (input) { return input[0] + input[1] + 3; } },
        { inputs: getDualNumberRange, outputs: function (input) { return input[0] * (input[1] + 1); } },
        { inputs: getDuoProblemDomain, outputs: function (input) { return (input[0] % input[1]) / 2; } },
        {
            inputs: getDualNumberRangeDecreasing, outputs: function (input) {
                let prod = 1;
                let fac = input[1]
                for (let i = 1; i <= input[1]; i++) {
                    prod *= input[0] - i + 1;
                    prod /= i;
                }
                return prod;
            }
        },
    ]
    //verify current level
    let solSet = correctSolutions[levelOn - 1];
    let data = solSet.inputs();
    let isTrue = true;
    let failCases = [];
    let succCases = [];
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        let correctSolution = solSet.outputs(data[i]);
        let userSolution = screens.editor.EvaluateForInput(data[i]);
        if (!userSolution.complete) {
            userSolution.output = 0;
        }
        if (userSolution.output != correctSolution) {
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