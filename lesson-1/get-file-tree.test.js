const mock = require('mock-fs');
const treeModule = require('./get-file-tree');

describe('Tree', () => {
    let getFileTreeSpy;
    let consoleLogSpy;

    beforeEach(() => {
        getFileTreeSpy = jest.spyOn(treeModule, 'getFileTree');
        consoleLogSpy = jest.spyOn(console, 'log');

        mock({
            'folder-two': {
                'some-file.txt': 'file content here',
                'inner-folders': {
                    'file1': '',
                    'file2': '',
                    'file3': '',
                }
            },
            'test-folder': {},
        });
    })

    afterEach(() => {
        jest.clearAllMocks();
        mock.restore();
    })

    it('should log some of files', async () => {
        await getFileTreeSpy('./', 1);

        expect(consoleLogSpy).toHaveBeenCalledWith('├── folder-two');
        expect(consoleLogSpy).toHaveBeenCalledWith('└── test-folder');
    })

    it('should call console.log `n` times', async () => {
        await getFileTreeSpy('./', 2);

        expect(consoleLogSpy).toHaveBeenCalledTimes(4);
    })
})
