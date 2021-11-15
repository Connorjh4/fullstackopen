import React, {useEffect} from "react";
import contactService from '../service/contact'

export const Contacts = ({ filterPerson, persons, setPersons, setMessage }) => {

    const handleDelete = (e) => { 
        const id = e.target.value
        if(window.confirm(`delete ${e.target.name}?`)){
            contactService
                .remove(id)
                    .then( () => {
                        contactService
                        .getAll()
                        .then(initialContacts => {
                            setPersons(initialContacts)
                        })
                        setMessage({
                            text: `${e.target.name} has been deleted`,
                            color: 'green'
                        })
                    }).catch(() => {
                        setPersons(persons.filter(person => person.name !== e.target.name))
                        setMessage({
                            text: `${e.target.name} was already deleted`,
                            color: 'red'
                        })  
                    })
                    setTimeout(() => {
                        setMessage(null)
                    },3500)
        }
    }

    useEffect(() => {
        contactService
          .getAll()
          .then(initialContacts => {
            setPersons(initialContacts)
          })
          console.log('running')
    }, [setPersons])
    
    const filteraction = persons.filter(person => person.name.toLowerCase().includes(filterPerson.toLowerCase()) || person.number.includes(filterPerson))

    return(
        <>
        {filteraction.map((person) => 
            <p key={person.id}>
                <b>{person.name}</b> {person.number} 
                <button key={person.id} onClick={handleDelete} value={person.id} name={person.name}>delete</button>
            </p>              
        )}
        </>
    )
}

export default Contacts;