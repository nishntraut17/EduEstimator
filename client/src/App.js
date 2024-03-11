import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Add from './pages/Add';
import Predict from './pages/Predict';
import RootLayout from './pages/RootLayout';

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/predict' element={<Predict />} />
          <Route path="/add" element={<Add />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
