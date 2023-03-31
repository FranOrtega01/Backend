const btnAdd = document.getElementById('add')

const btnRemove = document.getElementById('remove')

btnAdd.addEventListener('hover', e => {
    console.log('click');

}) 

btnAdd.addEventListener('click', e => {
    e.preventDefault()
    e.stopPropagation()
    console.log('click');

}) 

btnRemove.addEventListener('click', e => {
    e.preventDefault()
    e.stopPropagation()
    console.log('click');
}) 