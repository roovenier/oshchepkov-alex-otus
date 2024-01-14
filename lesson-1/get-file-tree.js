const fs = require('fs');
const path = require('path');

async function getFileTree(filePath, depth, level = 0) {
    const files = await fs.promises.readdir(filePath, { withFileTypes: true });

    for (const [index, file] of files.entries()) {
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
            await getFileTree(pathValue, depth, level + 1);
        }
    }
}

module.exports = {
    getFileTree,
}
