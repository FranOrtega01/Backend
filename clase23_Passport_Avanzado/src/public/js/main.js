const login = document.getElementById('login')

login.addEventListener('click', async e => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const body = {email, password}

    const result = await fetch('/jwt/login', {
        method:'POST',
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"}
    })

    const response = await result.json() 
    console.log(response);
})


const service = document.getElementById('service')

service.addEventListener('click', async e => {
    
    try {
        const result = await fetch('/jwt/private')
        const response = await result.json()
        console.log(response);

    } catch (error) {
        console.log(error);
    }
})

const admin = document.getElementById('admin')

admin.addEventListener('click', async e => {
    
    try {
        const result = await fetch('/jwt/admin')
        const response = await result.json()
        console.log(response);

    } catch (error) {
        console.log(error);
    }
})