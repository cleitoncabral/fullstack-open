import {useState, useEffect} from 'react'
import Filter from './components/Filter';
import Input from "./components/Input";
import PersonNumber from './components/PersonNumber';
import nameService from './services/names'
import Message from './components/Message';
function App() {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    nameService.getAll().then((response) => {
      setPersons(response)
    })
  }, [])
  
  const handleNameChange = (event) => { 
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => { 
    setNewNumber(event.target.value)
  }
  
  const addName = (event) => {
    event.preventDefault()

    const duplicatedName = persons.filter(person => person.name === newName)

    if (duplicatedName.length === 0) {
      const addedNewName = {
        name: newName,
        number: newNumber,
        id: Math.random < 5
      }
      
      nameService.create(addedNewName)
      .then(returnedName => {
        setPersons(persons.concat(returnedName))
        setNewName('')
        setNewNumber('')
        const message = {
          content: `${returnedName.name} was added.`,
          status: 'success'
        }
        setMessage(message)

        setTimeout(() => {
          setMessage('')
        }, 3000)
      })
    } else {
      duplicatedName.map(item => {
        if (window.confirm(`${item.name} is already added to Phonebook, replace the old number with the new one?`)){
          const addedNewName = {
            name: newName,
            number: newNumber,
            id: item.id
          }
          nameService.update(item.id, addedNewName)
          .then(resPersons => {
            setPersons(persons.map(personFilter => personFilter.id !== item.id ? personFilter : resPersons))
            setNewName('')
            setNewNumber('')
            const message = {
              content: `${resPersons.name} was added.`,
              status: 'success'
            }
            setMessage(message)

            setTimeout(() => {
              setMessage('')
            }, 3000)
          }).catch(error => {
            const message = {
              content: `${item.name} was already removed from server.`,
              status: 'error'
            }
            setMessage(message)

            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
        }
      })
    }
    
  }

  function deleteItem (person) {
    if (window.confirm(`Delete ${person.name}`) ) {
      nameService.deleteItem(person.id).then(() => {
        setPersons(persons.filter(personFilter => personFilter.id !== person.id))
      })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      {message ? <Message message={message} /> : <></>}
      
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

      {persons.length > 0 ? persons.map((person, index) => {
        return <PersonNumber key={index} person={person} handleClick={deleteItem}/>
      }) : <p>Adicione numeros à lista!</p>}
    </div>
  );
}

export default App;
