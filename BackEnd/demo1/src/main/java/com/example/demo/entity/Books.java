package com.example.demo.entity;
import jakarta.persistence.*;


@Entity
@Table(name = "sach")
public class Books {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "masach")
    private Long masach;

    @Column(name = "tieude", nullable = false)
    private String tieude;

    @Column(name = "matacgia")
    private int matacgia;

    @Column(name = "manhaxuatban")
    private int manhaxuatban;

    @Column(name = "namxuatban")
    private int namxuatban;

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "madanhmuc")
    private int madanhmuc;

    @Column(name = "soluong")
    private int soluong;

    @Column(name = "soluongconlai")
    private int soluongconlai;

    @Column(name = "hinhanh")
    private String hinhanh;


    // Constructors
    public Books(){}
    public Books(Long masach, String tieude, int matacgia, int manhaxuatban, int namxuatban,
                 String isbn, int madanhmuc, int soluong, int soluongconlai, String hinhanh )  {
        this.masach = masach;
        this.tieude = tieude;
        this.matacgia = matacgia;
        this.manhaxuatban = manhaxuatban;
        this.namxuatban = namxuatban;
        this.isbn = isbn;
        this.madanhmuc = madanhmuc;
        this.soluong = soluong;
        this.soluongconlai = soluongconlai;
        this.hinhanh = hinhanh;
    }

    // getters and setters
    public Long getMasach() {
        return masach;
    }

    public void setMasach(Long masach) {
        this.masach = masach;
    }

    public String getTieude() {
        return tieude;
    }

    public void setTieude(String tieude) {
        this.tieude = tieude;
    }

    public int getMatacgia() {
        return matacgia;
    }

    public void setMatacgia(int matacgia) {
        this.matacgia = matacgia;
    }

    public int getManhaxuatban() {
        return manhaxuatban;
    }

    public void setManhaxuatban(int manhaxuatban) {
        this.manhaxuatban = manhaxuatban;
    }

    public int getNamxuatban() {
        return namxuatban;
    }

    public void setNamxuatban(int namxuatban) {
        this.namxuatban = namxuatban;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public int getMadanhmuc() {
        return madanhmuc;
    }

    public void setMadanhmuc(int madanhmuc) {
        this.madanhmuc = madanhmuc;
    }

    public int getSoluong() {
        return soluong;
    }

    public void setSoluong(int soluong) {
        this.soluong = soluong;
    }

    public int getSoluongconlai() {
        return soluongconlai;
    }

    public void setSoluongconlai(int soluongconlai) {
        this.soluongconlai = soluongconlai;
    }

    public String getHinhAnh() {
        return hinhanh;
    }

    public void setHinhAnh(String hinhanh) {
        this.hinhanh = hinhanh;
    }

}
