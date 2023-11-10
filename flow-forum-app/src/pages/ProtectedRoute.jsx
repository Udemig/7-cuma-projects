import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // kullanıcın tokenini alma
  const token = localStorage.getItem('token');

  // kullanıcı yoksa logine yönlendir
  if (!token) return <Navigate to={'/login'} />;

  // alt route'u ekrana basar
  return <Outlet />;
};

export default ProtectedRoute;
