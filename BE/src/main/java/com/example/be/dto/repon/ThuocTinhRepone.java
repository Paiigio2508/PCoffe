package com.example.be.dto.repon;

import java.time.LocalDateTime;

public interface ThuocTinhRepone {
     String getId();

     String getMa();

     String getTen();

     LocalDateTime getNgayTao();

     LocalDateTime getNgaySua();

     String getNguoiTao();

     String getNguoiSua();

     int getTrangThai();
}
