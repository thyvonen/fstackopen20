import React from 'react'
import Person from './person'
const PersonList = ({persons, deletePerson}) => {
    return (
      <div>
        <h2>Phonebook</h2>
        <ul>
          {persons.map(person =>
            <Person key={person.id} person={person} deletePerson={deletePerson} />
            )}
        </ul>
      </div>
    )
  }
export default PersonList