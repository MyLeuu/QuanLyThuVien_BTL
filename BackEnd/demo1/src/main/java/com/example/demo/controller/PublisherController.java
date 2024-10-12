package com.example.demo.controller;
import com.example.demo.entity.Author;
import com.example.demo.entity.Publishers;
import com.example.demo.reponsitory.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@RestController
@RequestMapping("/api/publishers")
@CrossOrigin(origins = "http://localhost:3000")

public class PublisherController {
    @Autowired
    private PublisherRepository publisherRepository ;

    @GetMapping(path = "/all")
    public List<Publishers> getAllPublishers() {
        return StreamSupport.stream(publisherRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }
    @GetMapping("/search")
    public List<Publishers> searchAuthors(@RequestParam("keyword") String keyword) {
        return publisherRepository.searchPublishers(keyword);
    }

    @PostMapping("/add")
    public Publishers addPublisher(@RequestBody Publishers publishers) {
        return publisherRepository.save(publishers);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Publishers> updatePublisher(@PathVariable int id, @RequestBody Publishers publisherDetail) {
        Optional<Publishers> publishersOptional = publisherRepository.findById(id);
        if (publishersOptional.isPresent()) {
            Publishers publishers = publishersOptional.get();
            publishers.setTennhaxuatban(publisherDetail.getTennhaxuatban());
            return ResponseEntity.ok(publisherRepository.save(publishers));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePublisher(@PathVariable int id) {
        if (publisherRepository.existsById(id)) {
            publisherRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
