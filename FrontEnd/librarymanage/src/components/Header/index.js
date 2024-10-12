import React, { useReducer } from 'react';
import logo from '../../assets/logo_lib.png'; // Import ảnh từ thư mục cục bộ
import '../Header/Header.css';
import { Link } from 'react-router-dom';
import BooksPage from '../../pages/Books/index.js';
import UsersPage from '../../pages/Users/index.js';
import AuthorsPage from '../../pages/Authors/index.js';
import BorrowReturn from '../../pages/BorrowReturn/index.js';
import CategoriesPage from '../../pages/Categories/index.js';
import MembersPage from '../../pages/Members/index.js';
import PublicShersPage from '../../pages/Publicshers/index.js';

const Header = ({ onLogout, isLoggedIn, userRole }) => {
    const username = localStorage.getItem('username')
    return (
        <header>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid bg-primary">
                    <Link className="navbar-brand p-0 m-0" to="/">
                        <img src={logo}
                            width={80}
                            alt=''
                            height="auto"
                            style={{ margin: 0, padding: 0 }} />
                    </Link>
                    <div>
                        <span style={{ color: '#fff' }}>Xin chào {username}!</span>
                    </div>
                    <button className="navbar-toggler bg-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon bg-light"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item mb-3">
                                    <Link className="btn btn-primary w-100 fs-6 text-start" to="/books" element={<BooksPage />}>
                                        <i className="bi bi-book-fill"></i> Quản lý sách
                                    </Link>
                                </li>
                                <li className="nav-item mb-3">
                                    <Link className="btn btn-primary w-100 fs-6 text-start" to="/borrow-return" element={<BorrowReturn />}>
                                        <i className="bi bi-journal-album"></i> Quản lý trả mượn sách
                                    </Link>
                                </li>
                                <li className="nav-item mb-3">
                                    <Link className="btn btn-primary w-100 fs-6 text-start" to="/authors" element={<AuthorsPage />}>
                                        <i className="bi bi-person-badge-fill"></i> Quản lý tác giả
                                    </Link>
                                </li>
                                <li className="nav-item mb-3">
                                    <Link className="btn btn-primary w-100 fs-6 text-start" to="/categories" element={<CategoriesPage />}>
                                        <i className="bi bi-bookmark-dash-fill"></i> Quản lý danh mục
                                    </Link>
                                </li>
                                <li className="nav-item mb-3">
                                    <Link className="btn btn-primary w-100 fs-6 text-start" to="/publicshers" element={<PublicShersPage />}>
                                        <i className="bi bi-buildings-fill"></i> Quản lý nhà xuất bản
                                    </Link>
                                </li>
                                <li className="nav-item mb-3">
                                    <Link className="btn btn-primary w-100 fs-6 text-start" to="/members" element={<MembersPage />}>
                                        <i className="bi bi-people-fill"></i> Quản lý thành viên
                                    </Link>
                                </li>
                                {/* Hiển thị nút Quản lý người dùng nếu vai trò là "Quản trị viên" */}
                                {userRole === 'Quản trị viên' && (
                                    <li className="nav-item mb-3">
                                        <Link className="btn btn-primary w-100 text-start" to="/users" element={<UsersPage />}>
                                            <i className="bi bi-person-vcard-fill"></i> Quản lý người dùng
                                        </Link>
                                    </li>
                                )}
                                {/* Hiển thị nút Quản lý thành viên nếu vai trò là "Quản trị viên" */}
                                {userRole == 'Quản trị viên' && (
                                    <li className="nav-item mb-3">
                                        <Link className="btn btn-primary w-100 text-start" to="/members" element={<MembersPage />}>
                                            <i className="bi bi-people-fill"></i> Quản lý thành viên
                                        </Link>
                                    </li>
                                )}
                                {isLoggedIn && (
                                    <li className="nav-item mb-3">
                                        <button 
                                            className="btn btn-danger w-100 text-start" 
                                            onClick={onLogout}
                                        >
                                            <i className="bi bi-box-arrow-right"></i> Đăng xuất
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
