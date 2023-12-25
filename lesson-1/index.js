
const { program } = require('commander');
const { getFileTree } = require('./get-file-tree');

program
  .requiredOption('-p, --path <string>')
  .option('-d, --depth <number>');

program.parse();

const optionArgs = program.opts();

const DEFAULT_DEPTH = 4;

function main(directory, depth = DEFAULT_DEPTH) {    
    getFileTree(directory, depth);
}

main(optionArgs.path, optionArgs.depth)
