import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css'

function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:80/')
      .then(res => {
        const personsData = res.data;
        console.log(personsData);
        setPersons(personsData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect will only run once after the component mounts

  return (
    <div>
      {/* Render your data here */}
      {persons.map(person => (
        <div key={person.ProductID}>
          <p>Name: {person.ProductName}</p>
          <p>Price: {person.UnitPrice}</p>
          {/* Render other properties as needed */}
        </div>
      ))}
    </div>
  );
}

export default App
