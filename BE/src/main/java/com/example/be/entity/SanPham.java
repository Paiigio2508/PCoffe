package com.example.be.entity;

import com.example.be.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Entity
@Table(name = "san_pham")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // <-- bắt buộc với JPA
@SuperBuilder
public class SanPham extends BaseEntity {
    private String ma;
    private String ten;
    private BigDecimal gia;
    @ManyToOne
    @JoinColumn(name = "danh_muc_id")
    private DanhMuc danhMuc;
    private String moTa;

}
