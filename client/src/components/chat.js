import React, { useCallback, useEffect, useRef, useState } from 'react'
import MessagesContainer from './messages-container'
import UsersSidebar from './users-sidebar'

const Chat = ({ socket }) => {
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const bottomRef = useRef(null)

  useEffect(() => {
    socket.emit('fetchUsersRequest')

    socket.on('userConnected', (data) => setUsers(data))
    socket.on('userDisconnected', (data) => setUsers(data))
    socket.on('fetchUsersResponse', (data) => setUsers(data))
    socket.on('newMessageRecived', (data) => setMessages((messages) => [...messages, data]))
  }, [socket])

  const onSubmit = useCallback((event, ref) => {
    const newMessage = ref?.current?.value

    if (event.key === 'Enter') {
      socket.emit('newMessage', { from: socket.id, message: newMessage })
      setMessages((messages) => [...messages, { from: socket.id, message: newMessage }])

      setTimeout(() => {
        ref.current.value = ''
      }, 200)
    }
  }, [])

  return (
    <div className='chat'>
      <UsersSidebar users={users} />
      <MessagesContainer messages={messages} bottomRef={bottomRef} onSubmit={onSubmit} socketId={socket.id} />
    </div>
  )
}

export default Chat
