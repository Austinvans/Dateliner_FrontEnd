import './App.css';
import React, { useState, useEffect  } from 'react';
import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import RingLoader from "react-spinners/RingLoader";
import Home from './pages/Home';
import Timeliner from './pages/Timeliner';
import Customer from './pages/Customer';
import Entreprise from './pages/Entreprise';
import Reminder from './pages/Reminder';
import Login from './pages/Login';


function App() {
  const[loading, setLoading] = useState(false);
  useEffect(()=> {
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    }, 2000)
  },[])
  return (
    <div class="wrapper">  
      {loading?
        <div class="Spinner"> 
          <RingLoader
            size={85}
            color={'#36d7b7'}
            loading={loading}
          />
        </div> 
      :
      (
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Login}/> 
            <Route path='/home' exact component={Home}/> 
            <Route path='/contracts' exact component={Timeliner}/> 
            <Route path='/customers' exact component={Customer}/> 
            <Route path='/reminders' exact component={Reminder}/> 
            <Route path='/about' exact component={Entreprise}/> 
          </Switch> 
        </BrowserRouter>
      )
      }
      
    </div>
  );
}

export default App;
