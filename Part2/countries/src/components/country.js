import React , {useEffect, useState} from 'react'
import Languages from './languages';
import axios from 'axios'

const Country = ({country}) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        const params = {
            access_key: `${api_key}`,
            query: `${country.capital}`
          }
        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
                setWeather(response.data.current)
            })
    }, [country.capital])

    return(
        <div key={country.cc3n}>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h2>Languages</h2>
        <Languages country={country}/>
        <img 
          src={country.flags.svg} 
          alt="Country Flag" 
          style={{width:200,height:200}}
          resizemode='object-fit'
          />
        <h2>Weather in {country.capital}</h2> 
        <p><b>Temperature:</b> {weather.temperature}</p>
        <p>{weather.description}</p>
        <img src={weather.weather_icons} alt="weather icon" />
        <p><b>Wind:</b> {weather.wind_speed}MPH direction {weather.wind_dir}</p>
        </div>
    )
}

export default Country;