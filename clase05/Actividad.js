const moment = require('moment')

const fechaActual = moment()
const fechaNacimiento = moment('2001-08-20', 'YYYY-MM-DD')
const diferencia = fechaActual.diff(fechaNacimiento, 'days')

console.log(diferencia);