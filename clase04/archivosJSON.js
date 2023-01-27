const fs = require('fs')

const obj = {
    name: 'R2',
    lastname: 'Verbel',
    age: 15
}

//Exportar obj a archivos
const objStr = JSON.stringify(obj)

fs.writeFileSync('objeto.json', objStr)

//Leer obj de archivos
const contentStr = fs.readFileSync('objeto.json', 'utf-8')
const objNew = JSON.parse(contentStr)
console.log(objNew);

