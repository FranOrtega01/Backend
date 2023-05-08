const psw = document.getElementById('newPassword');
const pswConfirm = document.getElementById('newPasswordConfirm');
const pswText = document.getElementById('restorePasswordValid')

const submitBtn = document.getElementById('restoreFormSubmit');

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if(psw.value.length === 0) return pswText.innerHTML = "La contraseña no puede ser vacía"
    if (psw.value !== pswConfirm.value) return pswText.innerHTML = "Las contraseñas no coinciden"
    
    else{
        try {
            const data = {data: psw.value}
            const response = await fetch("/session/restore-account/password-reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(data)
            })
            const responseData = await response.json()
            if(responseData.status === 'error') return pswText.innerHTML = responseData.data

            // Success
            pswText.classList.remove('text-danger')
            pswText.classList.add('text-success')
            pswText.innerHTML = 'Contraseña restablecida satisfactoriamente. Será redirigido en unos momentos...'

            setTimeout(() => {
                window.location.replace('/session/login')
            }, 2000);


        } catch (error) {
            console.log("ERROR: ", error);
        }
    }
})