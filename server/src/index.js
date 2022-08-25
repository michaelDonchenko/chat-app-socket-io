import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import { userConnected, userDisconnected, fetchUsersRequest } from './sockets/users.js'
import { newMessage } from './sockets/messages.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

app.use(cors())

io.on('connection', (socket) => {
  userConnected(socket)

  socket.on('disconnect', () => userDisconnected(socket))
  socket.on('fetchUsersRequest', () => fetchUsersRequest(socket))
  socket.on('newMessage', (message) => newMessage(socket, message))
})

server.listen(5000, () => {
  console.log('listening on port 5000')
})
