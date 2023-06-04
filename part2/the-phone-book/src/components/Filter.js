import {useState} from 'react'

function Filter ({personsList}) {
  
  const [filterName, setFilterName] = useState('')
  
  const filterChange = (event) => {
    // var filterNameList = [...personsList]

    var filterNameList = personsList.filter(person => {
      return person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
    })

    event.target.value ? setFilterName(filterNameList) : setFilterName('')

  }
  
  return (
    <div>
      Filter number <input type="name" onChange={filterChange} />
      {filterName.length > 0 ? filterName.map(filter => <p key={filter.id}>{filter.name} {filter.number}</p>) : <p></p>}
    </div>
  )
}

export default Filter