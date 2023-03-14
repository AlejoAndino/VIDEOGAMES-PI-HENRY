import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Form from './components/Form/Form';
import Detail from './components/Detail/Detail';

function App() {


  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/creategame' element={<Form />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
