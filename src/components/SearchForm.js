import {  useState } from "react";

const SearchForm = () => {
  const [cityInput, setCityInput] = useState('');
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const [max, setMax ] = useState('');
  const [min, setMin] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [description, setDescription] = useState('');
  const [isShown, setIsShown] = useState(false);

  const getInputValue = (e) => {
    setCityInput(e.target.value);
  }

  const handleSubmit = () => {

    if (cityInput === '') {
      alert('Please enter a city!');
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=2c88866fe856a242bfd0983d64aff2bf&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        setCity(data.name)
        setDescription(data.weather[0].description)
        setTemp(data.main.temp.toFixed())
        setMax(data.main.temp_max.toFixed())
        setMin(data.main.temp_min.toFixed())
        setWindSpeed(data.wind.speed.toFixed())
        setCityInput('');
        setIsShown(true);
      });

  }

  return (
    <div className="weather-section" >
      <div className="search-form">
        <input
          type="text"
          placeholder="Enter a city.."
          value={cityInput}
          onChange={getInputValue}
        />
        <button onClick={handleSubmit} className="search-btn">SUBMIT</button>
      </div>
      <div className="weather-info" style={{ display: isShown ? 'block' : 'none' }}>
        {city && <h3>{city}</h3>}
        {temp && <h1>{temp}°</h1>}
        {description && <p>{description[0].toUpperCase() + description.substring(1)}</p>}
        {max && <p>Max: {max}°</p>}
        {min && <p>Min: {min}°</p>}
        {windSpeed && <p>Wind Speed: {windSpeed} km/h</p>}

      </div>
    </div>
   );
}

export default SearchForm;
