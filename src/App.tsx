import React from 'react';
import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import { ListProducts } from './pages/ListProducts';
import { Header } from './components/Header';
import { Rutes } from './routes/Rutes';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container-fluid">
          <Header />
          <div className="mt-4 container">
              <Rutes />
          </div>

        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
