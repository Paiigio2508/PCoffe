package com.example.be.dto.repon;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface SizeRepon {
    String getId();

    String getMa();

    String getTen();

    BigDecimal getPhuThu();

    LocalDateTime getNgayTao();

    LocalDateTime getNgaySua();

    String getNguoiTao();

    String getNguoiSua();

    int getTrangThai();
}
