import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({handleFilterChange}) => {

  return (
    <div>
    filter shown with <input onChange={handleFilterChange}/>
    </div>
  )
}

const PersonList = ({persons}) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}> <Person person={person} /></li>
          )}
      </ul>
    </div>
  )
}

const Person = ({person}) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterContent, setFilterContent] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
    }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    console.log(filterContent)
    setFilterContent(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.findIndex(person => person.name === newName) === -1 ) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName(``)
      setNewNumber(``)
    }
    else {
      window.alert(`${newName} on jo puhelinluettelossa`);
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterContent.toLowerCase()))
  console.log(persons)
  console.log(personsToShow)


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add new person</h3>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <PersonList persons={personsToShow}/>
    </div>
  )

}

export default App
