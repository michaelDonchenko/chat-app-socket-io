import React from 'react'

const UsersSidebar = React.memo(({ users }) => {
  return (
    <div className='users-sidebar'>
      <h4>Online users</h4>
      {users.map((userId) => (
        <div key={userId}>{userId}</div>
      ))}
    </div>
  )
})

export default UsersSidebar
