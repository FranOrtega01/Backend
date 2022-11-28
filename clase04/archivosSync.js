const fs = require('fs')
const filename = './ejemplo.txt'


//Creer archivo
//fs.writeFileSync('./ejemplo.txt', 'Saludos al Valentin :D')



// if(fs.existsSync(filename)){
//     //Leer archivo
//     let contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')
//     console.log('CONTENIDO:', contenido);

//     //Modificar archivo
//     fs.appendFileSync(filename, '\nMas saludos para los demas') 
//     contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')
//     console.log('CONTENIDO:', contenido);

//     fs.unlinkSync(filename) //Borrar archivo
// }
// else {
//     console.log('el contenido no existe');
// }

// console.log('END');


//Asincronico
fs.writeFile(filename, 'Saludos al Valentin :D\n', error => {
    if(error) return console.log('Hubo un error al escribir');
    fs.appendFile(filename, 'Saludos a Agustin Balart!!', error => {
        if(error) return console.log('Hubo un error al agregar contenido');
        fs.readFile(filename, 'utf-8', (error,contenido) => {
            if(error) return console.log('Hubo un error al leer el archivo');
            console.log('CONTENIDO: ', contenido);
        })
    })
    console.log('Archivo escrito correctamente');
})

//Pyramid of DOOM!!!
//Resolvemos con promesas (fs utilizando promesas)