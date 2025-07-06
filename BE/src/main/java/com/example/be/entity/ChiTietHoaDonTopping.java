package com.example.be.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chi_tiet_hoa_don_topping")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChiTietHoaDonTopping {
    @EmbeddedId
    private ChiTietHoaDonToppingID id;

    @ManyToOne
    @MapsId("chitietId")
    @JoinColumn(name = "chitiet_id")
    private ChiTietHoaDon chiTietHoaDon;

    @ManyToOne
    @MapsId("toppingId")
    @JoinColumn(name = "topping_id")
    private Topping topping;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private String nguoiTao;

    private String nguoiSua;
}
