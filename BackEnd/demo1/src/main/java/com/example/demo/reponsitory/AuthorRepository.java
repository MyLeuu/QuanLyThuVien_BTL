package com.example.demo.reponsitory;
import com.example.demo.entity.Author;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuthorRepository extends CrudRepository<Author, Integer> {
    @Query("SELECT a FROM Author a WHERE (:keyword IS NULL OR a.matacgia = :keyword) " +
            "OR LOWER(a.tentacggia) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(a.tieusu) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Author> searchAuthors(@Param("keyword") String keyword);
}
