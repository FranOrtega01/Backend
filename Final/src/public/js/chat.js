let socket = io()
let user = ''
let chatBox = document.getElementById('chatbox')


Swal.fire({
    title: 'Identification',
    input: 'text',
    text: 'Set username for the chat',
    inputValidator: value => {
        return !value.trim() && 'Please, write an username'
    },
    allowOutsideClick: false
}).then( res => {
    user = res.value
    document.getElementById('username').innerHTML = `${user}:`
})


// Enviar mensajes
chatBox.addEventListener('keyup', e => {
    if(e.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', {
                user,
                message: chatBox.value
            })
            chatBox.value = ''
        }
    }
})

// Recibir mensajes

socket.on('logs', data => {
    const divLog = document.getElementById('messageLogs')
    let messages = ''
    data.forEach(message => {
        messages += `<p><i>${message.user}</i>: ${message.message}</p>`
    })
    
    divLog.innerHTML = messages
})
