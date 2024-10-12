package com.example.demo.controller;
import com.example.demo.entity.Books; // Đúng package import cho Books
import com.example.demo.reponsitory.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @GetMapping(path = "/all")
    public List<Books> getAllBooks() {
        return StreamSupport.stream(bookRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }
        private static final String UPLOAD_DIR = "src/main/resources/static/uploads/";

        @PostMapping("/uploadImage")
        public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
            if (file.isEmpty()) {
                return new ResponseEntity<>("File is empty", HttpStatus.BAD_REQUEST);
            }

            try {
                // Lưu file vào thư mục uploads
                String fileName = file.getOriginalFilename();
                Path path = Paths.get(UPLOAD_DIR + fileName);
                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

                return new ResponseEntity<>(fileName, HttpStatus.OK); // Trả về tên file hoặc đường dẫn file
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>("Error uploading file", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    @GetMapping("/image/{filename:.+}")
    public ResponseEntity<byte[]> getImage(@PathVariable String filename) {
        try {
            // Đường dẫn tới file hình ảnh
            Path path = Paths.get(UPLOAD_DIR + filename);
            byte[] image = Files.readAllBytes(path);

            // Trả về hình ảnh dưới dạng byte array
            return ResponseEntity.ok().header("Content-Type", "image/jpeg").body(image);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    @GetMapping("/search")
    public List<Books> searchAuthors(@RequestParam("keyword") String keyword) {
        return bookRepository.searchBooks(keyword);
    }
    // Thêm mới sách
    @PostMapping("/add")
    public Books addBook(@RequestBody Books book) {
        return bookRepository.save(book);
    }


    // Cập nhật thông tin sách
    @PutMapping("/update/{id}")
    public ResponseEntity<Books> updateBook(@PathVariable long id, @RequestBody Books bookDetail) {
        Optional<Books> bookOptional = bookRepository.findById(id);
        if (bookOptional.isPresent()) {
            Books book = bookOptional.get();
            book.setTieude(bookDetail.getTieude());
            book.setMatacgia(bookDetail.getMatacgia());
            book.setManhaxuatban(bookDetail.getManhaxuatban());
            book.setNamxuatban(bookDetail.getNamxuatban());
            book.setIsbn(bookDetail.getIsbn());
            book.setMadanhmuc(bookDetail.getMadanhmuc());
            book.setSoluong(bookDetail.getSoluong());
            book.setSoluongconlai(bookDetail.getSoluongconlai());
            book.setHinhAnh(bookDetail.getHinhAnh());
            return ResponseEntity.ok(bookRepository.save(book));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Xóa tác giả
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
