import  React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 


const CategoriesPage = ()=>{
    useEffect(() => {
        fetch('http://localhost:8080/api/categories/all')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [newCategory, setNewCategory] = useState({madanhmuc: '',tendanhmuc: ''});
    const [editCategoryId, setEditCategoryId] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null); 

    const handleSearchChange = (e) => setSearch(e.target.value);

    const handleAddOrEditCategory = () => {
        // Kiểm tra các thuộc tính của newBook
        if (newCategory.tendanhmuc ) {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing 
                ? editCategoryId 
                    ? `http://localhost:8080/api/categories/update/${editCategoryId}` 
                    : null // Không có editBookId
                : 'http://localhost:8080/api/categories/add';
            
            if (!url) {
                toast.error('Không thể cập nhật vì ID không hợp lệ.');
                console.log(editCategoryId)
                return;
            }
    
            fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCategory),
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(savedCategory => {
                        if (isEditing) {
                            setCategories(categories.map(category => (category.madanhmuc === editCategoryId ? savedCategory : category)));
                        } else {
                            setCategories([...categories, savedCategory]);
                        }
                        resetForm(); // Gọi resetForm sau khi thêm hoặc cập nhật thành công
                        
                        // Hiển thị thông báo thành công
                        toast.success('Danh mục đã được lưu thành công!');
                    });
                } else {
                    console.error('Error saving book:', response);
                    console.log(JSON.stringify(newCategory));
    
                    // Hiển thị thông báo lỗi
                    toast.error('Có lỗi xảy ra khi lưu danh mục. Vui lòng thử lại.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
    
                // Hiển thị thông báo lỗi
                toast.error('Có lỗi xảy ra khi lưu danh mục. Vui lòng thử lại.');
            });
        } else {
            // Hiển thị thông báo lỗi nếu thiếu thông tin
            toast.warn('Vui lòng điền đầy đủ thông tin danh mục');
            console.log(JSON.stringify(newCategory)); 
        };
    }

    const handleDeleteCategory = () => {
        fetch(`http://localhost:8080/api/categories/delete/${deleteCategoryId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setCategories(categories.filter(category => category.madanhmuc !== deleteCategoryId));
                setShowDeleteModal(false); // Đóng modal sau khi xóa
                toast.success('Xóa danh mục thành công')
            } else {
                console.error('Error deleting book:', response);
                toast.error('Danh mục này này không thể xóa do có ràng buộc')
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const openDeleteModal = (id) => {
        setDeleteCategoryId(id); // Lưu lại ID của cuốn sách cần xóa
        setShowDeleteModal(true); // Hiển thị modal xác nhận xóa
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false); // Đóng modal xác nhận xóa
    };

    const handleEditCategory = (category) => {
        setNewCategory(category);
        setEditCategoryId(category.madanhmuc);
        setIsEditing(true);
        setShowModal(true);
    };

    const resetForm = () => {
        setShowModal(false);
        setIsEditing(false);
        setNewCategory({madanhmuc: '',tendanhmuc: ''});
        const formElement = document.querySelector('.needs-validation');
            if (formElement) {
                formElement.classList.remove('was-validated');
            }
    };

    //phần UI
    return(
        <div className="container mt-5">
            <h2 className="text-center mb-4"><i className="bi bi-bookmark-dash"></i> QUẢN LÝ DANH MỤC</h2>

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
                Thêm danh mục
            </button>

            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên danh mục</th>
                        <th style={{width: 150}}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.filter(category => category.tendanhmuc.toLowerCase().includes(search.toLowerCase())).map(category => (
                        <tr key={category.madanhmuc}>
                            <td>{category.madanhmuc}</td>
                            <td>{category.tendanhmuc}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() =>handleEditCategory(category)}><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger" onClick={() => openDeleteModal(category.madanhmuc)}><i className="bi bi-trash-fill"></i></button>
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
                            <h5 className="modal-title" id="exampleModalLabel">{isEditing ? 'Sửa danh mục ' : 'Thêm danh mục mới'}</h5>
                            <button type="button" className="btn-close" onClick={resetForm}></button>
                        </div>

                        {/* Form with Bootstrap validation */}
                        <form className="row g-3 needs-validation" 
                            noValidate 
                            onSubmit={(e) => { 
                                e.preventDefault(); 
                                if (e.target.checkValidity()) {
                                    handleAddOrEditCategory(); // Chỉ gọi hàm này nếu form hợp lệ
                                } else {
                                    e.target.classList.add('was-validated');
                                }
                            }}>
                            <div className="modal-body">
                                <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        placeholder=""
                                        value={newCategory.tendanhmuc}
                                        className="form-control" 
                                        onChange={(e) => setNewCategory({ ...newCategory, tendanhmuc: e.target.value })}
                                        required
                                    />  
                                    <label>Tên danh mục</label>
                                    <div className="invalid-feedback">
                                        Vui lòng nhập tên danh mục.
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>Đóng</button>
                                <button type="submit" className="btn btn-primary">
                                    {isEditing ? 'Cập nhật danh mục' : 'Thêm danh mục'}
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
                                Bạn có chắc chắn muốn xóa danh mục này không?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Hủy</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteCategory}>Xóa</button>
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
export default CategoriesPage;