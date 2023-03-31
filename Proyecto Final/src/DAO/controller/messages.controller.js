import { MessageService } from "../../repository/index.js";

export const chat = async(req,res)=>{
    const messages = await MessageService.get();

    req.io.on('connection', socket => {
        console.log('new cliente connected');
    
        socket.on('messagein', async data => {
            await MessageService.create(data);
    
            messages.push(data)
            req.io.emit('messageout', messages)
        })
    })

    res.render('chat', {
        title: 'Chat'
    })
} 