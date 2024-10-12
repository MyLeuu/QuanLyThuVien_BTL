import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BooksPage.css'; // Tùy chọn cho CSS tùy chỉnh

const BooksPage = () => {

    useEffect(() => {
        fetch('http://localhost:8080/api/books/all')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const [books, setBooks] = useState([]);

    
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [newBook, setNewBook] = useState({ masach:'',tieude: '', matacgia: '', hinhAnh: '', namxuatban: '', 
        isbn: '', madanhmuc: '', manhaxuatban: '', soluong: '', soluongconlai: '' });
    const [imagePreview, setImagePreview] = useState(null);
    const [editBookId, setEditBookId] = useState(null);


    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        // Lấy danh sách tác giả
        fetch('http://localhost:8080/api/authors/all')
            .then(response => response.json())
            .then(data => setAuthors(data))
            .catch(error => console.error('Error fetching authors:', error));
    
        // Lấy danh sách danh mục
        fetch('http://localhost:8080/api/categories/all')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    
        // Lấy danh sách nhà xuất bản
        fetch('http://localhost:8080/api/publishers/all')
            .then(response => response.json())
            .then(data => setPublishers(data))
            .catch(error => console.error('Error fetching publishers:', error));
    }, []);


    const [showDeleteModal, setShowDeleteModal] = useState(false); // Trạng thái mở modal xác nhận xóa
    const [deleteBookId, setDeleteBookId] = useState(null); // ID của cuốn sách cần xóa

    const handleSearchChange = (e) => setSearch(e.target.value);

    const getAuthorName = (authorId) => {
        const author = authors.find(a => a.maTacGia === authorId);
        return author ? author.tenTacGia : 'N/A'; // Trả về 'N/A' nếu không tìm thấy tác giả
    };
    
    const getPublisherName = (publisherId) => {
        const publisher = publishers.find(p => p.manhaxuatban === publisherId);
        return publisher ? publisher.tennhaxuatban : 'N/A'; // Trả về 'N/A' nếu không tìm thấy nhà xuất bản
    };
    
    const getCategoryName = (categoryId) => {
        const category = categories.find(c => c.madanhmuc === categoryId);
        return category ? category.tendanhmuc : 'N/A'; // Trả về 'N/A' nếu không tìm thấy danh mục
    };
    

    const handleAddOrEditBook = () => {
        // Kiểm tra số lượng còn lại không lớn hơn số lượng
        if (newBook.soluongconlai > newBook.soluong) {
            toast.error('Số lượng còn lại không được lớn hơn tổng số lượng!');
            return; // Ngăn không cho thực hiện lưu sách
        }
    
        // Kiểm tra các thuộc tính của newBook
        if (newBook.tieude && newBook.matacgia && newBook.namxuatban && newBook.isbn) {
            const isbnExists = books.some(book => book.isbn === newBook.isbn && book.masach !== editBookId);
        
            if (isbnExists) {
                toast.error("ISBN đã tồn tại trong hệ thống!");
                return; // Ngăn chặn việc tiếp tục thêm hoặc sửa nếu email đã tồn tại
            }

            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing 
                ? editBookId 
                    ? `http://localhost:8080/api/books/update/${editBookId}` 
                    : null // Không có editBookId
                : 'http://localhost:8080/api/books/add';
            
            if (!url) {
                toast.error('Không thể cập nhật cuốn sách vì ID không hợp lệ.');
                console.log(editBookId);
                return;
            }
    
            fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBook),
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(savedBook => {
                        if (isEditing) {
                            setBooks(books.map(book => (book.masach === editBookId ? savedBook : book)));
                        } else {
                            setBooks([...books, savedBook]);
                        }
                        resetForm(); // Gọi resetForm sau khi thêm hoặc cập nhật thành công
                        
                        // Hiển thị thông báo thành công
                        toast.success('Sách đã được lưu thành công!');
                    });
                } else {
                    console.error('Error saving book:', response);
                    console.log(JSON.stringify(newBook));
    
                    // Hiển thị thông báo lỗi
                    toast.error('Có lỗi xảy ra khi lưu sách. Vui lòng thử lại.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
    
                // Hiển thị thông báo lỗi
                toast.error('Có lỗi xảy ra khi lưu sách. Vui lòng thử lại.');
            });
        } else {
            // Hiển thị thông báo lỗi nếu thiếu thông tin
            toast.warn('Vui lòng điền đầy đủ thông tin sách!');
            console.log(JSON.stringify(newBook)); // In ra thông tin để kiểm tra
        }
    };
    
        
    const handleDeleteBook = () => {
        fetch(`http://localhost:8080/api/books/delete/${deleteBookId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setBooks(books.filter(book => book.masach !== deleteBookId));
                setShowDeleteModal(false); // Đóng modal sau khi xóa
                toast.success('Xóa sách thành công')
            } else {
                console.error('Error deleting book:', response);
                toast.error('Sách này không thể xóa do có ràng buộc')
            }
        })
        .catch(error => console.error('Error:', error));
    };
    
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:8080/api/books/uploadImage', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                return response.text(); // Lấy tên file từ server
            } else {
                throw new Error('Failed to upload image');
            }
        })
        .then(fileName => {
            setNewBook({ ...newBook, hinhAnh: fileName }); // Lưu tên file trong state
            setImagePreview(`http://localhost:8080/api/books/image/${fileName}`); // Hiển thị ảnh preview
            console.log('Uploaded file name:', fileName);
            console.log(JSON.stringify(newBook));

            
        })
        .catch(error => console.error('Error uploading image:', error));
    }
};
    
    
    const openDeleteModal = (id) => {
        setDeleteBookId(id); // Lưu lại ID của cuốn sách cần xóa
        setShowDeleteModal(true); // Hiển thị modal xác nhận xóa
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false); // Đóng modal xác nhận xóa
    };

    const handleEditBook = (book) => {
        setNewBook(book);
        setImagePreview(`http://localhost:8080/api/books/image/${book.hinhAnh}`);
        setEditBookId(book.masach);
        setIsEditing(true);
        setShowModal(true);
    };

    const resetForm = () => {
        setShowModal(false);
        setIsEditing(false);
        setNewBook({tieude: '', tacgia: '', hinhAnh: '', namxuatban: '', matacgia: '', 
            isbn: '', madanhmuc: '', manhaxuatban: '', soluong: '', soluongconlai: '' });

        const formElement = document.querySelector('.needs-validation');
            if (formElement) {
                formElement.classList.remove('was-validated');
            }
        setShowModal(false); // Đóng modal
        setImagePreview(null);
    };
    const generateRandomISBN = (e) => {
        e.preventDefault(); // Ngăn chặn form submit
        let randomISBN = '';
        for (let i = 0; i < 10; i++) {
            randomISBN += Math.floor(Math.random() * 10); // Tạo số ngẫu nhiên từ 0-9
        }
        setNewBook({ ...newBook, isbn: randomISBN });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 "><i className="bi bi-book"></i> QUẢN LÝ SÁCH</h2>

            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Tìm kiếm sách..." 
                    value={search} 
                    onChange={handleSearchChange} 
                />
            </div>

            <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
                + Thêm sách
            </button>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hình ảnh</th>
                        <th>Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Nhà xuất bản</th>
                        <th>Năm XB</th>
                        <th>ISBN</th>
                        <th>Danh mục</th>
                        <th>Số lượng</th>
                        <th>Còn lại</th>
                        <th className='aciton-col'>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {books
                        .filter(book =>
                            // Lọc theo tiêu đề sách
                            book.tieude.toLowerCase().includes(search.toLowerCase()) ||
                            // Lọc theo tên tác giả
                            getAuthorName(book.matacgia).toLowerCase().includes(search.toLowerCase()) ||
                            // Lọc theo tên nhà xuất bản
                            getPublisherName(book.manhaxuatban).toLowerCase().includes(search.toLowerCase()) ||
                            // Lọc theo tên danh mục
                            getCategoryName(book.madanhmuc).toLowerCase().includes(search.toLowerCase())
                        )
                        .map(book => (
                            <tr key={book.masach}>
                                <td>{book.masach}</td>
                                <td>
                                    <img src={`http://localhost:8080/api/books/image/${book.hinhAnh}`} 
                                    alt={book.tieude} style={{ width: '100px' }} />
                                </td>
                                <td>{book.tieude}</td>
                                <td>{getAuthorName(book.matacgia)}</td>
                                <td>{getPublisherName(book.manhaxuatban)}</td>
                                <td>{book.namxuatban}</td>
                                <td>{book.isbn}</td>
                                <td>{getCategoryName(book.madanhmuc)}</td>
                                <td>{book.soluong}</td>
                                <td>{book.soluongconlai}</td>
                                <td>
                                    <button className="btn btn-warning me-2 " onClick={() => handleEditBook(book)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" onClick={() => openDeleteModal(book.masach)}>
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
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
                        handleAddOrEditBook(); // Chỉ gọi hàm này nếu form hợp lệ
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
                                <h5 className="modal-title" id="exampleModalLabel">{isEditing ? 'Sửa sách' : 'Thêm sách mới'}</h5>
                                <button type="button" className="btn-close" onClick={resetForm}></button>
                            </div>
                            
                            <div className="modal-body">
                                <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Tiêu đề sách"
                                        value={newBook.tieude}
                                        onChange={(e) => setNewBook({ ...newBook, tieude: e.target.value })} 
                                        required
                                    />
                                    <label>Tiêu đề sách</label>
                                    <div className="invalid-feedback">Vui lòng nhập tiêu đề sách.</div>
                                </div>

                                <div className="d-flex justify-content-between">

                                    <div className="mb-3 w-100">
                                        <select 
                                            className="form-select" 
                                            value={newBook.matacgia} 
                                            onChange={(e) => setNewBook({ ...newBook, matacgia: e.target.value })}
                                            required
                                        >
                                            <option value="" disabled>Chọn tác giả</option>
                                            {authors.map((matacgia, index) => (
                                                <option key={index} value={matacgia.maTacGia}>{matacgia.tenTacGia}</option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback">Vui lòng chọn tác giả.</div>
                                    </div>

                                    <div className="mb-3 w-100 ms-2">
                                        <select 
                                            className="form-select" 
                                            value={newBook.manhaxuatban} 
                                            onChange={(e) => setNewBook({ ...newBook, manhaxuatban: e.target.value })}
                                            required
                                        >
                                            <option value="" disabled>Chọn nhà xuất bản</option>
                                            {publishers.map((publisher, index) => (
                                                <option key={index} value={publisher.manhaxuatban}>{publisher.tennhaxuatban}</option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback">Vui lòng chọn nhà xuất bản.</div>
                                    </div>      

                                </div>

                                <div className="mb-3 w-100">
                                    <select 
                                        className="form-select" 
                                        value={newBook.madanhmuc} 
                                        onChange={(e) => setNewBook({ ...newBook, madanhmuc: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>Chọn danh mục</option>
                                        {categories.map((madanhmuc, index) => (
                                            <option key={index} value={madanhmuc.madanhmuc}>{madanhmuc.tendanhmuc}</option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">Vui lòng chọn danh mục.</div>
                                </div>
                                
                                <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Năm xuất bản"
                                        value={newBook.namxuatban}
                                        maxLength={4}
                                        minLength={4}
                                        onChange={(e) => setNewBook({ ...newBook, namxuatban: e.target.value })} 
                                        required
                                    />
                                    <label>Năm xuất bản</label>
                                    <div className="invalid-feedback">Vui lòng nhập năm xuất bản có 4 số.</div>
                                </div>

                                <div className='d-flex'>
                                    <div className="form-floating mb-3 custom-wt">
                                    <input 
                                        type="number" 
                                        placeholder=""
                                        value={newBook.isbn}
                                        className="form-control" 
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            // Kiểm tra độ dài và giá trị
                                            if (value.length <= 10) {
                                                setNewBook({ ...newBook, isbn: value });
                                            }
                                        }}
                                        required
                                    />
                                        <label>ISBN</label>
                                        <div className="invalid-feedback">Vui lòng nhập ISBN hợp lệ có đủ 10 số.</div>
                                    </div>

                                    <button 
                                        type='button'
                                        className="btn btn-primary mb-3" 
                                        onClick={generateRandomISBN}
                                    >
                                        Tạo ISBN
                                    </button>
                                </div>

                                <div className='d-flex justify-content-between'>

                                    <div className="form-floating mb-3 w-100">
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            placeholder="Số lượng"
                                            value={newBook.soluong}
                                            onChange={(e) => setNewBook({ ...newBook, soluong: e.target.value })} 
                                            required
                                        />
                                        <label>Số lượng</label>
                                        <div className="invalid-feedback">Vui lòng nhập số lượng.</div>
                                    </div>

                                    <div className="form-floating mb-3 w-100 ms-2">
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            placeholder="Số lượng còn lại"
                                            value={newBook.soluongconlai}
                                            onChange={(e) => setNewBook({ ...newBook, soluongconlai: e.target.value })} 
                                            required
                                        />
                                        <label>Số lượng còn lại</label>
                                        <div className="invalid-feedback">Vui lòng nhập số lượng còn lại.</div>
                                    </div>
                                </div>
                                
                                <div className='d-flex justify-content-between'>
                                    <div className="mb-2 w-100">
                                        <input 
                                            type="file" 
                                            className="form-control" 
                                            accept="image/*"
                                            onChange={handleImageChange} 
                                        />
                                    </div>
                                    {imagePreview && (
                                        <div className="mb-2 ms-2 w-100">
                                            <img src={imagePreview} alt="Preview" style={{ width: '100px' }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>Đóng</button>
                                <button type="submit" className="btn btn-primary">
                                    {isEditing ? 'Cập nhật sách' : 'Thêm sách'}
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
                                Bạn có chắc chắn muốn xóa cuốn sách này không?
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
};

export default BooksPage;
