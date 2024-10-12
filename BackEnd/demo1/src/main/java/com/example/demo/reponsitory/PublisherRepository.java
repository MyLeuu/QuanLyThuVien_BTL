package com.example.demo.reponsitory;
import com.example.demo.entity.Publishers;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PublisherRepository extends CrudRepository<Publishers, Integer> {
    @Query("SELECT p FROM Publishers p WHERE LOWER(p.tennhaxuatban) LIKE LOWER(CONCAT('%', :keyword, '%')) ")
    List<Publishers> searchPublishers(@Param("keyword") String keyword);
}
