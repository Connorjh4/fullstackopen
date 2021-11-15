import React, { useState } from "react";
import contactService from '../service/contact'

export const AddContact = ({ persons, setPersons, setMessage }) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const handleAddName = (e) => {
        setNewName(e.target.value)
    }
      
    const handleAddNumber = (e) => {
        setNewNumber(e.target.value)
    }

    const addName = (e) => {
        e.preventDefault()
        const duplicateName = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const duplicateNumber = persons.find(person => person.number === newNumber)
        let error = false

        if(newNumber === ''){
            setMessage({
                text: `Please add a number`,
                color: 'red'
            })
            setTimeout(() => {
                setMessage(null)
            },5000)
            error = true
        }
        if(newName === ''){
            setMessage({
                text: `Please add a name`,
                color: 'red'
            })
            setTimeout(() => {
                setMessage(null)
            },5000)
            error = true
        }
        if(duplicateNumber){
            setMessage({
                text: `${newNumber} is already in the phonebook`,
                color: 'red'
            })
            setTimeout(() => {
                setMessage(null)
            },5000)
            error = true
            setNewNumber('')
            setNewName('')
        }
        if(duplicateName && !error){
            error = true
            if(window.confirm(`${newName} is already in the phonebook, replace the number?`)){
                const id = duplicateName.id
                const changedContact = {...duplicateName, number: newNumber}
                contactService
                    .update(id, changedContact)
                        .then(returnedContact => {
                            setPersons(persons.map(person => person.id !== id ? person : returnedContact))
                            setMessage({
                                text: `${duplicateName.name}'s number has been updated`,
                                color: 'green'
                            })
                            setNewName('')
                            setNewNumber('')
                        }).catch( () => {
                            setMessage({
                                text: `${duplicateName.name} was deleted from the phonebook`,
                                color: 'red'
                            })
                        })
                        setTimeout(() => {
                            setMessage(null)
                        },3500)
                }
        }
        if(!error){
        const personObject = {
            name: newName,
            number: newNumber,
        }
        contactService
            .create(personObject)
                .then(returnedContact => {
                    setMessage({
                        text: `Added ${newName}`,
                        color: 'green'
                    })
                    setPersons(persons.concat(returnedContact))
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                    setNewName('')
                    setNewNumber('')

                })
        }
    }

    return(
        <div>
            <form onSubmit={addName}>
                <div>
                    name: <input type='text' value={newName} onChange={handleAddName}/>
                </div>
                <div>
                    phone: <input type='text' pattern='[0-9]*' value={newNumber} onChange={handleAddNumber}/>
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default AddContact;