const fs = require('fs');

const fileName = process.argv[2];

if(!fileName) {
    throw new Error('Please, provide file name');
}

const fileStream = fs.createReadStream(fileName, {
    highWaterMark: 10,
});

const resultObj = {};

let resultBuffer = [];

fileStream.on('data', (chunk) => {
    resultBuffer.push(chunk);
});

fileStream.on('end', () => {
    const resultString = Buffer.concat(resultBuffer).toString();

    // фильтруем строку от лишних знаков
    const chunkString = resultString.replaceAll(/,*\.*/g, '');

    // приводим строку к массиву
    const arr = chunkString.split('\n').join(' ').split(' ');

    // фильтруем массив, оставляя только текстовые символы
    const regexChar = new RegExp('[a-zA-Z]', 'g');
    const listOfChar = arr.filter((item) => item.match(regexChar));

    // сортируем массив по алфавиту
    listOfChar.sort();

    // наполняем результирующий объект
    listOfChar.forEach((item) => {
        const charQuantity = resultObj[item];

        if(charQuantity) {
            resultObj[item] = charQuantity + 1
            return;
        }

        resultObj[item] = 1;
    })

    console.log(Object.values(resultObj));
})
