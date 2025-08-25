import { Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home';
import About from './pages/About';
import Trips from './pages/Trips';
import Login from './pages/Login';
import TripDetails from './pages/TripDetails';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<ProtectedRoute>  <About /> </ProtectedRoute>}></Route>
          <Route path="/trips" element={<ProtectedRoute> <Trips /> </ProtectedRoute>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/trips/:name" element={<ProtectedRoute> <TripDetails /> </ProtectedRoute>}></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App
