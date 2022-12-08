// General import
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components/pages import
import { Homepage } from './pages/Homepage';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

// CSS import
import './css/App.css';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
