import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css'

function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:80/product`, {
            }).then((res) => res.data).then(data => {
                setPersons(data);
            }).catch((error) => {
                console.log(error);
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
