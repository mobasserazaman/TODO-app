import Login from './pages/Login';
import Tasks from './pages/Tasks';
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './slices/authSlice';


const App = () => {
  // const { user, isLoading } = useAuth();
  //const { user, login, isLoading, logout } = useContext(AuthContext);

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.auth);


  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);


  if (loading === true) return;
  if (error) console.log(error);


  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />
      <Route path="/login" element={user ? <Navigate to={'/tasks'} /> : <Login />} />
      <Route path="/tasks" element={user ? <Tasks user={user}/> : <Navigate to={'/login'} />} />
    </Routes>
  );
};

export default App;


