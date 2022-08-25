let users = []

export const userConnected = (socket) => {
  users.push(socket.id)

  socket.broadcast.emit('userConnected', users)
  console.log(`Online users:`, users)
}

export const userDisconnected = (socket) => {
  users = users.filter((id) => id !== socket.id)

  socket.broadcast.emit('userDisconnected', users)
  console.log(`Online users:`, users)

  socket.disconnect()
}

export const fetchUsersRequest = (socket) => {
  socket.emit('fetchUsersResponse', users)
}
