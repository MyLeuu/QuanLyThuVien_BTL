package com.example.demo.reponsitory;

import com.example.demo.entity.Books; // Đúng package import cho Books
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends CrudRepository<Books, Long> {
    @Query("SELECT b FROM Books b WHERE LOWER(b.tieude) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(b.isbn) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Books> searchBooks(@Param("keyword") String keyword);
}
