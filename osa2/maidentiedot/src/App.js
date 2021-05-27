import React, {useState, useEffect} from 'react'

const App = () => {

  const [countryInput, setCountryInput] = useState('')

  const handleCountryInput = (event) => {
    event.preventDefault()
    setCountryInput(event.target.value)
  }

  return (
    <div className="App">
      find countries <input onChange={handleCountryInput} />
    </div>
  );
}

export default App;