import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const BorrowReturnPage = ()=>{
    
    useEffect(() => {
        fetch('http://localhost:8080/api/Bbr/all')
            .then(response => response.json())
            .then(data => setBbrs(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const fetchBbrs = () => {
        fetch('http://localhost:8080/api/Bbr/all')
            .then(response => response.json())
            .then(data => setBbrs(data))
            .catch(error => console.error('Error fetching Bbrs:', error));
    };

    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [bbrs, setBbrs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [newBbr, setNewBbr] = useState({maghichep: '', mathanhvien: '', masach: '',
        ngaymuon: '',ngayhentra: '', ngaytra: '', trangthai: ''
    });
    const [editBbrId, setEditBbrId] = useState(null);
    const [deleteBbrId, setDeleteBbrId] = useState(null); 


    const [memberName, setMemberName] = useState('');
    const [bookName, setBookName] = useState('');

    useEffect(() => {
        // Lấy danh sách sách
        fetch('http://localhost:8080/api/books/all')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    
        // Lấy danh sách thành viên
        fetch('http://localhost:8080/api/members/all')
            .then(response => response.json())
            .then(data => setMembers(data))
            .catch(error => console.error('Error fetching members:', error));
    }, []);

    const getBookName = (bookId) => {
        const book = books.find(b => b.masach == bookId);
        return book ? book.tieude : 'Không tìm thấy tên sách'; 
    };
    
    const getMemberName = (memberId) => {
        const member = members.find(m => m.mathanhvien == memberId);
        return member ? member.hoten : 'Không tìm thấy thành viên'; 
    };

    useEffect(() => {
        setMemberName(getMemberName(newBbr.mathanhvien));
    }, [newBbr.mathanhvien, members]); // Phụ thuộc vào mathanhvien và members

    // Update book name when masach changes
    useEffect(() => {
        setBookName(getBookName(newBbr.masach));
    }, [newBbr.masach, books]); // Phụ thuộc vào masach và books

    const handleBookChange = (e) => {
        const masach = e.target.value;
        const selectedBook = books.find(book => 
            String(book.masach).startsWith(masach) // Chuyển masach thành chuỗi
        );
        setNewBbr(prevState => ({
            ...prevState,
            masach,
            tieude: selectedBook ? selectedBook.tieude : '' // Thêm tieude vào newBbr
        }));
        setBookName(selectedBook ? selectedBook.tieude : ''); // Hiển thị tiêu đề sách
    };
    
    
    const handleMemberChange = (e) => {
        const mathanhvien = e.target.value;
        const selectedMember = members.find(member => 
            String(member.mathanhvien).startsWith(mathanhvien) // Chuyển mathanhvien thành chuỗi
        );
        setNewBbr(prevState => ({
            ...prevState,
            mathanhvien,
            hoten: selectedMember ? selectedMember.hoten : '' // Thêm hoten vào newBbr
        }));
        setMemberName(selectedMember ? selectedMember.hoten : ''); // Hiển thị tên thành viên
    };
    

    const handleAddOrEditBbr = () => {
        const currentDate = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại ở định dạng yyyy-MM-dd
    
        if (newBbr.mathanhvien && newBbr.masach && newBbr.ngaymuon && newBbr.ngayhentra && newBbr.trangthai) {
            // Kiểm tra ngày mượn và ngày hẹn trả
            if (newBbr.ngaymuon > currentDate) {
                toast.warn('Ngày mượn không được lớn hơn ngày hiện tại!');
                return;
            }
    
            if (newBbr.ngayhentra < currentDate) {
                toast.warn('Ngày hẹn trả không được nhỏ hơn ngày hiện tại!');
                return;
            }
    
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing
                ? `http://localhost:8080/api/Bbr/update/${editBbrId}`
                : 'http://localhost:8080/api/Bbr/add';
    
            fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBbr),
            })
                .then(response => {
                    if (response.ok) {
                        return response.text().then(text => {
                            const savedBbr = text ? JSON.parse(text) : null;
                            if (savedBbr) {
                                fetchBbrs(); // Gọi lại API sau khi lưu thành công
                            }
                            resetForm();
                            console.log(JSON.stringify(bbrs));
                            toast.success('Phiếu mượn sách đã được lưu thành công!');
                        });
                    } else {
                        console.error('Error saving Bbr:', response);
                        toast.error('Số lượng sách không đủ. Vui lòng kiểm tra lại.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    toast.error('Số lượng sách không đủ. Vui lòng kiểm tra lại.');
                });
        } else {
            toast.warn('Vui lòng điền đầy đủ thông tin phiếu mượn!');
        }
    };
    
    
    
    const handleDeleteBook = () => {
        fetch(`http://localhost:8080/api/Bbr/delete/${deleteBbrId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setBbrs(bbrs.filter(bbr => bbr.maghichep !== deleteBbrId));
                setShowDeleteModal(false); // Đóng modal sau khi xóa
                toast.success('Xóa phiếu ghi thành công')
            } else {
                console.error('Error deleting book:', response);
                toast.error('Phiếu ghi chép này không thể xóa do có ràng buộc')
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const openDeleteModal = (id) => {
        setDeleteBbrId(id); // Lưu lại ID của cuốn sách cần xóa
        setShowDeleteModal(true); // Hiển thị modal xác nhận xóa
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false); // Đóng modal xác nhận xóa
    };
    const handleEditBbr = (bbr) => {
        setNewBbr(bbr);
        setEditBbrId(bbr.maghichep);
        setIsEditing(true);
        setShowModal(true);
    };
    const resetForm = () => {
        setShowModal(false);
        setIsEditing(false);
        setNewBbr({maghichep: '', mathanhvien: '', masach: '',
            ngaymuon: '',ngayhentra: '', ngaytra: '', trangthai: '' });

        const formElement = document.querySelector('.needs-validation');
            if (formElement) {
                formElement.classList.remove('was-validated');
            }
        setShowModal(false); // Đóng modal
    };
    
    const filteredBbrs = bbrs.filter(bbr =>
        String(bbr.maghichep).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getMemberName(bbr.mathanhvien).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getBookName(bbr.masach).toLowerCase().includes(searchTerm.toLowerCase())
    );
    

    return(
        <div className="container mt-5">
            <h2 className="text-center mb-4 "><i className="bi bi-journal-album"></i> QUẢN LÝ MƯỢN TRẢ SÁCH</h2>

            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Tìm kiếm phiếu ghi..."     
                    onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa khi người dùng nhập
            
                />
            </div>

            <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
                + Thêm phiếu mượn
            </button>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên người mượn</th>
                        <th>Tên sách</th>
                        <th>Ngày mượn</th>
                        <th>Ngày hẹn trả</th>
                        <th>Ngày trả</th>
                        <th className='text-center'>Trạng thái</th>
                        <th className='aciton-col'>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBbrs.map(bbr => (
                        <tr key={bbr.maghichep}>
                            <td>{bbr.maghichep}</td>
                            <td>{getMemberName(bbr.mathanhvien)}</td>
                            <td>{getBookName(bbr.masach)}</td>
                            <td>{bbr.ngaymuon}</td>
                            <td>{bbr.ngayhentra}</td>
                            <td>{bbr.ngaytra}</td>
                            <td>
                                <div className={`alert ${bbr.trangthai === 'Đã trả' ? 'alert-success' : 'alert-warning'} text-center mb-0`} role="alert">
                                    {bbr.trangthai}
                                </div>
                            </td>

                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEditBbr(bbr)}><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger " disabled={bbr.trangthai ==="Đang mượn"} onClick={() => openDeleteModal(bbr.maghichep)}><i className="bi bi-trash-fill"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal thêm sửa*/}

            <form 
                className="row g-3 needs-validation" 
                noValidate 
                onSubmit={(e) => { 
                    e.preventDefault(); 
                    if (e.target.checkValidity()) {
                        handleAddOrEditBbr(); // Chỉ gọi hàm này nếu form hợp lệ
                    } else {
                        e.target.classList.add('was-validated');
                    }
                }}
            >
                <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} 
                    tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
                    <div className="modal-dialog">
                        <div className="modal-content custom-modal-width">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{isEditing ? 'Sửa phiếu mượn' : 'Thêm phiếu mượn mới'}</h5>
                                <button type="button" className="btn-close" onClick={resetForm}></button>
                            </div>
                            
                            <div className="modal-body">
                                
                                <div className="justify-content-between">

                                    <div className="form-floating w-100 mb-1">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Mã thành viên"
                                            value={newBbr.mathanhvien}
                                            onChange={handleMemberChange}
                                            
                                            required
                                        />
                                        <label>Mã thành viên</label>
                                        <div className="invalid-feedback">Vui lòng nhập mã thành viên</div>
                                    </div>
                                    <div className="form-text mb-3">Tên thành viên: {memberName}</div>
                                </div>

                                <div className="justify-content-between">

                                    <div className="form-floating w-100 mb-1">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Tên sách"
                                            value={newBbr.masach}
                                            onChange={handleBookChange} 
                                            required
                                        />
                                        <label>Mã sách</label>
                                        <div className="invalid-feedback">Vui lòng nhập mã sách</div>
                                    </div>
                                    <div className="form-text mb-3">Tên sách: {bookName}</div>
                                </div>

                                <div className='d-flex justify-content-between'>
                                    <div className="form-floating mb-3 w-100 position-relative">
                                        <input 
                                                type='date'
                                                placeholder=""
                                                value={newBbr.ngaymuon}
                                                className="form-control" 
                                                onChange={(e) => setNewBbr({ ...newBbr, ngaymuon: e.target.value })}
                                                required
                                            />
                                        <label>Ngày mượn</label>
                                        <div className="invalid-feedback">
                                            Vui lòng chọn ngày mượn
                                        </div>
                                    </div>

                                    <div className="form-floating mb-3 w-100 position-relative ms-2">
                                        <input 
                                                type='date'
                                                placeholder=""
                                                value={newBbr.ngayhentra}
                                                className="form-control" 
                                                onChange={(e) => setNewBbr({ ...newBbr, ngayhentra: e.target.value })}
                                                required
                                            />
                                        <label>Ngày hẹn trả</label>
                                        <div className="invalid-feedback">
                                            Vui lòng chọn ngày hẹn trả
                                        </div>
                                    </div>
                                </div>

                               
                                <div className="form-floating mb-3 w-100 position-relative">
                                    <input 
                                            type='date'
                                            placeholder=""
                                            value={newBbr.ngaytra}
                                            className="form-control" 
                                            onChange={(e) => setNewBbr({ ...newBbr, ngaytra: e.target.value })}
                                        />
                                    <label>Ngày trả</label>
                                </div>

                                <div className="mb-3 w-100">
                                    <select 
                                         className="form-select" 
                                         value={newBbr.trangthai}
                                         onChange={(e) => setNewBbr({ ...newBbr, trangthai: e.target.value })}
                                         required
                                    >
                                        <option value="" disabled>Trạng thái</option>
                                        <option value="Đang mượn" disabled={newBbr.ngaytra !== "" && newBbr.ngaytra !== null} >Đang mượn</option>
                                        <option value="Đã trả" disabled={newBbr.ngaytra === "" || newBbr.ngaytra === null}>Đã trả</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Vui lòng chọn trạng thái.
                                    </div>
                                </div>
                                                    
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>Đóng</button>
                                <button type="submit" className="btn btn-primary">
                                    {isEditing ? 'Cập nhật phiếu' : 'Thêm phiếu'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/*END Modal thêm sửa*/}

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
                                Bạn có chắc chắn muốn xóa phiếu ghi này không?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Hủy</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteBook}>Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/*end modal xóa*/}
            {showDeleteModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
    
}
export default BorrowReturnPage;