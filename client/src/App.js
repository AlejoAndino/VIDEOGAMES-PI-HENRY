import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {


  return (
      <div className="App">
        <Nav/>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/home' element={<Home/>} />
        </Routes>
      </div>
  );
}

export default App;
