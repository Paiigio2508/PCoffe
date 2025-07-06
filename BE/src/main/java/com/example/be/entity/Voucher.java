package com.example.be.entity;

import com.example.be.entity.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "voucher")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Voucher extends BaseEntity {
    private String ma;
    private String ten;
    private String loaiVoucher;
    private LocalDateTime ngayBatDau;
    private LocalDateTime ngayKetThuc;
    private int mucDo;
    private BigDecimal giamToiDa;
    private BigDecimal dieuKien;
    private int soLuong;
}
