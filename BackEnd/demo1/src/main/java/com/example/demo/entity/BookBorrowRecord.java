package com.example.demo.entity;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "ghichepmuonsach")
public class BookBorrowRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "maghichep")
    private Long maghichep; // Đổi kiểu dữ liệu thành Long

    @Column(name = "mathanhvien", nullable = false)
    private int mathanhvien;

    @Column(name = "masach", nullable = false)
    private Long masach;

    @Column(name = "ngaymuon", nullable = false)
    private Date ngaymuon;

    @Column(name = "ngayhentra", nullable = false)
    private Date ngayhentra;

    @Column(name = "ngaytra") // Không bắt buộc (nullable = true)
    private Date ngaytra;

    @Column(name = "trangthai", nullable = false)
    private String trangthai;

    public BookBorrowRecord() {}

    public BookBorrowRecord(Long maghichep, int mathanhvien, Long masach, Date ngaymuon, Date ngayhentra,
                            Date ngaytra, String trangthai) {
        this.maghichep = maghichep; // Sửa dấu =
        this.mathanhvien = mathanhvien;
        this.masach = masach;
        this.ngaymuon = ngaymuon;
        this.ngayhentra = ngayhentra;
        this.ngaytra = ngaytra;
        this.trangthai = trangthai;
    }

    // Getter và Setter
    public Long getMaghichep() { // Thay đổi kiểu trả về thành Long
        return maghichep;
    }

    public void setMaghichep(Long maghichep) { // Thay đổi kiểu tham số thành Long
        this.maghichep = maghichep;
    }

    public int getMathanhvien() {
        return mathanhvien;
    }

    public void setMathanhvien(int mathanhvien) {
        this.mathanhvien = mathanhvien;
    }

    public Long getMasach() {
        return masach;
    }

    public void setMasach(Long masach) {
        this.masach = masach;
    }

    public Date getNgaymuon() {
        return ngaymuon;
    }

    public void setNgaymuon(Date ngaymuon) {
        this.ngaymuon = ngaymuon;
    }

    public Date getNgayhentra() {
        return ngayhentra;
    }

    public void setNgayhentra(Date ngayhentra) {
        this.ngayhentra = ngayhentra;
    }

    public Date getNgaytra() {
        return ngaytra;
    }

    public void setNgaytra(Date ngaytra) {
        this.ngaytra = ngaytra;
    }

    public String getTrangthai() {
        return trangthai;
    }

    public void setTrangthai(String trangthai) {
        this.trangthai = trangthai;
    }
}
