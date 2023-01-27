const http = require('http')

const server = http.createServer((request, response) => {
    response.end('Mi primer servercito desde el backend. Hello Guti')
})

server.listen(8080), () => {
    console.log('Listening on port 8080...');
}