package com.example.demo.entity;

import jakarta.persistence.*;


    @Entity
    @Table(name = "tacgia")
    public class Author {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "matacgia")
        private Long matacgia;

        @Column(name = "tentacgia", nullable = false)
        private String tentacggia;

        @Column(name = "tieusu")
        private String tieusu;

        // getters and setters
        // Constructors
        public Author() {}

        public Author(Long matacgia, String tentacggia, String tieusu) {
            this.matacgia = matacgia;
            this.tentacggia = tentacggia;
            this.tieusu = tieusu;
        }

        // Getters and Setters
        public Long getMaTacGia() {
            return matacgia;
        }

        public void setMaTacGia(Long matacgia) {
            this.matacgia = matacgia;
        }

        public String getTenTacGia() {
            return tentacggia;
        }

        public void setTenTacGia(String tentacggia) {
            this.tentacggia = tentacggia;
        }

        public String getTieuSu() {
            return tieusu;
        }

        public void setTieuSu(String tieusu) {
            this.tieusu = tieusu;
        }
    }


