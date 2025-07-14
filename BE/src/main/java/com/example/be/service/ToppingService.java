package com.example.be.service;

import com.example.be.dto.repon.ToppingRepon;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.dto.request.admin.ToppingRequest;
import com.example.be.entity.Topping;
import com.example.be.repository.ToppingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ToppingService {
    @Autowired
    ToppingRepository toppingRepository;

    public List<ToppingRepon> getALL() {
        return toppingRepository.getALL();
    }

    public Topping addTopping(ToppingRequest request) {
        int count = (int) toppingRepository.count(); // đếm số lượng
        String ma = String.format("T%03d", count + 1);
        Topping topping = Topping.builder()
                .ma(ma)
                .ten(request.getTen())
                .gia(request.getGia())
                .ngayTao(LocalDateTime.now())
                .trangThai(0)
                .build();
        return toppingRepository.save(topping);
    }

    public Topping update(String id, ToppingRequest request) {
        Topping t = toppingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));
        t.setTen(request.getTen());
        t.setGia(request.getGia());
        t.setTrangThai(request.getTrangThai());
        t.setNgaySua(LocalDateTime.now());
        return toppingRepository.save(t);
    }


    public Topping detail(String id) {
        return toppingRepository.findById(id).get();
    }

    public List<ToppingRepon> getTim(SearchTenAndTrangThaiRequest bangConSearch) {
        return toppingRepository.tim(bangConSearch);
    }
}
