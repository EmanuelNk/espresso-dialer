import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Equipment from './pages/Equipment';
import Beans from './pages/Beans';
import Shots from './pages/Shots';
import Stats from './pages/Stats';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/beans" element={<Beans />} />
              <Route path="/shots" element={<Shots />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </main>
    </div>
      </Router>
    </AppProvider>
  );
}

export default App;
