import React, { useState } from 'react'
import Filter from './components/filter';
import AddContact from './components/addContact';
import Contacts from './components/contacts';
import Notification from './components/notification';

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ filterPerson, setFilterPerson ] = useState('')
    const [ message, setMessage ] = useState(null)


  return (
    <div>
        <h1>Phonebook</h1>
        <Filter 
            filterPerson={filterPerson} 
            setFilterPerson={setFilterPerson}
        />
        <Notification 
          message={message}
        />
        <h2>Add new</h2>
        <AddContact 
            persons={persons}
            setPersons={setPersons}
            setMessage={setMessage}
        />
        <h2>Contacts</h2>
        <Contacts 
            persons={persons}
            filterPerson={filterPerson}
            setPersons={setPersons}
            setMessage={setMessage}
        />  
    </div>
  )
}

export default App;