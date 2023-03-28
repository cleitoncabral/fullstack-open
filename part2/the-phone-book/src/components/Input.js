function Input ({value, eventChange, type, pattern}) {
  return (
    <input type={type} value={value} onChange={eventChange} pattern={pattern}/>
  )
}

export default Input;