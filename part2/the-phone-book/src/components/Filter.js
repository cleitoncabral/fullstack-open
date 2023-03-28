import {useState} from 'react'

function Filter ({personsList}) {
  
  const [filterName, setFilterName] = useState('')
  const [filterNumber, setFilterNumber] = useState('')
  const filterChange = (event) => {
     personsList.filter((person) => {
            if (person.name.toLowerCase().includes(event.target.value.toLowerCase()) && event.target.value.length > 0) {
              setFilterName(person.name)
              setFilterNumber(person.number)
            }  

            if(event.target.value == ''){
              return setFilterName('')
            }
      })
    }
  
  return (
    <div>
      Filter number <input type="name" onChange={filterChange} />
      {filterName ? <p>{filterName} {filterNumber}</p> : <p></p>}
    </div>
  )
}

export default Filter