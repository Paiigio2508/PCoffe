package com.example.be.dto.repon;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface ToppingRepon {
    String getId();

    String getMa();

    String getTen();

    BigDecimal getGia();

    LocalDateTime getNgayTao();

    LocalDateTime getNgaySua();

    String getNguoiTao();

    String getNguoiSua();

    int getTrangThai();
}
