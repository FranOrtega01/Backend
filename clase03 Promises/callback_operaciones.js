const sumar = (num1, num2) => num1 + num2
const restar = (num1, num2) => num1 - num2
const multiplicar = (num1, num2) => num1 * num2
const dividir = (num1, num2) => num1 / num2

const realizarOperacion = (num1, num2, callback) => {
    return ('Resultado:', callback(num1, num2))
}

console.log(realizarOperacion(3,7,sumar));
console.log(realizarOperacion(3,7,restar));
console.log(realizarOperacion(3,7,multiplicar));
console.log(realizarOperacion(3,7,dividir));