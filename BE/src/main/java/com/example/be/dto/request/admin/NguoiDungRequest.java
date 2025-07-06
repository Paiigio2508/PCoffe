package com.example.be.dto.request.admin;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NguoiDungRequest {
    private String id;
    private String ten;
    private Long ngaySinh;
    private String soDienThoai;
    private String email;
    private Boolean gioiTinh;
    private String cccd;
    private String anh;
    private int trangThai;
    private int idThanhPho;
    private String tenThanhPho;
    private int idHuyen;
    private String tenHuyen;
    private String idXa;
    private String tenXa;
    private String diaChi;
}
