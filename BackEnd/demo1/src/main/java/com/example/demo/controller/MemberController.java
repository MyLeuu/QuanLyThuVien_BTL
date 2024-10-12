package com.example.demo.controller;
import com.example.demo.entity.Author;
import com.example.demo.entity.Members;
import com.example.demo.reponsitory.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:3000")

public class MemberController {
    @Autowired
    private MemberRepository memberRepository ;

    @GetMapping(path = "/all")
    public List<Members> getAllMembers() {
        return StreamSupport.stream(memberRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<Members> searchAuthors(@RequestParam("keyword") String keyword) {
        return memberRepository.searchMember(keyword);
    }
    @PostMapping("/add")
    public Members addMember(@RequestBody Members member) {
        return memberRepository.save(member);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Members> updateMember(@PathVariable int id, @RequestBody Members memberDetail) {
        Optional<Members> memberOptional = memberRepository.findById(id);
        if (memberOptional.isPresent()) {
            Members member = memberOptional.get();
            member.setHoten(memberDetail.getHoten());
            member.setEmail(memberDetail.getEmail());
            member.setDiachi(memberDetail.getDiachi());
            member.setSodienthoai(memberDetail.getSodienthoai());
            member.setNgaydangkythanhvien(memberDetail.getNgaydangkythanhvien());
            return ResponseEntity.ok(memberRepository.save(member));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable int id) {
        if (memberRepository.existsById(id)) {
            memberRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
