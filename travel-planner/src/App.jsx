import { Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home';
import About from './pages/About';
import Trips from './pages/Trips';
import Login from './pages/Login';
import TripDetails from './pages/TripDetails';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="trips" element={ <Trips /> } />
          <Route path="trips/:name" element={<TripDetails />} />
          <Route path="profile" element={<Profile />} />
        </Route>

      </Routes>
    </>
  );
}

export default App
