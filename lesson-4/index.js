const fs = require('fs');
const { Transform } = require("stream");

const fileName = process.argv[2];

if(!fileName) {
    throw new Error('Please, provide file name');
}

const fileStream = fs.createReadStream(fileName, {
    highWaterMark: 10,
});

class TransformStream extends Transform {
    constructor() {
        super({ objectMode: true });
        this.words = [];
        this.resultObj = {};
    }
    
    _transform(chunk, encoding, callback) {
        const words = chunk.toString().replaceAll(/,*\.*/g, '').split(/[ \n]+/).filter((word) => word.match(/[a-zA-Z]+/));
        this.words.push(...words);
        callback();
    }

    _flush() {
        this.words.sort();

        // наполняем результирующий объект
        this.words.forEach((item) => {
            const charQuantity = this.resultObj[item];

            if(charQuantity) {
                this.resultObj[item] = charQuantity + 1;
                return;
            }

            this.resultObj[item] = 1;
        });

        console.log(Object.values(this.resultObj));
    }
}

const transformStream = new TransformStream();

fileStream.pipe(transformStream);
