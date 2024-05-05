const { Server } = require('socket.io')
    
    class SocketServer {
      constructor(){
        this.saiu = null
      }
      
      init(server) {
        const io = new Server(server,
          {
            transports: ['websocket', 'polling'],
            cors: {
              origin: 'https://cbpatio.vercel.app',
              methods: ['GET', 'POST', 'PUT', 'DELETE'],
          },});
    
        io.on('connection', (socket) => {
            console.log(`user online => ${socket.id}`)
            socket.on("payloadGen", (data) => console.log(data))
        });

        this.socket = io
      }
    
      onPaymentApproved(message) {
        console.log(message)
        this.socket.emit('payed', message);
      }

      left(message){
        console.log(message)
        this.socket.emit("left", message)
      }
    }
    
    module.exports = new SocketServer