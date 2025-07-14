package com.example.be.dto.request.admin;

import com.example.be.entity.HinhAnh;
import com.example.be.entity.SanPham;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HinhAnhRequest {
    private String sanPham;
    private String url;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private String nguoiTao;
    private String nguoiSua;
    private int trangThai;
    public HinhAnh map(HinhAnh ha){
        ha.setSanPham(SanPham.builder().id(this.sanPham).build());
        ha.setUrl(this.url);
        ha.setNgayTao(this.ngayTao);
        ha.setNgaySua(this.ngaySua);
        ha.setNguoiTao(this.nguoiTao);
        ha.setNguoiSua(this.nguoiSua);
        return ha;
    }
}
