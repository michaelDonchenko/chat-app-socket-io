export const newMessage = (socket, message) => {
  socket.broadcast.emit('newMessageRecived', message)
}
