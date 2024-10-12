package com.example.demo.controller;
import com.example.demo.entity.Users;
import com.example.demo.reponsitory.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")

public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping(path = "/all")
    public List<Users> getAllUser() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<Users> searchAuthors(@RequestParam("keyword") String keyword) {
        return userRepository.searchUsers(keyword);
    }

    // Thêm mới người dùng
    @PostMapping("/add")
    public Users addUser(@RequestBody Users user) {
        return userRepository.save(user);
    }

    // Cập nhật thông tin sách
    @PutMapping("/update/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable long id, @RequestBody Users userDetail) {
        Optional<Users> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            user.setHoten(userDetail.getHoten());
            user.setEmail(userDetail.getEmail());
            user.setVaitro(userDetail.getVaitro());
            user.setSodienthoai(userDetail.getSodienthoai());
            user.setMatkhau(userDetail.getMatkhau());

            return ResponseEntity.ok(userRepository.save(user));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Xóa người dùng
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Users loginRequest) {
        // Tìm người dùng theo email
        Optional<Users> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            // Kiểm tra mật khẩu
            if (user.getMatkhau().equals(loginRequest.getMatkhau())) {
                // Đăng nhập thành công
                return ResponseEntity.ok(user);
            } else {
                // Mật khẩu không đúng
                return ResponseEntity.status(401).body("Sai mật khẩu");
            }
        } else {
            // Không tìm thấy người dùng
            return ResponseEntity.status(404).body("Email không tồn tại");
        }
    }
}
