package com.example.demo.controller;

import com.example.demo.entity.BookBorrowRecord;
import com.example.demo.entity.Books; // Import thêm entity Books để truy xuất dữ liệu sách
import com.example.demo.reponsitory.BBRRepository; // Sửa từ "reponsitory" thành "repository"
import com.example.demo.reponsitory.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/Bbr")
@CrossOrigin(origins = "http://localhost:3000")
public class BBRController {

    @Autowired
    private BBRRepository bbrRepository;

    @Autowired
    private BookRepository bookRepository;  // Thêm bookRepository để thao tác với bảng sách

    @GetMapping(path = "/all")
    public List<BookBorrowRecord> getBBRAll() {
        return StreamSupport.stream(bbrRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @PostMapping("/add")
    public ResponseEntity<BookBorrowRecord> addBBR(@RequestBody BookBorrowRecord bookBorrowRecord) {
        // Truy xuất thông tin sách để kiểm tra số lượng
        Optional<Books> optionalBook = bookRepository.findById(bookBorrowRecord.getMasach());
        if (optionalBook.isPresent()) {
            Books book = optionalBook.get();

            // Kiểm tra số lượng sách
            if (book.getSoluongconlai() > 0) {
                // Cập nhật số lượng sách còn lại
                book.setSoluongconlai(book.getSoluongconlai() - 1);
                bookRepository.save(book);

                // Lưu phiếu mượn
                BookBorrowRecord savedRecord = bbrRepository.save(bookBorrowRecord);

                // Trả về phiếu mượn vừa được lưu với mã trạng thái 200 OK
                return ResponseEntity.ok(savedRecord);
            } else {
                // Trả về mã trạng thái 400 Bad Request nếu không đủ sách
                return ResponseEntity.badRequest().build();
            }
        } else {
            // Trả về mã trạng thái 400 Bad Request nếu không tìm thấy sách
            return ResponseEntity.badRequest().build();
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<BookBorrowRecord> updateBBR(@PathVariable Long id, @RequestBody BookBorrowRecord bbrDetails) {
        Optional<BookBorrowRecord> optionalBBR = bbrRepository.findById(id);

        if (optionalBBR.isPresent()) {
            BookBorrowRecord bbr = optionalBBR.get();

            // Kiểm tra nếu trạng thái cũ khác "Đã trả" và trạng thái mới là "Đã trả"
            if (!"Đã trả".equals(bbr.getTrangthai()) && "Đã trả".equals(bbrDetails.getTrangthai())) {
                // Lấy thông tin sách
                Optional<Books> optionalBook = bookRepository.findById(bbr.getMasach());

                if (optionalBook.isPresent()) {
                    Books book = optionalBook.get();
                    // Cộng lại 1 vào số lượng còn lại vì sách đã được trả
                    book.setSoluongconlai(book.getSoluongconlai() + 1);
                    bookRepository.save(book);
                } else {
                    return ResponseEntity.badRequest().body(null); // Không tìm thấy sách
                }
            }
            // Chỉ giảm số lượng sách nếu trạng thái thay đổi từ "Đã trả" sang "Đang mượn"
            else if ("Đã trả".equals(bbr.getTrangthai()) && !"Đã trả".equals(bbrDetails.getTrangthai())) {
                Optional<Books> optionalBook = bookRepository.findById(bbr.getMasach());

                if (optionalBook.isPresent()) {
                    Books book = optionalBook.get();
                    // Giảm số lượng còn lại vì sách được mượn
                    book.setSoluongconlai(book.getSoluongconlai() - 1);
                    bookRepository.save(book);
                } else {
                    return ResponseEntity.badRequest().body(null); // Không tìm thấy sách
                }
            }

            // Cập nhật thông tin phiếu mượn
            bbr.setMathanhvien(bbrDetails.getMathanhvien());
            bbr.setMasach(bbrDetails.getMasach());
            bbr.setNgaymuon(bbrDetails.getNgaymuon());
            bbr.setNgayhentra(bbrDetails.getNgayhentra());
            bbr.setNgaytra(bbrDetails.getNgaytra());
            bbr.setTrangthai(bbrDetails.getTrangthai());

            return ResponseEntity.ok(bbrRepository.save(bbr));
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBBR(@PathVariable Long id) {
        if (bbrRepository.existsById(id)) {
            bbrRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
