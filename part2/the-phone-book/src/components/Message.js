function Message ({message}) {
  return <div className={message.status}><p>{message.content}</p></div>
}

export default Message;