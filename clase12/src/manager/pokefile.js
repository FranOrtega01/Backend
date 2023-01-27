import fs from 'fs';

class PokeFile {

    constructor(filename){
        this.filename = filename
    }

    getAll = () => {
        return fs.promises.readFile(this.filename, 'utf-8')
            .then(data => JSON.parse(data))
    }
}

export default PokeFile