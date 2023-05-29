const Graph = require('./graph');
const operatorSet = new Set('*+.|');
const priority = {
    '*': 5,
    '+': 4,
    '.': 3,
    '|': 2,
    '(': 1,
    ')': 0,
}

/**
 * @param {String} expr 
 * @param {Set} alphabet
 */
const concatExpr = (expr, alphabet) => {
    const unary = new Set('*+');
    let transformed = '';
    for(let i = 0; i < expr.length; i++){
        const ele = expr[i];
        const nel = expr[i+1]
        transformed += ele;
        if((alphabet.has(ele) || unary.has(ele) || ele === ')') && 
            (alphabet.has(nel) || nel === '(')){
            transformed += '.';
        }
    }
    return transformed;
}

/**
 * @param {[Graph]} operands 
 * @param {[String]} operators
 */
const operateQueues = (operands, operators) => {
    let fir, sec;
    switch (operators.pop()) {
        case '*':
            fir = operands.pop();
            operands.push(fir.times());
            break;
        case '+':
            fir = operands.pop();
            operands.push(fir.plus());
            break;
        case '.':
            sec = operands.pop();
            fir = operands.pop();
            operands.push(fir.concat(sec));
            break;
        case '|':
            sec = operands.pop();
            fir = operands.pop();
            operands.push(fir.or(sec));
            break;
    }
}

/**
 * 
 * @param {String} alphabet 
 * @param {Set} regexp 
 * @returns {Graph}
 */
const regexToDFA = (alphabet, regexp) => {
    regexp = concatExpr(regexp, alphabet).split('');

    const operators = new Array();
    const operands = new Array();

    regexp.forEach(char => {
        if(alphabet.has(char)){
            operands.push(Graph.newSimpleAutomata(char));
        } else if(char === 'ε') {
            operands.push(Graph.newSimpleAutomata(null));
        } else if(char === '('){
            operators.push(char);
        } else if(operatorSet.has(char)){
            if(operators.length === 0) {
                operators.push(char)
            } else {
                if(priority[char] > priority[operators[operators.length -1]]){
                    operators.push(char);
                } else {
                    operateQueues(operands, operators);
                    operators.push(char);
                }
            }
        } else if(char === ')') {
            while(operators[operators.length - 1] !== '(') {
                operateQueues(operands, operators);
            }
            operators.pop();
        }
    });

    while(operators.length !== 0) {
        operateQueues(operands, operators);
    }

    return operands.pop();
}

module.exports = regexToDFA;