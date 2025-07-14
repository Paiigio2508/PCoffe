package com.example.be.dto.request.admin;

import com.example.be.entity.DanhMuc;
import com.example.be.entity.SanPham;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SanPhamRequest {
    private String id;
    private String ma;
    private String ten;
    private BigDecimal gia;
    private String danhMuc;
    private String moTa;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private String nguoiTao;
    private String nguoiSua;
    private int trangThai;
    public ArrayList<String> linkAnh;
    public SanPham map (SanPham sp ){
        sp.setId(this.id);
        if (this.ma != null) sp.setMa(this.ma);
        sp.setTen(this.ten);
        sp.setGia(this.gia);
        sp.setDanhMuc(DanhMuc.builder().id(this.danhMuc).build());
        sp.setMoTa(this.moTa);
        if (this.ngayTao != null) sp.setNgayTao(this.ngayTao); // 👈 nếu để backend set sẵn thì có thể bỏ
        if (this.ngaySua != null) sp.setNgaySua(this.ngaySua);
        if (this.nguoiTao != null) sp.setNguoiTao(this.nguoiTao);
        if (this.nguoiSua != null) sp.setNguoiSua(this.nguoiSua);
        sp.setTrangThai(this.trangThai);
        return sp;
    }
}
