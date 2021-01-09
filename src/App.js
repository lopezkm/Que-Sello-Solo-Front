import React from 'react';
import { Route } from 'react-router-dom';
import FormBigModel from './components/formBigModel/formBigModel.jsx';
import FormPersonalData from './components/formPersonalData/formPersonalData.jsx';
import './App.css';

function App() {
  return (
    <div>
      <Route exact path ='/' render= {() => <FormBigModel/>}/> 
      <Route exact path ='/personalData' render= {() => <FormPersonalData/>}/> 
    </div>
  );
}

export default App;
