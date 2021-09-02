import React from 'react'
const Notification = ({ message }) => {
    console.log('Notification')
    if (message === null) {
      return null
    }
  
    return (
      <div className="notification">
        {message}
      </div>
    )
  }
  export default Notification