import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import MainPage from './pages/MainPage/index';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import Header from './components/Header';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="" element={<MainPage />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
