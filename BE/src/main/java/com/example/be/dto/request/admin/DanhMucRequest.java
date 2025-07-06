package com.example.be.dto.request.admin;

import com.example.be.entity.DanhMuc;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DanhMucRequest {
    private String ma;

    private String ten;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private String nguoiTao;

    private String nguoiSua;

    private int trangThai;

    public DanhMuc mapDM(DanhMuc dm){
        dm.setMa(this.ma);
        dm.setTen(this.ten);
        dm.setNgayTao(this.ngayTao);
        dm.setNgaySua(this.ngaySua);
        dm.setNguoiTao(this.nguoiTao);
        dm.setNguoiSua(this.nguoiSua);
        dm.setTrangThai(this.trangThai);
        return dm;
    }
}
