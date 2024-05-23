import { useState, useEffect } from 'react'
import api from './api';
import './App.css'
import Catalog from './Catalog';
import Navbar from './Navbar';

function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    api.get(`/product`, {
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
