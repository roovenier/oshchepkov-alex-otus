
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program
  .requiredOption('-p, --path <string>')
  .option('-d, --depth <number>');

program.parse();

const optionArgs = program.opts();

const DEFAULT_DEPTH = 4;

function main(directory, depth = DEFAULT_DEPTH) {
    function getFileTree(filePath, level = 0) {
        const files = fs.readdirSync(filePath, { withFileTypes: true });
        files.forEach((file, index) => {
            // Получаем символ отступа в зависимости от вложенности
            let indentSymbol = '';
            for(let i = 0; i < level; i++) {
                indentSymbol += '│ ';
            }
    
            // Символ перед именем файла.
            // Различается для конечного файла в директории
            const typeSymbol = index === files.length - 1 ? '└──' : '├──';
    
            console.log(`${indentSymbol}${typeSymbol} ${file.name}`);
    
            // Рекурсивно вызываем функцию, если это директория
            if(file.isDirectory() && level < (depth - 1)) {
                const pathValue = path.join(filePath, file.name);
                getFileTree(pathValue, level + 1);
            }
        });
    }
    
    getFileTree(directory);
}

main(optionArgs.path, optionArgs.depth)
