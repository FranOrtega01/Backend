const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    fetch('/get')
    .then((data) => data.json())
    .then(body => console.log(body))
})