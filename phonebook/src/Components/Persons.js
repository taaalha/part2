import React from 'react'
import Button from './button'

const Persons = ({ persons, handleDelete }) => {

  return (
    <div>
      {persons.map(person => (
        <div key={person.name}>
          {person.name} {person.number}
          <Button id={person.id} handleDelete={handleDelete}/>
        </div>
      ))}
    </div>
  )
}

export default Persons

