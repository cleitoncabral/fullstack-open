function DeleteButton ({handleClick, person}) {

  function remove(e) {
    e.preventDefault()
    handleClick(person)
  }

  return <button key={person.id} onClick={remove}>delete</button>
}

export default DeleteButton;