import  React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
const AuthorsPage = ()=>{

    useEffect(() => {
        fetch('http://localhost:8080/api/authors/all')
            .then(response => response.json())
            .then(data => setAuthors(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const [authors, setAuthors] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    
    const [newAuthor, setNewAuthor] = useState({tieuSu: '',tenTacGia: '', maTacGia: ''});
    const [editAuthorId, setEditAuthorId] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteAuthorId, setDeleteAuthorId] = useState(null); 
    
    const handleSearchChange = (e) => setSearch(e.target.value);

    const handleAddOrEditAuthor = () => {
        // Kiểm tra các thuộc tính của newBook
        if (newAuthor.tenTacGia && newAuthor.tieuSu) {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing 
                ? editAuthorId 
                    ? `http://localhost:8080/api/authors/update/${editAuthorId}` 
                    : null // Không có editBookId
                : 'http://localhost:8080/api/authors/add';
            
            if (!url) {
                toast.error('Không thể cập nhật vì ID không hợp lệ.');
                console.log(editAuthorId)
                return;
            }
    
            fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAuthor),
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(savedAuthor => {
                        if (isEditing) {
                            setAuthors(authors.map(author => (author.maTacGia === editAuthorId ? savedAuthor : author)));
                        } else {
                            setAuthors([...authors, savedAuthor]);
                        }
                        resetForm(); // Gọi resetForm sau khi thêm hoặc cập nhật thành công
                        
                        // Hiển thị thông báo thành công
                        toast.success('Tác giả đã được lưu thành công!');
                    });
                } else {
                    console.error('Error saving book:', response);
                    console.log(JSON.stringify(newAuthor));
    
                    // Hiển thị thông báo lỗi
                    toast.error('Có lỗi xảy ra khi lưu tác giả. Vui lòng thử lại.');
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
            console.log(JSON.stringify(newAuthor)); // In ra thông tin để kiểm tra
        }
    };

    const handleDeleteAuthor = () => {
        fetch(`http://localhost:8080/api/authors/delete/${deleteAuthorId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setAuthors(authors.filter(author => author.maTacGia !== deleteAuthorId));
                setShowDeleteModal(false); // Đóng modal sau khi xóa
                toast.success('Xóa tác giả thành công')
            } else {
                console.error('Error deleting book:', response);
                toast.error('Tác giả này không thể xóa do có ràng buộc')
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const openDeleteModal = (id) => {
        setDeleteAuthorId(id); // Lưu lại ID của cuốn sách cần xóa
        setShowDeleteModal(true); // Hiển thị modal xác nhận xóa
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false); // Đóng modal xác nhận xóa
    };
    const handleEditAuthor = (author) => {
        setNewAuthor(author);
        setEditAuthorId(author.maTacGia);
        setIsEditing(true);
        setShowModal(true);
    };

    const resetForm = () => {
        setShowModal(false);
        setIsEditing(false);
        setNewAuthor({tieuSu: '',tenTacGia: '', maTacGia: ''});
        const formElement = document.querySelector('.needs-validation');
            if (formElement) {
                formElement.classList.remove('was-validated');
            }
    };
    //phần UI
    return(
        <div className="container mt-5">
            <h2 className="text-center mb-4"><i className="bi bi-person-badge"></i> QUẢN LÝ TÁC GIẢ</h2>

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
                Thêm tác giả
            </button>

            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên tác giả</th>
                        <th>Tiểu sử</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.filter(author => author.tenTacGia.toLowerCase().includes(search.toLowerCase())).map(author => (
                        <tr key={author.maTacGia}>
                            <td>{author.maTacGia}</td>
                            <td>{author.tenTacGia}</td>
                            <td>{author.tieuSu}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() =>handleEditAuthor(author)}><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger" onClick={() => openDeleteModal(author.maTacGia)}><i className="bi bi-trash-fill"></i></button>
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
                            <h5 className="modal-title" id="exampleModalLabel">{isEditing ? 'Sửa tác giả ' : 'Thêm tác giả mới'}</h5>
                            <button type="button" className="btn-close" onClick={resetForm}></button>
                        </div>

                        {/* Form with Bootstrap validation */}
                        <form className="row g-3 needs-validation" 
                            noValidate 
                            onSubmit={(e) => { 
                                e.preventDefault(); 
                                if (e.target.checkValidity()) {
                                    handleAddOrEditAuthor(); // Chỉ gọi hàm này nếu form hợp lệ
                                } else {
                                    e.target.classList.add('was-validated');
                                }
                            }}>
                            <div className="modal-body">
                                <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        placeholder=""
                                        value={newAuthor.tenTacGia}
                                        className="form-control" 
                                        onChange={(e) => setNewAuthor({ ...newAuthor, tenTacGia: e.target.value })}
                                        required
                                    />  
                                    <label>Tên tác giả</label>
                                    <div className="invalid-feedback">
                                        Vui lòng nhập tên tác giả.
                                    </div>
                                </div>

                                <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        placeholder=""
                                        value={newAuthor.tieuSu}
                                        className="form-control" 
                                        onChange={(e) => setNewAuthor({ ...newAuthor, tieuSu: e.target.value })}
                                        required
                                    />
                                    <label>Tiểu sử</label>
                                    <div className="invalid-feedback">
                                        Vui lòng nhập tiểu sử.
                                    </div>
                                </div>

                                
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>Đóng</button>
                                <button type="submit" className="btn btn-primary">
                                    {isEditing ? 'Cập nhật tác giả' : 'Thêm tác giả'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


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
                                <button type="button" className="btn btn-danger" onClick={handleDeleteAuthor}>Xóa</button>
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
export default AuthorsPage;