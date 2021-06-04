import React, {useState, useEffect} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const ShowList = ({countries, setinput, weatherdata, setweatherdata}) => {
  console.log({countries})
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter 
      </div> 
    )
  }

  if (countries.length === 1) {
    return (
      <div>
      <CountryInfo country={countries[0]}/>
      <WeatherInfo country={countries[0]} weatherdata={weatherdata} setweatherdata={setweatherdata} />
      </div>
    )
  }

  return (
    <div>
      <ul>
      {countries.map(country => <li key={country.numericCode}> {country.name} <button onClick={() => setinput(country.name)}>show</button> </li>)} 
      </ul>
    </div>
  )
}

const CountryInfo = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={country.flag} style={{height: 150, width: 200}} alt="flag" />
    </div>
  )
}

const WeatherInfo = ({country, weatherdata, setweatherdata}) => {
  const params = {
    access_key: {api_key},
    query: country.capital
  }
  console.log(api_key)
  axios.get('https://api.weatherstack.com/current', {params})
  .then(response => {
    console.log(response.data)
    setweatherdata(response.data)
  })
  if (weatherdata.success === true)
  {
  return (
      <div>
        Weather in {country.capital}:
        <div>Temperature: {weatherdata.current.temperature}</div>
        <img src={weatherdata.current.weather_icons[0]} alt="weathericon"/>
        <div>Wind: {weatherdata.current.wind_speed}  at {weatherdata.current.wind_dir}</div>
      </div>
    )
  }
  else 
  {
    return (<div>ERROR</div>)
  }
}


const App = () => {

  const [countryInput, setCountryInput] = useState('')
  const [countries, setCountries] = useState([])
  const [weatherdata, setWeatherData] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleCountryInput = (event) => {
    event.preventDefault()
    setCountryInput(event.target.value)
  }

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(countryInput.toLowerCase()))
  
  return (
    <div>
      <div>find countries <input onChange={handleCountryInput} /></div>  
        <ShowList countries={filteredCountries} setinput={setCountryInput} setweatherdata={setWeatherData} weatherdata={weatherdata}/> 
    </div>
  );
}

export default App;