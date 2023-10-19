//imports
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import Appointments from './components/Appointments';
import CreateNewAdmin from './components/CreateNewAdmin';

function App() {
  {/* creating routes */}
  return ( 
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/appointments' element={<Appointments />}></Route>
        <Route path='/admin-login' element={<AdminLogin />}></Route>
        <Route path='/admin-dashboard' element={<AdminDashboard />}></Route>
        <Route path='/create-new-admin' element={<CreateNewAdmin />}></Route>
      </Routes>
    </div>
  );
}

export default App;
