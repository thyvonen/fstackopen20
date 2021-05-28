import React, {useState, useEffect} from 'react'
import axios from 'axios'


const ShowList = ({countries, setinput}) => {
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
      <CountryInfo country={countries}/>
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
      <h1>{country[0].name}</h1>
      <div>capital: {country[0].capital}</div>
      <div>population: {country[0].population}</div>
      <h3>languages</h3>
      <ul>
        {country[0].languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={country[0].flag} style={{height: 150, width: 200}} alt="flag" />
    </div>
  )
}


const App = () => {

  const [countryInput, setCountryInput] = useState('')
  const [countries, setCountries] = useState([])


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
     <div>
       
        <ShowList countries={filteredCountries} setinput={setCountryInput}/> 
       
    </div>

    </div>
  );
}

export default App;