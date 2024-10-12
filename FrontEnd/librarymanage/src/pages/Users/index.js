import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Đảm bảo bạn đã có thư viện bootstrap-icons


const UsersPage = () =>{


    useEffect(() => {
        fetch('http://localhost:8080/api/users/all')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [newUser, setNewUser] = useState({ manguoidung:'',hoten: '',email: '',
        vaitro: '',sodienthoai: '',matkhau: '' });
    const [editUserId, setEditUserId] = useState(null);


    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null); 

    const handleSearchChange = (e) => setSearch(e.target.value);

    const handleAddOrEditUser = () => {
    if (newUser.hoten && newUser.email && newUser.vaitro && newUser.sodienthoai && newUser.matkhau) {
        // Kiểm tra email đã tồn tại trong mảng users
        const emailExists = users.some(user => user.email === newUser.email && user.manguoidung !== editUserId);
        
        if (emailExists) {
            toast.error("Email đã tồn tại trong hệ thống!");
            return; // Ngăn chặn việc tiếp tục thêm hoặc sửa nếu email đã tồn tại
        }

        // Tiếp tục thêm/sửa nếu email không tồn tại
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing 
            ? editUserId 
                ? `http://localhost:8080/api/users/update/${editUserId}` 
                : null
            : 'http://localhost:8080/api/users/add';
        
        if (!url) {
            toast.error('Không thể cập nhật vì ID không hợp lệ.');
            return;
        }

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        })
        .then(response => {
            if (response.ok) {
                response.json().then(savedUser => {
                    if (isEditing) {
                        setUsers(users.map(user => (user.manguoidung === editUserId ? savedUser : user)));
                    } else {
                        setUsers([...users, savedUser]);
                    }
                    resetForm();
                    toast.success('Người dùng đã được lưu thành công!');
                });
            } else {
                toast.error('Có lỗi xảy ra khi lưu người dùng.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            toast.error('Có lỗi xảy ra khi lưu người dùng.');
        });
    } else {
        toast.warn('Vui lòng điền đầy đủ thông tin người dùng!');
    }
};

    

    const handleDeleteUser = () => {
        fetch(`http://localhost:8080/api/users/delete/${deleteUserId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setUsers(users.filter(user => user.manguoidung !== deleteUserId));
                setShowDeleteModal(false); // Đóng modal sau khi xóa
                toast.success('Xóa người dùng thành công')
            } else {
                console.error('Error deleting book:', response);
                toast.error('Người dùng này không thể xóa')
            }
        })
        .catch(error => console.error('Error:', error));
    };
    
    const openDeleteModal = (id) => {
        setDeleteUserId(id); // Lưu lại ID của cuốn sách cần xóa
        setShowDeleteModal(true); // Hiển thị modal xác nhận xóa
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false); // Đóng modal xác nhận xóa
    };

    const handleEditUser = (user) => {
        setNewUser(user);
        setEditUserId(user.manguoidung);
        setIsEditing(true);
        setShowModal(true);
    };

    const resetForm = () => {
        setShowModal(false);
        setIsEditing(false);
        setNewUser({ manguoidung:'',hoten: '',email: '',
            vaitro: '',sodienthoai: '',matkhau: '' });
        setShowPassword(false)
        const formElement = document.querySelector('.needs-validation');
            if (formElement) {
                formElement.classList.remove('was-validated');
            }
    };
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
      };
    
    return(
       <div className="container mt-5">
            <h2 className="text-center mb-4"><i className="bi bi-person-vcard"></i> QUẢN LÝ NGƯỜI DÙNG</h2>

            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Tìm kiếm người dùng..." 
                    value={search} 
                    onChange={handleSearchChange} 
                />
            </div>

            <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
                Thêm người dùng
            </button>

            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th className='text-center'>Vai trò</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.filter(user => user.hoten.toLowerCase().includes(search.toLowerCase())).map(user => (
                        <tr key={user.manguoidung}>
                            <td>{user.manguoidung}</td>
                            <td>{user.hoten}</td>
                            <td>{user.email}</td>
                            <td>{user.sodienthoai}</td>
                            <td>
                                <div className={`alert ${user.vaitro === 'Quản trị viên' ? 'alert-danger' : 'alert-info'} text-center mb-0`} role="alert">
                                    {user.vaitro}
                                </div>
                            </td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() =>handleEditUser(user)}><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger" onClick={() => openDeleteModal(user.manguoidung)} disabled={user.vaitro === 'Quản trị viên'}>
                                    <i className="bi bi-trash-fill"></i>
                                </button>                           
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal Thêm/Sửa người dùng*/}

            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} 
                tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content custom-modal-width">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{isEditing ? 'Sửa người dùng' : 'Thêm người dùng mới'}</h5>
                            <button type="button" className="btn-close" onClick={resetForm}></button>
                        </div>

                        {/* Form with Bootstrap validation */}
                        <form className="row g-3 needs-validation" 
                            noValidate 
                            onSubmit={(e) => { 
                                e.preventDefault(); 
                                if (e.target.checkValidity()) {
                                    handleAddOrEditUser(); // Chỉ gọi hàm này nếu form hợp lệ
                                } else {
                                    e.target.classList.add('was-validated');
                                }
                            }}>
                            <div className="modal-body">
                                <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        placeholder=""
                                        value={newUser.hoten}
                                        className="form-control" 
                                        onChange={(e) => setNewUser({ ...newUser, hoten: e.target.value })}
                                        required
                                    />  
                                    <label>Họ và tên</label>
                                    <div className="invalid-feedback">
                                        Vui lòng nhập họ và tên.
                                    </div>
                                </div>

                                <div className="form-floating mb-3">
                                    <input 
                                        type="email" 
                                        placeholder=""
                                        value={newUser.email}
                                        className="form-control" 
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        required
                                    />
                                    <label>Email</label>
                                    <div className="invalid-feedback">
                                        Vui lòng nhập email hợp lệ.
                                    </div>
                                </div>

                                <div className="form-floating mb-3">
                                    <input 
                                        type="number" 
                                        placeholder=""
                                        value={newUser.sodienthoai}
                                        className="form-control" 
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            // Kiểm tra độ dài và giá trị
                                            if (value.length <= 10) {
                                                setNewUser({ ...newUser, sodienthoai: value });
                                            }
                                        }}
                                        required
                                    />
                                    <label>Số điện thoại</label>
                                    <div className="invalid-feedback">
                                        Vui lòng nhập số điện thoại có đủ 10 số.
                                    </div>
                                </div>

                                <div>
                                    <div className="form-floating mb-3 position-relative">
                                        <input 
                                            type={showPassword ? 'text' : 'password'} 
                                            placeholder=""
                                            value={newUser.matkhau}
                                            className="form-control" 
                                            onChange={(e) => setNewUser({ ...newUser, matkhau: e.target.value })}
                                            required
                                        />
                                        <label>Mật khẩu</label>
                                        <div className="invalid-feedback">
                                            Vui lòng nhập mật khẩu.
                                        </div>
                                        <i 
                                            className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y me-3`} 
                                            style={{ cursor: 'pointer' }} 
                                            onClick={togglePasswordVisibility}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3 w-100">
                                    <select 
                                        className="form-select" 
                                        value={newUser.vaitro}
                                        onChange={(e) => setNewUser({ ...newUser, vaitro: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>Vai trò</option>
                                        <option value="Quản trị viên">Quản trị viên</option>
                                        <option value="Thủ thư">Thủ thư</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Vui lòng chọn vai trò.
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>Đóng</button>
                                <button type="submit" className="btn btn-primary">
                                    {isEditing ? 'Cập nhật người dùng' : 'Thêm người dùng'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/*end modal thêm sửa*/}
            {showModal && <div className="modal-backdrop fade show"></div>} {/* Lớp phủ cho modal */}

            {/*end modal thêm sửa*/}
            {showModal && <div className="modal-backdrop fade show"></div>} {/* Lớp phủ cho modal */}

            {/* Modal xác nhận xóa */}
            {showDeleteModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">Xác nhận xóa</h5>
                                <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
                            </div>
                            <div className="modal-body">
                                Bạn có chắc chắn muốn xóa người dùng này không?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Hủy</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/*end modal xóa*/}

            {showDeleteModal && <div className="modal-backdrop fade show"></div>}
        </div>
    )
}
export default UsersPage;