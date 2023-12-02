
const fs = require('fs');
const path = require('path');

const directoryPath = process.argv[2];
const depthValue = process.argv[4];

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
                getFileTree(path.join(file.path, file.name), level + 1);
            }
        });
    }
    
    getFileTree(directory);
}

main(directoryPath, depthValue)
