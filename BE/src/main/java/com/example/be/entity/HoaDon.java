package com.example.be.entity;

import com.example.be.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "hoa_don")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class HoaDon extends BaseEntity {
    private String ma;
    @ManyToOne
    @JoinColumn(name = "nhan_vien_id")
    private NguoiDung nhanVien;
    @ManyToOne
    @JoinColumn(name = "khach_hang_id")
    private NguoiDung khachHang;
    @ManyToOne
    @JoinColumn(name = "voucher_id")
    private Voucher voucher;
    private BigDecimal giaGoc;
    private BigDecimal giaGiamGia;
    private BigDecimal thanhTien;
    private LocalDateTime ngayMua;
    private int loaiHoaDon;
    private String tenNguoiNhan;
    private String soDienThoai;
    private String email;
    private String diaChi;
    private String qrCode;
    private String ghiChu;
    private BigDecimal tienVanChuyen;
}
