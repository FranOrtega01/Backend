const list = [1,2,3,4,5];

// const myMap = (list, callback) => {
//     const newList = [];
//     for (const el of list) {
//         // const newValue = callback(el)
//         // newList.push(newValue)
//         newList.push(callback(el))
//     }
//     return newList
// }

// const list2 = myMap(list, x => x ** 2)
// console.log(list2);


//Creo un metodo para arrays asi puedo usar list.myMap()
//Las arrow function no tienen this, asi que hay que definir una function() para los prototype
Array.prototype.myMap = function(callback) {
    const newList = [];
    for (let i = 0; i < this.length; i++) {
        newList.push(callback(this[i]))
    }
    return newList
}

const myList = [2,4,6,8,10]

const resultado = myList.myMap(x => x*3)
console.log('--------------------------------');
console.log(myList);
console.log(resultado);