class node{
    /**
     * @param {number} vertex 
     * @param {node} next 
     */
    constructor(vertex, next){
        this.vertex = vertex
        this.next = next;
    }
}
class graph{
    /**
     * @param {number} vertex 
     * @param {node} next 
     */
    constructor(vertex, next){
        this.vertex = vertex
        this.next = next;
    }
}

class Pair {
    constructor(first, second){
        this[0] = first;
        this[1] = second;
    }
}

const alphabet = new Set('ab');
const uOperators = new Set('*+');
const oOperators = new Set('()|.');
const expression = '(a|b)*abb';

/**
 * @param {String} expr 
 */
const transformExpression = (expr) => {
    let transformed = '';
    for(let i = 0; i < expr.length; i++){
        const ele = expr[i];
        const nel = expr[i+1]
        transformed += ele;
        if((alphabet.has(ele) || uOperators.has(ele)) && !oOperators.has(nel)){
            transformed += '.';
        }
    }
    return transformed;
}

/**
 * @param {String} expr 
 */
const createGraph = (expr) => {
    const exp = transformExpression(expr);
    const operatorQueue = new Array();
    const operandQueue = new Array();

    for(let i = 0; i < expr.length; i++){
        const ele = expr[i];
        
    }
}

// createGraph(expression)

const adjacencyList = new Map();

adjacencyList.set('hola', new Pair());

console.log(adjacencyList);

