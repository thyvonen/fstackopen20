import React from 'react'
const AddForm = ( { addPerson, newName, handleNameChange, newNumber, handleNumberChange }) =>
{
        return (
        <div>
        <h3>Add new person</h3>
            <form onSubmit={addPerson}>
            <div>name: <input value={newName} onChange={handleNameChange}/></div>
            <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
            <div>
                <button type="submit">add</button>
            </div>
            </form>
        </div>
        )
}
export default AddForm