import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Encuestas from './pages/Surveys/Surveys';
import DetalleEncuesta from './pages/SurveysDetail/SurveysDetail';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/encuestasHenry" element={<Home />} />
        <Route path="/encuestasHenry/encuestas" element={<Encuestas />} />
        <Route path="/encuestasHenry/encuestas/:id" element={<DetalleEncuesta />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
