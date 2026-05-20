import './App.css';
import Login from './pages/Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState } from 'react';
import Refresh from './pages/Refresh';

function App() {
  const [isAuthentiated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({element}) => {
    return isAuthentiated ? element : <Navigate to="/login" />
  }

  return (
    <div className='App'>
      <Refresh setIsAuthenticated={setIsAuthenticated} />
    <Routes>
      <Route path='/' element={<Navigate to="/login"/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<PrivateRoute element={<Home />} />} />
    </Routes>
    </div>
  );
}

export default App;
