import  React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 


const PublicShersPage = ()=>{
    useEffect(() => {
        fetch('http://localhost:8080/api/publishers/all')
            .then(response => response.json())
            .then(data => setPublishers(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const [publishers, setPublishers] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    const [newPublisher, setNewPublisher] = useState({manhaxuatban: '',tennhaxuatban: ''});
    const [editPublisherId, setEditPublisherId] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletePublisherId, setDeletePublisherId] = useState(null); 

    const handleSearchChange = (e) => setSearch(e.target.value);

    const handleAddOrEditPublisher = () => {
        // Kiểm tra các thuộc tính của newBook
        if (newPublisher.tennhaxuatban) {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing 
                ? editPublisherId 
                    ? `http://localhost:8080/api/publishers/update/${editPublisherId}` 
                    : null // Không có editBookId
                : 'http://localhost:8080/api/publishers/add';
            
            if (!url) {
                toast.error('Không thể cập nhật vì ID không hợp lệ.');
                console.log(editPublisherId)
                return;
            }
    
            fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPublisher),
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(savedPublisher => {
                        if (isEditing) {
                            setPublishers(publishers.map(publisher => (publisher.manhaxuatban === editPublisherId ? savedPublisher : publisher)));
                        } else {
                            setPublishers([...publishers, savedPublisher]);
                        }
                        resetForm(); // Gọi resetForm sau khi thêm hoặc cập nhật thành công
                        
                        // Hiển thị thông báo thành công
                        toast.success('NXB đã được lưu thành công!');
                    });
                } else {
                    console.error('Error saving book:', response);
                    console.log(JSON.stringify(newPublisher));
    
                    // Hiển thị thông báo lỗi
                    toast.error('Có lỗi xảy ra khi lưu NXB. Vui lòng thử lại.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
    
                // Hiển thị thông báo lỗi
                toast.error('Có lỗi xảy ra khi lưu NXB. Vui lòng thử lại.');
            });
        } else {
            // Hiển thị thông báo lỗi nếu thiếu thông tin
            toast.warn('Vui lòng điền đầy đủ thông tin NXB');
            console.log(JSON.stringify(newPublisher)); 
        };
    }
    const handleDeletePublisher = () => {
        fetch(`http://localhost:8080/api/publishers/delete/${deletePublisherId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setPublishers(publishers.filter(publisher => publisher.manhaxuatban !== deletePublisherId));
                setShowDeleteModal(false); // Đóng modal sau khi xóa
                toast.success('Xóa NXB thành công')
            } else {
                console.error('Error deleting book:', response);
                toast.error('NXB này này không thể xóa do có ràng buộc')
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const openDeleteModal = (id) => {
        setDeletePublisherId(id); // Lưu lại ID của cuốn sách cần xóa
        setShowDeleteModal(true); // Hiển thị modal xác nhận xóa
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false); // Đóng modal xác nhận xóa
    };

    const handleEditPublisher = (publisher) => {
        setNewPublisher(publisher);
        setEditPublisherId(publisher.manhaxuatban);
        setIsEditing(true);
        setShowModal(true);
    };

    const resetForm = () => {
        setShowModal(false);
        setIsEditing(false);
        setNewPublisher({manhaxuatban: '',tennhaxuatban: ''});
        const formElement = document.querySelector('.needs-validation');
            if (formElement) {
                formElement.classList.remove('was-validated');
            }
    };

    //phần UI
    return(
        <div className="container mt-5">
            <h2 className="text-center mb-4"><i className="bi bi-buildings"></i> QUẢN LÝ NHÀ XUẤT BẢN</h2>

            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Tìm kiếm danh mục..." 
                    value={search} 
                    onChange={handleSearchChange} 
                />
            </div>

            <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
                Thêm NXB
            </button>

            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên nhà xuất bản</th>
                        <th style={{width: 150}}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {publishers.filter(publisher => publisher.tennhaxuatban.toLowerCase().includes(search.toLowerCase())).map(publisher => (
                        <tr key={publisher.manhaxuatban}>
                            <td>{publisher.manhaxuatban}</td>
                            <td>{publisher.tennhaxuatban}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() =>handleEditPublisher(publisher)}><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger" onClick={() => openDeleteModal(publisher.manhaxuatban)}><i className="bi bi-trash-fill"></i></button>
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
                            <h5 className="modal-title" id="exampleModalLabel">{isEditing ? 'Sửa NXB' : 'Thêm NXB mới'}</h5>
                            <button type="button" className="btn-close" onClick={resetForm}></button>
                        </div>

                        {/* Form with Bootstrap validation */}
                        <form className="row g-3 needs-validation" 
                            noValidate 
                            onSubmit={(e) => { 
                                e.preventDefault(); 
                                if (e.target.checkValidity()) {
                                    handleAddOrEditPublisher(); // Chỉ gọi hàm này nếu form hợp lệ
                                } else {
                                    e.target.classList.add('was-validated');
                                }
                            }}>
                            <div className="modal-body">
                                <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        placeholder=""
                                        value={newPublisher.tennhaxuatban}
                                        className="form-control" 
                                        onChange={(e) => setNewPublisher({ ...newPublisher, tennhaxuatban: e.target.value })}
                                        required
                                    />  
                                    <label>Tên nhà xuất bản</label>
                                    <div className="invalid-feedback">
                                        Vui lòng nhập tên nhà xuất bản.
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>Đóng</button>
                                <button type="submit" className="btn btn-primary">
                                    {isEditing ? 'Cập nhật NXB' : 'Thêm NXB'}
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
                                Bạn có chắc chắn muốn xóa NXB này không?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Hủy</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeletePublisher}>Xóa</button>
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
export default PublicShersPage;