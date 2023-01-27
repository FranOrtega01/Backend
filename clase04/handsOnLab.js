// const fs = require('fs');
// const path = './package.json';
// const content = fs.readFileSync(path, 'utf-8');

// const info = {
//     contenidoStr: content,
//     contenidoObj: JSON.parse(content),
//     size: content.length
// }

// console.log('------------------------');

// console.log('Contenido string: ');

// console.log(info.contenidoStr);

// console.log('------------------------');

// console.log('Contenido objeto: ');

// console.log(info.contenidoObj);

// console.log('------------------------');

// console.log('Tamaño: ');

// console.log(info.size);

const fs = require('fs')
const path = './package.json'
const content = fs.readFileSync(path, 'utf-8')
const info = {
    contenidoStr: content,
    contenidoObj: JSON.parse(content),
    size: content.length
}
console.log('------------------------');

console.log('Contenido string: ');

console.log(info.contenidoStr);

console.log('------------------------');

console.log('Contenido objeto: ');

console.log(info.contenidoObj);

console.log('------------------------');

console.log('Tamaño: ');

console.log(info.size);