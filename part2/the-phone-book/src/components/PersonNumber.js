import DeleteButton from "./DeleteButton";

function PersonNumber ({person, handleClick}) {
  
  return (
    <p key={person.id}>{person.name} {person.number} <DeleteButton person={person}  handleClick={handleClick} /></p>
  )
}

export default PersonNumber;