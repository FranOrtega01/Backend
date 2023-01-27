//Asincronico, primero aparece 'Fin' primero, y los resultados luego de un seg
new Promise((res, rej) => {
    setTimeout(() => {
        res(3)
    }, 1200);
})
    .then(result => {
        console.log('res 1:', result);
        return result**2;
    })
    .then(result => {
        console.log('Res segunda parte: ', result);
        return result**2;
    })
    .then(result => {
        console.log('Res tercera parte: ', result);
        return result**2;
    })

console.log('Fin');
