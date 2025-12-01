//import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Renewal from './components/Renewal';
import Training from './components/Training';
import Teams from './components/Teams';
import Products from './components/Products';
import Update from './components/Update';
import Layout from './layout/Layout';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />


        {/* All pages below will include sidebar automatically */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/renewal" element={<Renewal />} />
          <Route path="/training" element={<Training />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/products" element={<Products />} />
          <Route path="/update-db" element={<Update />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
