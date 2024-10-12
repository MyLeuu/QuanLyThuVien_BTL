import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const ToastNotify = ()=>{

    const notify = () => {
        toast.success("This is a success message!", {
            position: "top-right", // Vị trí hiện Toast
            autoClose: 3000,       // Tự động đóng sau 3 giây
            hideProgressBar: false, // Hiện thanh tiến trình
            closeOnClick: true,     // Đóng khi click vào
            pauseOnHover: true,     // Tạm dừng khi di chuột vào
            draggable: true,        // Cho phép kéo Toast
            progress: undefined,    // Không tự cập nhật thanh tiến trình
        });
    };
    
    return (
        <div>
            <button onClick={notify}>Show Toast</button>
            <ToastContainer />  {/* Thành phần ToastContainer để quản lý các thông báo */}
        </div>
    );
    
}
export default ToastNotify;