package com.example.demo.entity;
import jakarta.persistence.*;


@Entity
@Table(name = "nhaxuatban")
public class Publishers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "manhaxuatban")
    private Long manhaxuatban;

    @Column(name = "tennhaxuatban", nullable = false)
    private String tennhaxuatban;

    public Publishers(){}

    public Publishers(Long manhaxuatban, String tennhaxuatban) {
        this.manhaxuatban = manhaxuatban;
        this.tennhaxuatban = tennhaxuatban;
    }

    public Long getManhaxuatban() {
        return manhaxuatban;
    }
    public void setManhaxuatban(Long manhaxuatban) {
        this.manhaxuatban = manhaxuatban;
    }

    public String getTennhaxuatban() {
        return tennhaxuatban;
    }
    public void setTennhaxuatban(String tennhaxuatban) {
        this.tennhaxuatban = tennhaxuatban;
    }

}
