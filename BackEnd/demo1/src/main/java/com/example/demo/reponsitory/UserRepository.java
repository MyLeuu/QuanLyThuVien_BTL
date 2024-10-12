package com.example.demo.reponsitory;

import com.example.demo.entity.Users;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository  extends CrudRepository<Users, Long> {
    @Query("SELECT u FROM Users u WHERE LOWER(u.hoten) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(u.sodienthoai) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Users> searchUsers(@Param("keyword") String keyword);
    Optional<Users> findByEmail(String email);

}
