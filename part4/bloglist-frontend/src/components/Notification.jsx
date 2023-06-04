
const Notification = ({message, classes}) => {
  return message ? <div className={classes}>{message}</div> : null
}

export default Notification;