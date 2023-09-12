import contactservice from './services/contacts'

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, contact, setContact, handleNotification}) => {

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (contact.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = contact.find(person => person.name === newName)
        const newPerson = {...person, number: newNumber}
        contactservice.update(person.id, newPerson)
        .then(response => {
          const newContacts = contact.map(person => person.id !== newPerson.id ? person : newPerson)
          setContact(newContacts)
          handleNotification(`${person.name} has been updated`)
        })
        .catch(error => {
          handleNotification(`An error occured while updating ${person.name}`)
        })
      }
    } else {
      contactservice.create({name: newName, number: newNumber})
      .then(newContact => {
        setContact(contact.concat(newContact))
        handleNotification(`${newName} has been added`)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error.response.data.error)
        console.log(error.request.response)
        handleNotification(error.response.data.error, "error")
      })
    }
    
  }

  return (
    <>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>)
}

export default PersonForm;