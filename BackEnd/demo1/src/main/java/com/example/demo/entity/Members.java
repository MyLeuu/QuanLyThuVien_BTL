package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "thanhvien")
public class Members {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mathanhvien")
    private Long mathanhvien;

    @Column(name = "hoten", nullable = false)
    private String hoten;

    @Column(name = "email")
    private String email;

    @Column(name = "sodienthoai")
    private String sodienthoai;

    @Column(name = "diachi")
    private String diachi;

    @Column(name = "ngaydangkythanhvien")
    private String ngaydangkythanhvien;

    public Members() {}

    public Members(Long mathanhvien, String hoten, String email, String diachi, String ngaydangkythanhvien) {
        this.mathanhvien = mathanhvien;
        this.hoten = hoten;
        this.email = email;
        this.diachi = diachi;
        this.ngaydangkythanhvien = ngaydangkythanhvien;
    }
    public Long getMathanhvien() {
        return mathanhvien;
    }
    public void setMathanhvien(Long mathanhvien) {
        this.mathanhvien = mathanhvien;
    }

    public String getHoten() {
        return hoten;
    }
    public void setHoten(String hoten) {
        this.hoten = hoten;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getSodienthoai() {
        return sodienthoai;
    }
    public void setSodienthoai(String sodienthoai) {
        this.sodienthoai = sodienthoai;
    }

    public String getDiachi() {
        return diachi;
    }
    public void setDiachi(String diachi) {
        this.diachi = diachi;
    }

    public String getNgaydangkythanhvien() {
        return ngaydangkythanhvien;
    }
    public void setNgaydangkythanhvien(String ngaydangkythanhvien) {
        this.ngaydangkythanhvien = ngaydangkythanhvien;
    }
}
