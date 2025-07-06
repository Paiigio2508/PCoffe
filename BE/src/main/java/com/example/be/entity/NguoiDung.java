package com.example.be.entity;

import com.example.be.entity.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.sql.Date;

@Entity
@Table(name = "nguoi_dung")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // <-- bắt buộc với JPA
@SuperBuilder
public class NguoiDung extends BaseEntity {
    private String ma;
    private String ten;
    private Long ngaySinh;
    private String soDienThoai;
    private Date ngayThamGia;
    private String cccd;
    private Boolean gioiTinh;
    private String anh;
    private String email;
    private String matKhau;
    private String chucVu;
    private String hangKhachHang;
}
