import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  setTimeout(removeAlert,4000)
  return <Alert variant={variant} className='alert-message'>{children}</Alert>
}

const removeAlert = () => {
    document.querySelector('.alert-message').style.display='none'
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
