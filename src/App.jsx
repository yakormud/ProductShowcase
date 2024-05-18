import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import Catalog from './Catalog';
import Navbar from './Navbar';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';

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

  
const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

  return (
    <>
      <Navbar />
      <Catalog />
      <AuthProvider store={store}>
        <RoutesComponent/>
      </AuthProvider>
    </>
  );
}

export default App
