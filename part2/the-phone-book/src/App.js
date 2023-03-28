import {useState} from 'react'
import Filter from './components/Filter';
import Input from "./components/Input";
import PersonNumber from './components/PersonNumber';

function App() {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const handleNameChange = (event) => { 
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => { 
    setNewNumber(event.target.value)
  }
  
  const addName = (event) => {
    event.preventDefault()

    var doubleItem = persons.filter(function(person){
      if (JSON.stringify(person.name) == JSON.stringify(newName)){
        return newName
      }
    })
    
    if (doubleItem.length > 0){
      alert(newName + ' is already added to phonebook')
    } else {

      const addedNewName = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      
      setPersons(persons.concat(addedNewName))
      setNewName('')
      setNewNumber('')
    }
    
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter personsList={persons} />
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <Input type="name" value={newName} eventChange={handleNameChange} />
          Number: <Input type="tel" value={newNumber} eventChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

    <ul>
      <PersonNumber persons={persons} />
    </ul>
    </div>
  );
}

export default App;
