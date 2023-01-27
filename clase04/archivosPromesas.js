const fs = require('fs')

const filename = './ejemplo.txt'

const operacionAsync = async() => {
    await fs.promises.writeFile(filename, 'Saludos a Adrian\n')

    let contenido = await fs.promises.readFile(filename, 'utf-8')
    console.log('CONTENIDO:', contenido);

    await fs.promises.appendFile(filename, 'Saludos para Lucas')
    contenido = await fs.promises.readFile(filename, 'utf-8')
    console.log('CONTENIDO:', contenido);

    fs.promises.unlink(filename)
}

operacionAsync()
console.log('FIN!!!');