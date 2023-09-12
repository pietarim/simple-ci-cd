import { useState, useEffect } from 'react'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Filter from './Filter'
import contactsService from './services/contacts'
import Notification from './Notification'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [contact, setContact] = useState([])
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    const addContact = async () => {
      const contacts = await contactsService.getAll()
      setContact(contacts)
    }
    addContact()
  }, [])
    

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const handleNotification = (message, type) => {
    setType(type)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
      setType(null)
    }, 2000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        handleNotification={handleNotification}
        contact={contact} 
        setContact={setContact} 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber} 
      />
      <h2>Numbers</h2>
      <Persons 
        contacts={contact} 
        filterString={filter} 
        setContact={setContact}
        handleNotification={handleNotification} 
      />
    </div>
  )

}

export default App