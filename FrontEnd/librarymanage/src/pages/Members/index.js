import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const MembersPage = ()=>{
    useEffect(() => {
        fetch('http://localhost:8080/api/members/all')
            .then(response => response.json())
            .then(data => setMembers(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);


    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [newMember, setNewMember] = useState({mathanhvien: '',hoten: '',email: '', sodienthoai: '',
        diachi: '',ngaydangkythanhvien: ''
    });
    const [editMemberId, setEditMemberId] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteMemberId, setDeleteMemberId] = useState(null); 

    const handleSearchChange = (e) => setSearch(e.target.value);

    const handleAddOrEditMember = () => {
        const currentDate = new Date().toISOString().split('T')[0]; 
        // Kiểm tra các thuộc tính của newMember
        if (newMember.hoten && newMember.email && newMember.sodienthoai && newMember.diachi 
            && newMember.ngaydangkythanhvien) {
            
            // Kiểm tra email đã tồn tại trong mảng members
            const emailExists = members.some(member => member.email === newMember.email && member.mathanhvien !== editMemberId);
            
            if (emailExists) {
                toast.error("Email đã tồn tại trong hệ thống!");
                return; // Ngăn chặn việc tiếp tục thêm hoặc sửa nếu email đã tồn tại
            }
            else if (newMember.ngaydangkythanhvien > currentDate) {
                toast.warn('Ngày đăng ký không được lớn hơn ngày hiện tại!');
                return;
            }
    
            // Tiếp tục thêm/sửa nếu email không tồn tại
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing 
                ? editMemberId 
                    ? `http://localhost:8080/api/members/update/${editMemberId}` 
                    : null // Không có editMemberId
                : 'http://localhost:8080/api/members/add';
            
            if (!url) {
                toast.error('Không thể cập nhật vì ID không hợp lệ.');
                console.log(editMemberId);
                return;
            }
    
            fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMember),
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(savedMember => {
                        if (isEditing) {
                            setMembers(members.map(member => (member.mathanhvien === editMemberId ? savedMember : member)));
                        } else {
                            setMembers([...members, savedMember]);
                        }
                        resetForm(); // Gọi resetForm sau khi thêm hoặc cập nhật thành công
                        
                        // Hiển thị thông báo thành công
                        toast.success('Người dùng đã được lưu thành công!');
                    });
                } else {
                    console.error('Error saving member:', response);
                    console.log(JSON.stringify(newMember));
    
                    // Hiển thị thông báo lỗi
                    toast.error('Có lỗi xảy ra khi lưu người dùng. Vui lòng thử lại.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
    
                // Hiển thị thông báo lỗi
                toast.error('Có lỗi xảy ra khi lưu người dùng. Vui lòng thử lại.');
            });
        } else {
            // Hiển thị thông báo lỗi nếu thiếu thông tin
            toast.warn('Vui lòng điền đầy đủ thông tin người dùng!');
            console.log(JSON.stringify(newMember)); // In ra thông tin để kiểm tra
        }
    };
    

    const handleDeleteMember = () => {
        fetch(`http://localhost:8080/api/members/delete/${deleteMemberId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setMembers(members.filter(member => member.mathanhvien !== deleteMemberId));
                setShowDeleteModal(false); // Đóng modal sau khi xóa
                toast.success('Xóa thành viên thành công')
            } else {
                console.error('Error deleting book:', response);
                toast.error('Thành viên này không thể xóa do có ràng buộc')
            }
        })
        .catch(error => console.error('Error:', error));
    };
    const openDeleteModal = (id) => {
        setDeleteMemberId(id); // Lưu lại ID của cuốn sách cần xóa
        setShowDeleteModal(true); // Hiển thị modal xác nhận xóa
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false); // Đóng modal xác nhận xóa
    };
    const handleEditMember = (member) => {
        setNewMember(member);
        setEditMemberId(member.mathanhvien);
        setIsEditing(true);
        setShowModal(true);
    };

    const resetForm = () => {
        setShowModal(false);
        setIsEditing(false);
        setNewMember({mathanhvien: '',hoten: '',email: '', sodienthoai: '',
            diachi: '',ngaydangkythanhvien: ''
        });
        const formElement = document.querySelector('.needs-validation');
            if (formElement) {
                formElement.classList.remove('was-validated');
            }
    };

    return(
        <div className="container mt-5">
            <h2 className="text-center mb-4"><i className="bi bi-people"></i> QUẢN LÝ THÀNH VIÊN</h2>

            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Tìm kiếm thành viên..." 
                    value={search} 
                    onChange={handleSearchChange} 
                />
            </div>

            <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
                Thêm thành viên
            </button>

            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Ngày đăng ký</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {members.filter(member => member.hoten.toLowerCase().includes(search.toLowerCase())).map(member => (
                        <tr key={member.mathanhvien}>
                            <td>{member.mathanhvien}</td>
                            <td>{member.hoten}</td>
                            <td>{member.email}</td>
                            <td>{member.sodienthoai}</td>
                            <td>{member.diachi}</td>
                            <td>{member.ngaydangkythanhvien}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() =>handleEditMember(member)}><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger" onClick={() => openDeleteModal(member.mathanhvien)}><i className="bi bi-trash-fill"></i></button>
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
                                    handleAddOrEditMember(); // Chỉ gọi hàm này nếu form hợp lệ
                                } else {
                                    e.target.classList.add('was-validated');
                                }
                            }}>
                            <div className="modal-body">
                                <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        placeholder=""
                                        value={newMember.hoten}
                                        className="form-control" 
                                        onChange={(e) => setNewMember({ ...newMember, hoten: e.target.value })}
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
                                        value={newMember.email}
                                        className="form-control" 
                                        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
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
                                        value={newMember.sodienthoai}
                                        className="form-control" 
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            // Kiểm tra độ dài và giá trị
                                            if (value.length <= 10) {
                                                setNewMember({ ...newMember, sodienthoai: value });
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
                                            type='text'
                                            placeholder=""
                                            value={newMember.diachi}
                                            className="form-control" 
                                            onChange={(e) => setNewMember({ ...newMember, diachi: e.target.value })}
                                            required
                                        />
                                        <label>Địa chỉ</label>
                                        <div className="invalid-feedback">
                                            Vui lòng nhập địa chỉ.
                                        </div>
                                    </div>
                                </div>

                                <div className="form-floating mb-3 w-100 position-relative">
                                    <input 
                                            type='date'
                                            placeholder=""
                                            value={newMember.ngaydangkythanhvien}
                                            className="form-control" 
                                            onChange={(e) => setNewMember({ ...newMember, ngaydangkythanhvien: e.target.value })}
                                            required
                                        />
                                    <label>Ngày đăng ký</label>
                                    <div className="invalid-feedback">
                                        Vui lòng chọn ngày đăng ký
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
                                Bạn có chắc chắn muốn xóa thành viên này không?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Hủy</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteMember}>Xóa</button>
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
export default MembersPage;