import contactsService from './services/contacts'

const Persons = ({contacts, filterString, setContact, handleNotification}) => {
  const handleDelete = async (person) => {
    const id = person.id
    if (window.confirm("Are you sure you want to delete this contact?")) {
        const deleteHappened = await contactsService.deleteContact(id)
        console.log(deleteHappened)
        if (deleteHappened === "error") {
          handleNotification(`Contact ${person.name} has already been deleted`, "error")
        }
        else if (deleteHappened === "success") {
          handleNotification(`Information of ${person.name} has been removed from server`)
        }
        const newContacts = contacts.filter(person => person.id !== id)
        setContact(newContacts)
    }
  }

  if (filterString) {
    const contactsToShow = contacts.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()));
    return (
      contactsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)
    )
  }
    return (
      contacts.map(person => 
        <div key={person.name}>
          {person.name} {person.number}<button onClick={() => handleDelete(person)}>delete</button>
        </div>)
    );
}

export default Persons;