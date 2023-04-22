import React from 'react'
import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personService from './services/persons'



const App = () => {

  // state 1
  const [persons, setPersons] = useState([]) 

  useEffect( () => {
    personService
      .getAll()
      .then(person=> { 
        console.log('response.data is',person)
        setPersons(person)      
      })
  }, []  )


  //state 2
  const [newName, setNewName] = useState('')
  //state 3
  const [newNumber, setNewNumber] = useState('')
  //state 4
  const [searchName, setSearchName] = useState('')
  //state 5
  const [errorMessage, setErrorMessage] = useState('')

 // searching and filtering
  const searched = persons.filter(person => person.name.toLowerCase().includes(searchName)  )
  
  //event handler
  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    let check = persons.map((person) => person.name.toLowerCase()).includes(newName.toLowerCase())
    let personToUpdate = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())

    console.log("check is",check)
    if (check === true) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        const phoneObject = {
          name: newName,
          number: newNumber
        }
        console.log("persons.id is",personToUpdate.id)
        personService
        .update(personToUpdate.id,phoneObject)
        .then(response => {
          setPersons(
            persons.map((person) => person.id === personToUpdate.id ? response : person)
          )
          setNewName('')
          setNewNumber('')
          setErrorMessage(`Updated ${newName}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    }

    else {
      const phoneObject = {
        name: newName,
        number: newNumber
      }
      personService
      .create(phoneObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`Added ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }

  }

  //event handler
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  //event handler
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  //event handler
  const handleSearch = (event) => {
    const searchNameHandle = event.target.value 
    console.log('searchNameHandle is', searchNameHandle)
    setSearchName(event.target.value.toLowerCase())
  }

  //event handler
  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    console.log("person is",person)
    if (window.confirm("Do you reallty want to delete")) {
          personService
          .deletePerson(id)
          .then(() => {
            personService
            .getAll()
            .then(person=> { 
              console.log('response.data is',person)
              setPersons(person)      
            })
          })
          .catch(error => {
            setErrorMessage(`Information of ${person.name} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 10000)
          })

        }
        }
 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter searchName={searchName} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={searched} handleDelete={handleDelete}/> 
      
    </div>
  )
}

const Notification = ({ message }) => {
  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (message === null) {
    return null
  }

  return (
    <div className='error' style={style}>
      {message}
    </div>
  )
}

export default App