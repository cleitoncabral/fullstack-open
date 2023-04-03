import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
import Input from './components/Input';

function App() {
  const [countryFinder, setCountryFinder] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${countryFinder}`)
    .then(resp => setCountries(resp.data))
  }, [countryFinder])

  function findCountry (event) {
    setCountryFinder(event.target.value)
  }
  
  useEffect(() => {
    if (countries.length === 1) {
      var key = process.env.REACT_APP_API_KEY
      var city = countries[0].capital[0].normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
      .then(resp => setWeather(resp.data))
    }
  }, [countries])

  return (
    <div className="App">
      <Input findCountry={findCountry}/>
      <p>find countries</p>

      {
        countries.length === 1 ?
        countries.map((country) => 
          <div key={country}> 
            <p>{country.name.common}</p>
            <p>Capital: {country.capital}</p>
            <img src={country.flags.png}/>

            {
              weather ? 
                <div key={weather.id}>
                  <p>temperature {(weather.main.temp - 273.15).toFixed(2)} celcius</p>
                  {(weather.main.temp - 273.15).toFixed(2) < 18 ? <img src='https://openweathermap.org/img/wn/09d@2x.png'></img> : <img src='https://openweathermap.org/img/wn/02d@2x.png'></img>}
                  <p>wind: {weather.wind} m/s</p>
                </div>
            : null  
          }
          </div>
          )
        :
        <div>
          {
          countries.length < 10 ? 
            countries.map((country) => 
              <p>{country.name.common}</p>
            )
            :
            <p>too many matches, specify another filter</p>
          }
        </div>
      }
    </div>
  );
}

export default App;
