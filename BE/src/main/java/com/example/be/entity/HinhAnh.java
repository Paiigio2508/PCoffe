package com.example.be.entity;

import com.example.be.entity.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "hinh_anh")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // <-- bắt buộc với JPA
@SuperBuilder
public class HinhAnh extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "san_pham_id")
    private SanPham sanPham;
    private String url;
}
