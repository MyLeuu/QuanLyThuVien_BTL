package com.example.demo.reponsitory;
import com.example.demo.entity.Categories;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import java.util.List;


public interface CategoriesRepository extends CrudRepository<Categories, Integer> {
    @Query("SELECT c FROM Categories c WHERE LOWER(c.tendanhmuc) LIKE LOWER(CONCAT('%', :keyword, '%')) ")
    List<Categories> searchCategories(@Param("keyword") String keyword);
}
