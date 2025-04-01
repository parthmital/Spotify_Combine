import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import AdminDashboard from './AdminDashboard';
import Homepage from './HomePage';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, email: 'admin@spotify.com', password: 'admin123', role: 'admin' },
    { id: 2, email: 'user@spotify.com', password: 'user123', role: 'user' }
  ]);

  const AppRoutes = () => {
    const navigate = useNavigate();

    const handleLogin = async ({ email, password }) => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setCurrentUser(user);
        navigate(user.role === 'admin' ? '/admin' : '/home');
        return true;
      }
      return false;
    };

    const handleSignUp = async (email, password) => {
      const newUser = {
        id: Date.now(),
        email,
        password,
        role: 'user'
      };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      navigate('/home');
      return true;
    };

    const handleLogout = () => {
      setCurrentUser(null);
      navigate('/login');
    };

    // Admin CRUD operations
    const addUser = (email, password, role) => {
      const newUser = { id: Date.now(), email, password, role };
      setUsers([...users, newUser]);
    };

    const updateUser = (id, updatedUser) => {
      setUsers(users.map(user => user.id === id ? { ...user, ...updatedUser } : user));
    };

    const deleteUser = (id) => {
      setUsers(users.filter(user => user.id !== id));
    };

    return (
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login route */}
        <Route path="/login" element={
          !currentUser ? (
            <Login
              onLogin={handleLogin}
              onNavigateToSignUp={() => navigate('/signup')}
            />
          ) : (
            <Navigate to={currentUser.role === 'admin' ? '/admin' : '/home'} replace />
          )
        } />

        {/* Signup route */}
        <Route path="/signup" element={
          !currentUser ? (
            <SignUp
              onSignUp={handleSignUp}
              onNavigateToLogin={() => navigate('/login')}
            />
          ) : (
            <Navigate to={currentUser.role === 'admin' ? '/admin' : '/home'} replace />
          )
        } />

        {/* Admin dashboard */}
        <Route path="/admin" element={
          currentUser?.role === 'admin' ? (
            <AdminDashboard
              users={users}
              onAddUser={addUser}
              onUpdateUser={updateUser}
              onDeleteUser={deleteUser}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        } />

        {/* Homepage for regular users */}
        <Route path="/home" element={
          currentUser && currentUser.role !== 'admin' ? (
            <Homepage user={currentUser} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        } />

        {/* Catch-all route */}
        <Route path="*" element={
          <Navigate to={currentUser ?
            (currentUser.role === 'admin' ? '/admin' : '/home')
            : '/login'}
            replace />
        } />
      </Routes>
    );
  };

  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;