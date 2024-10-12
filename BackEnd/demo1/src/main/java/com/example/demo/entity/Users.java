package com.example.demo.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "nguoidung")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mand")
    private Long manguoidung;

    @Column(name = "hoten", nullable = false)
    private String hoten;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "vaitro", nullable = false)
    private String vaitro;

    @Column(name = "sodienthoai", nullable = false)
    private String sodienthoai;

    @Column(name = "matkhau", nullable = false)
    private String matkhau;

    public Users(){}

    public Users(long manguoidung, String hoten, String email, String vaitro, String sodienthoai, String matkhau) {
        this.manguoidung = manguoidung;
        this.hoten = hoten;
        this.email = email;
        this.vaitro = vaitro;
        this.sodienthoai = sodienthoai;
        this.matkhau = matkhau;
    }
    // Getters and Setters

    public Long getManguoidung() {
        return manguoidung;
    }
    public void setManguoidung(Long manguoidung) {
        this.manguoidung = manguoidung;
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

    public String getVaitro() {
        return vaitro;
    }
    public void setVaitro(String vaitro) {
        this.vaitro = vaitro;
    }

    public String getSodienthoai() {
        return sodienthoai;
    }
    public void setSodienthoai(String sodienthoai) {
        this.sodienthoai = sodienthoai;
    }

    public String getMatkhau() {
        return matkhau;
    }
    public void setMatkhau(String matkhau) {
        this.matkhau = matkhau;
    }
}
