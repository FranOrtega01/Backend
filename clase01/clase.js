/*
Desarrollarás el backend de una aplicación de e-commerce para poder vender productos de un rubro a elección. El servidor se basará en un diseño de capas, orientado a MVC y su código contendrá las estructuras de programación más sólidas por parte del lenguaje ECMAScript.
*/

// let i = 2

// function guti(){
//     if(true){
//         console.log(i);
//     }
// }

// guti()

//Hands on lab

lista = [0,1,2]
listaVacia = []

const mostrarLista = (arr) => {
    if(arr.length === 0) return 'Lista vacia'

    arr.forEach(x => console.log(x))

    return `Longitud: ${arr.length}`
}

// console.log(mostrarLista(lista))
// console.log(mostrarLista(listaVacia))


//Uso de clases en Js
/*
class Persona{

    constructor(nombre){
        console.log('se ha creado una persona');
        this.name = nombre
        this.age = 30
    }
    static especie = 'humano'
    //Static es una valor estatico para todas las instancias que se creen (una variable que todos tienen)

    speak(){
        console.log('My name is ', this.name, Persona.especie);
    }
    walk = () => {
        console.log('Like MoonWalk');
    }
}

const agustin = new Persona('Agustin')
const imanol = new Persona('Imanol')
const lucas = new Persona('Lucas')


agustin.speak()
*/

class Counter{

    constructor(responsible){
        this.responsible = responsible
        this.countLocal = 0
    }
    static countGlobal = 0

    getResponsible = () => {return this.responsible}
    getCountLocal = () => {return this.countLocal}
    getCountGlobal = () => {return Counter.countGlobal}

    count(){
        this.countLocal++
        Counter.countGlobal++
    }
}

const jhonatan = new Counter('jhonatan')
const maximo = new Counter('Maximo')
const r2 = new Counter('R2')
const daniela = new Counter('Daniela')

jhonatan.count()
jhonatan.count()
daniela.count()
daniela.count()
daniela.count()
maximo.count()

console.log(`${jhonatan.getResponsible()}: ${jhonatan.getCountLocal()}`);
console.log(`${maximo.getResponsible()}: ${maximo.getCountLocal()}`);
console.log(`${daniela.getResponsible()}: ${daniela.getCountLocal()}`);

console.log(Counter.countGlobal);