package com.example.be.service;


import com.example.be.dto.repon.SizeRepon;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.dto.request.admin.SizeRequest;
import com.example.be.entity.Size;
import com.example.be.repository.SizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SizeService {
    @Autowired
    SizeRepository sizeRepository;

    public List<SizeRepon> getALL() {
        return sizeRepository.getALL();
    }

    public Size addSize(SizeRequest request) {
        int count = (int) sizeRepository.count(); // đếm số lượng
        String ma = String.format("S%03d", count + 1);
        Size size = Size.builder()
                .ma(ma)
                .ten(request.getTen())
                .phuThu(request.getPhuThu())
                .ngayTao(LocalDateTime.now())
                .trangThai(0)
                .build();
        return sizeRepository.save(size);
    }

    public Size update(String id, SizeRequest request) {
        Size s = sizeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));
        s.setTen(request.getTen());
        s.setPhuThu(request.getPhuThu());
        s.setTrangThai(request.getTrangThai());
        s.setNgaySua(LocalDateTime.now());
        return sizeRepository.save(s);
    }


    public Size detail(String id) {
        return sizeRepository.findById(id).get();
    }

    public List<SizeRepon> getTim(SearchTenAndTrangThaiRequest bangConSearch) {
        return sizeRepository.tim(bangConSearch);
    }

}
