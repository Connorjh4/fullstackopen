import React, { useEffect } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
      display: `${props.message === '' ? 'none' : ''}`,
      border: 'solid',
      padding: 10,
      borderWidth: 1
  }

  // Reset Notification w/ setTimeOut of 5 sec
  useEffect(() => {
    if( props.message ) {
      const setTimer = 
        setTimeout(() => {
          props.setNotification({message: '', time: 0})
        }, props.time*1000)
      return () => clearTimeout(setTimer)
    }  
  }, [ props ])

  return (
    <div style={style}>
      {props.message}
    </div>
  )
}

const mapDispatchToProps = {
  setNotification
}
  
const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    time: state.notification.time
  }
}

const Connectednotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)

export default Connectednotification