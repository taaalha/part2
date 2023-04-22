import React from 'react'


const Button = ({id, handleDelete}) => {
    const handleClick = () => {
         handleDelete(id)
        //in react you cannot call parent functions like App.handleDelete. Instead, the function is
        // passed down to the child component. in this case, it is 
        // App --> Persons.js --> button.js
        }
    
    return(
        <button onClick={handleClick}>
            delete
        </button>
    )

    }
export default Button