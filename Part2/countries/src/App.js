import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import Countries from './components/countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState ('')

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return(
  <div>
    <Filter 
      filterCountry={filterCountry} 
      setFilterCountry={setFilterCountry}
      />
    <Countries 
      countries={countries} 
      filterCountry={filterCountry}
      setFilterCountry={setFilterCountry}
      />
  </div>
  )

}

export default App;