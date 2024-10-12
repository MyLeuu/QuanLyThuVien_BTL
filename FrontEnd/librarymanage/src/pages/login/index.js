import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/blacklogo_lib.png'; // Import logo từ thư mục cục bộ
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const loginData = {
            email: username,
            matkhau: password
        };

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            console.log('Response status:', response.status);
            const responseData = await response.json();
            console.log('Response data:', responseData);

            if (response.ok) {
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('role', responseData.vaitro);
                localStorage.setItem('username', responseData.hoten); // Lưu tên người dùng

                onLogin(responseData.vaitro);  // Call onLogin with the user role
                toast.success('Đăng nhập thành công!');
                navigate('/books');
            } else {
                if (response.status === 401 || response.status === 404) {
                    setErrorMessage('Email hoặc mật khẩu không đúng');
                } else {
                    setErrorMessage('Đã xảy ra lỗi: ' + responseData.message || 'vui lòng thử lại');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Email hoặc mật khẩu không đúng');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg" style={{ width: '25rem' }}>
                <div className="card-body p-5">
                    <div className="d-flex justify-content-center">
                        <img
                            src={logo}
                            width={80}
                            alt="Library logo"
                            height="auto"
                        />
                    </div>
                    <h3 className="text-center mb-4">Đăng nhập</h3>

                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Tên đăng nhập"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <label htmlFor="username">Email</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="password">Mật khẩu</label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-100"
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

