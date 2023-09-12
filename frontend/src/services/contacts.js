import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newContact) => {
  const person = await axios.post(baseUrl, newContact)
  return person.data
}

const deleteContact = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`)
    return "success"
  }
  catch (error) {
    return "error"
  }
}

const update = async (id, newNumber) => {
  const request = await axios.put(`${baseUrl}/${id}`, newNumber)
  return request.data
}

const contactservice = { getAll, create, deleteContact, update }

export default contactservice