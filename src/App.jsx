import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import Catalog from './Catalog';
import Navbar from './Navbar';

function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:80/product`, {
    }).then((res) => res.data).then(data => {
      setPersons(data);
    }).catch((error) => {
      console.log(error);
    });

  }, []);

  return (
    <>
      <Navbar />
      <Catalog />
    </>
  );
}

export default App
