const fs = require('fs');
const { Transform } = require("stream");

const fileName = process.argv[2];

if(!fileName) {
    throw new Error('Please, provide file name');
}

const fileStream = fs.createReadStream(fileName, {
    highWaterMark: 10,
});

const resultObj = {};

class TransformStream extends Transform {
    constructor() {
        super({ objectMode: true });
        this.words = [];
    }
    
    _transform(chunk, encoding, callback) {
        this.words.push(chunk);
        callback();
    }
}

const transformStream = new TransformStream();

fileStream.pipe(transformStream);

fileStream.on('end', () => {
    const resultString = Buffer.concat(transformStream.words).toString();

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
