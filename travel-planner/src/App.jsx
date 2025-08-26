import { Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home';
import About from './pages/About';
import Trips from './pages/Trips';
import Login from './pages/Login';
import TripDetails from './pages/TripDetails';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={ <About /> }></Route>
          <Route path="/trips" element={<Trips />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/trips/:name" element={ <TripDetails /> }></Route>
          <Route path="/profile" element={<Profile />} ></Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App
