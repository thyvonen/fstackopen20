import React, { useState, useEffect } from 'react'
import personService from './services/people'
import Filter from './components/filter'
import PersonList from './components/personlist'
import AddForm from './components/addform'
//import Person from './components/person'




const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterContent, setFilterContent] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPeople => {setPersons(initialPeople)
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
       const personObject = {
        name: newName,
        number: newNumber
      }
    const searchPerson = persons.find(person => person.name === newName)
    if (searchPerson === undefined ) {

      personService
      .createPerson(personObject)
      .then(returnedPerson => {setPersons(persons.concat(returnedPerson))})

      setNewName(``)
      setNewNumber(``)
      
    }
    else {
      //window.alert(`${newName} on jo puhelinluettelossa`);
      if (window.confirm(`${newName} on jo luettelossa, korvataanko?`)){
        personService
        .updatePerson(searchPerson.id, personObject)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== searchPerson.id ? person : updatedPerson))
          setNewName(``)
          setNewNumber(``)
        })
        .catch(error => {
          console.log(error)
          alert('Error in replacing')
        })
      }
    }
  }

  const deletePerson = (removableperson) => {
    
    if (window.confirm(`Poistetaanko ${removableperson.name} Luettelosta? `)){
    personService
    .deletePerson(removableperson.id)
    .then(() => setPersons(persons.filter(person => person.id !== removableperson.id)))
    .catch(error => {
      console.log(error)
      alert('Error in deleting')
    })
    }
    //console.log('Delete ID: ', id)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterContent.toLowerCase()))
  //console.log(persons)
  //console.log(personsToShow)


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <AddForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <PersonList persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App
