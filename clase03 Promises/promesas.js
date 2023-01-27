const dividir = (num1, num2) => {
    return new Promise((res, rej) => {
        num2 === 0 
        ? 
        rej('No se puede dividir entre 0') 
        :
        res(num1 / num2)
    })
}

const promesa = dividir(40,2)
    .then(data => console.log(data))
    .catch((error) => console.log(error))
    .finally(() => console.log('Termino la promesa'))