const { readFileSync } = require('fs');
const { inspect } = require('util');
const { argv, exit } = require('process');

const regexToDFA = require('./automata');

(() => {
    let alphabet, regexp;
    try {
        const [alp, regx] = readFileSync(argv[2], 'utf-8').split('\r\n');
        alphabet = new Set(alp);
        regexp = regx;

    } catch (err) {
        switch (err.code){
            case 'ERR_INVALID_ARG_TYPE':
                console.log('No file entered, usage is:\n node index.js file.txt');
                break;
            case 'ENOENT':
                console.log('The entered file is not found');
                break;
        }
        exit(1);

    }

    const graph = regexToDFA(alphabet, regexp);

    console.log(inspect(graph, false, null, true));
})();
