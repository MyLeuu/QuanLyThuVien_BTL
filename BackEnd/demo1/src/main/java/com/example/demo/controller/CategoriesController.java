package com.example.demo.controller;
import com.example.demo.entity.Categories;
import com.example.demo.reponsitory.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")

public class CategoriesController {
    @Autowired
    private CategoriesRepository categoriesRepository ;

    @GetMapping(path = "/all")
    public List<Categories> getAllAuthors() {
        return StreamSupport.stream(categoriesRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<Categories> searchAuthors(@RequestParam("keyword") String keyword) {
        return categoriesRepository.searchCategories(keyword);
    }

    @PostMapping("/add")
    public Categories addCategory(@RequestBody Categories categories) {
        return categoriesRepository.save(categories);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Categories> updateCategory(@PathVariable int id, @RequestBody Categories categoriesDetails) {
        Optional<Categories> categoriesOptional = categoriesRepository.findById(id);
        if (categoriesOptional.isPresent()) {
            Categories categories = categoriesOptional.get();
            categories.setTendanhmuc(categoriesDetails.getTendanhmuc());
            return ResponseEntity.ok(categoriesRepository.save(categories));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAuthor(@PathVariable int id) {
        if (categoriesRepository.existsById(id)) {
            categoriesRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
