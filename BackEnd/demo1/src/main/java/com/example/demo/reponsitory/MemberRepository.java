package com.example.demo.reponsitory;

import com.example.demo.entity.Members;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberRepository extends CrudRepository<Members, Integer> {
    @Query("SELECT m FROM Members m WHERE LOWER(m.hoten) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(m.sodienthoai) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Members> searchMember(@Param("keyword") String keyword);
}
