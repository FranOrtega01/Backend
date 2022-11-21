//Var primitivo puede tomar el valor tomandolo de otra variable, y usan diferentes espacios en la memoria. Los objetos y arrays no:

let var1 = 12;
let var2 = var1;

var2 = var2*var2;

//aca solo cambia var2

let varArray = [1,2,3];
let copia = varArray;
copia.push(4);

console.log(varArray);
console.log(copia);
//En este caso copia es una referencia, osea que si lo cambio, cambiaria tambien varArray

//Espacio de memoria es donde se guarda el dato.


