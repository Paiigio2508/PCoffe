package com.example.be.service;

import com.example.be.dto.repon.ThuocTinhRepone;
import com.example.be.dto.request.admin.ThuocTinhRequest;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.entity.DoNgot;
import com.example.be.repository.DoNgotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DoNgotService {
    @Autowired
    DoNgotRepository doNgotRepository;

    public List<ThuocTinhRepone> getALL() {
        return doNgotRepository.getALLDN();
    }

    public DoNgot addDM(ThuocTinhRequest danhMucRequest) {
        int count = (int) doNgotRepository.count(); // đếm số lượng
        String ma = String.format("DN%03d", count + 1);
        DoNgot doNgot = DoNgot.builder()
                .ma(ma)
                .ten(danhMucRequest.getTen())
                .ngayTao(LocalDateTime.now())
                .trangThai(0)
                .build();
        return doNgotRepository.save(doNgot);
    }

    public DoNgot update(String id, ThuocTinhRequest doNgotRequest) {
        DoNgot dn = doNgotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));
        dn.setTen(doNgotRequest.getTen());
        dn.setTrangThai(doNgotRequest.getTrangThai());
        dn.setNgaySua(LocalDateTime.now());  // nếu cần
        return doNgotRepository.save(dn);
    }


    public DoNgot detailDN(String id) {
        return doNgotRepository.findById(id).get();
    }

    public List<ThuocTinhRepone> getTim(SearchTenAndTrangThaiRequest bangConSearch) {
        return doNgotRepository.tim(bangConSearch);
    }

}
