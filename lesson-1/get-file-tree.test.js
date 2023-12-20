const treeModule = require('./get-file-tree');

describe('Tree', () => {
    let getFileTreeSpy;
    let consoleLogSpy;

    beforeEach(() => {
        getFileTreeSpy = jest.spyOn(treeModule, 'getFileTree');
        consoleLogSpy = jest.spyOn(console, 'log');
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should log some of files', async () => {
        await getFileTreeSpy('./', 1);

        expect(consoleLogSpy).toHaveBeenCalledWith('├── package-lock.json');
        expect(consoleLogSpy).toHaveBeenCalledWith('└── package.json');
    })

    it('should call console.log `n` times', async () => {
        await getFileTreeSpy('./', 2);

        expect(consoleLogSpy).toHaveBeenCalledTimes(216);
    })
})
