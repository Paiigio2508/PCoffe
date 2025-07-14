package com.example.be.service;

import com.example.be.dto.repon.ThuocTinhRepone;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.dto.request.admin.ThuocTinhRequest;
import com.example.be.entity.MucDa;
import com.example.be.repository.MucDaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MucDaService {
    @Autowired
    MucDaRepository mucDaRepository;

    public List<ThuocTinhRepone> getALL() {
        return mucDaRepository.getALLMD();
    }

    public MucDa addMD(ThuocTinhRequest danhMucRequest) {
        int count = (int) mucDaRepository.count(); // đếm số lượng
        String ma = String.format("MD%03d", count + 1);
        MucDa mucDa = MucDa.builder()
                .ma(ma)
                .ten(danhMucRequest.getTen())
                .ngayTao(LocalDateTime.now())
                .trangThai(0)
                .build();
        return mucDaRepository.save(mucDa);
    }

    public MucDa update(String id, ThuocTinhRequest doNgotRequest) {
        MucDa dn = mucDaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy mức đá"));
        dn.setTen(doNgotRequest.getTen());
        dn.setTrangThai(doNgotRequest.getTrangThai());
        dn.setNgaySua(LocalDateTime.now());  // nếu cần
        return mucDaRepository.save(dn);
    }


    public MucDa detailMD(String id) {
        return mucDaRepository.findById(id).get();
    }

    public List<ThuocTinhRepone> getTim(SearchTenAndTrangThaiRequest bangConSearch) {
        return mucDaRepository.tim(bangConSearch);
    }
}
