const dividir = (num1, num2) => {
    return new Promise((res, rej) => 
        num2 === 0 ? rej('No se puede dividir entre 0'): res(num1 / num2))
}
const sumar = (num1, num2) => {
    return new Promise((res, rej) => {
        (num1 === 0 || num2 === 0) ? rej('Suma innecesaria') : res(num1 + num2)
    })
}
const restar  = (num1, num2) => {
    return new Promise((res, rej) => {
        if (num1 === 0 || num2 === 0) rej('Operacion invalida')
        else{
            const resultado = num1 - num2
            resultado < 0 ? rej('La calculadora solo trabaja con positivos') : res(resultado)
        }
    })
}

const multiplicar = (num1, num2) => {
    return new Promise((res, rej) => {
        (num1 < 0 || num2 < 0) ? rej('Operacion invalida') : res(num1*num2)
    })
}


const calculos = async () => {
    try{
        console.log(await sumar(2,4));
        console.log(await restar(4,2));
        console.log(await dividir(2,4));
        console.log(await multiplicar(2,4));

    }catch(error){
        console.error('ERROR: ', error);
    }
}

calculos()