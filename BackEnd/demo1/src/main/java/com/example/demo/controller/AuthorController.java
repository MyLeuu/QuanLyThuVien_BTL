package com.example.demo.controller;

import com.example.demo.entity.Author;
import com.example.demo.reponsitory.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/authors")
@CrossOrigin(origins = "http://localhost:3000")

public class AuthorController {
    @Autowired
    private AuthorRepository authorRepository ;

    @GetMapping(path = "/all")
    public List<Author> getAllAuthors() {
        return StreamSupport.stream(authorRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<Author> searchAuthors(@RequestParam("keyword") String keyword) {
            return authorRepository.searchAuthors(keyword);
    }

    // Thêm mới tác giả
    @PostMapping("/add")
    public Author addAuthor(@RequestBody Author author) {
        return authorRepository.save(author);
    }

    // Cập nhật thông tin tác giả
    @PutMapping("/update/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable int id, @RequestBody Author authorDetails) {
        Optional<Author> authorOptional = authorRepository.findById(id);
        if (authorOptional.isPresent()) {
            Author author = authorOptional.get();
            author.setTenTacGia(authorDetails.getTenTacGia());
            author.setTieuSu(authorDetails.getTieuSu());
            return ResponseEntity.ok(authorRepository.save(author));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    // Xóa tác giả
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAuthor(@PathVariable int id) {
        if (authorRepository.existsById(id)) {
            authorRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
