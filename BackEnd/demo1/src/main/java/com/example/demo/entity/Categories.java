package com.example.demo.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "danhmuc")
public class Categories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "madanhmuc")
    private Long madanhmuc;

    @Column(name = "tendanhmuc", nullable = false)
    private String tendanhmuc;

    public Categories() {}

    public Categories(Long madanhmuc, String tendanhmuc) {
        this.madanhmuc = madanhmuc;
        this.tendanhmuc = tendanhmuc;
    }

    public Long getMadanhmuc() {
        return madanhmuc;
    }
    public void setMadanhmuc(Long madanhmuc) {
        this.madanhmuc = madanhmuc;
    }

    public String getTendanhmuc() {
        return tendanhmuc;
    }
    public void setTendanhmuc(String tendanhmuc) {
        this.tendanhmuc = tendanhmuc;
    }
}
