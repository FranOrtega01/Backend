const dividir = (num1, num2) => {
    return new Promise((res, rej) => {
        num2 === 0 
        ? 
        rej('No se puede dividir entre 0') 
        :
        setTimeout(() => res(num1 / num2), 2000);
    })
}

const funcAsync = async () => {
    try{
        const resultado = await dividir(3,0);
        console.log(resultado);
        console.log('Fin asincronico');
    }
    catch(error){
        console.log('ERROR: ', error);
    }
} 

funcAsync()
console.log('Fin del archivo');