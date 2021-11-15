import React from "react";
import styled from 'styled-components'
import Country from "./country";


export const Countries = ({ filterCountry, countries, setFilterCountry }) => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filterCountry.toLowerCase()))

    const handleSelect = (e) => {
      const countryName = e.target.innerText
      setFilterCountry(countryName)
    }

    if(!filterCountry){
      return(
        <p>Please search for country</p>
      )
    }if(filteredCountries.length === 1){
      const country = filteredCountries[0]
      return(
            <Country country={country}/>
      )
    }if(filteredCountries.length <= 10){
      return(
        filteredCountries.map( country =>
            <CountryList 
              key={country.ccn3}
              onClick={handleSelect}
              value={country.name.common}
              >
                {country.name.common}
            </CountryList>
        )
      )
    }
    return(
      <p>Too many matches, please specify search</p>
    )
}
  
const CountryList = styled.p`
  cursor: pointer;
  :hover{
    color: #4b419e
  }
`

export default Countries;