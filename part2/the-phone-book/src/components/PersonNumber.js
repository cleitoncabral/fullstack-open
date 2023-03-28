function PersonNumber ({persons}) {
  return (
    persons.map((person) =>  {
      return <li key={person.id}>{person.name} {person.number}</li>
    })
  )
}

export default PersonNumber;