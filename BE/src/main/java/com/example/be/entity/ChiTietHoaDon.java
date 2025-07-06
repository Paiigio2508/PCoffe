package com.example.be.entity;

import com.example.be.entity.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "chi_tiet_hoa_don")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Data
@Builder
public class ChiTietHoaDon extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "hoa_don_id")
    private HoaDon hoaDon;
    @ManyToOne
    @JoinColumn(name = "san_pham_id")
    private SanPham sanPham;
    @ManyToOne
    @JoinColumn(name = "size_id")
    private Size size;
    @ManyToOne
    @JoinColumn(name = "dongot_id")
    private DoNgot doNgot;
    @ManyToOne
    @JoinColumn(name = "mucda_id")
    private MucDa mucDa;
    private int soLuong;
    private BigDecimal giaSauGiam;
    private BigDecimal giaGiam;
}
