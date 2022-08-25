import React from 'react'
import socketIO from 'socket.io-client'
import Chat from './components/chat'

const socket = socketIO.connect('http://localhost:5000')

const App = () => {
  return (
    <div className='app-container'>
      <Chat socket={socket} />
    </div>
  )
}

export default App
