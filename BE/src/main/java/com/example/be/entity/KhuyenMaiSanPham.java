package com.example.be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "san_pham_khuyen_mai")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class KhuyenMaiSanPham  {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    @JoinColumn(name = "khuyen_mai_id")
    private KhuyenMai khuyenMai;
    @ManyToOne
    @JoinColumn(name = "san_pham_id")
    private SanPham sanPham;
    private String ma;
    private int trangThai;
}
