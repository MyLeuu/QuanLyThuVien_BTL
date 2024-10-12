import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import BooksPage from '../src/pages/Books/index.js';
import UsersPage from '../src/pages/Users/index.js';
import BorrowReturnPage from './pages/BorrowReturn/index.js';
import AuthorsPage from '../src/pages/Authors/index.js';
import CategoriesPage from '../src/pages/Categories/index.js';
import MembersPage from '../src/pages/Members/index.js';
import PublicShersPage from '../src/pages/Publicshers/index.js';
import LoginPage from '../src/pages/login/index.js';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserRole('');
  };

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      ) : (
        <>
          <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} userRole={userRole} />
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/users" element={userRole === 'Quản trị viên' ? <UsersPage /> : <BooksPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/borrow-return" element={<BorrowReturnPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/publicshers" element={<PublicShersPage />} />
          </Routes>
        </>
      )}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
