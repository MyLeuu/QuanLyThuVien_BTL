package com.example.demo.reponsitory;
import com.example.demo.entity.BookBorrowRecord;
import com.fasterxml.jackson.databind.node.LongNode;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface BBRRepository extends CrudRepository<BookBorrowRecord, Long> {

}
