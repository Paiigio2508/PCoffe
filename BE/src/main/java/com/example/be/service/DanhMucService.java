package com.example.be.service;

import com.example.be.dto.repon.ThuocTinhRepone;
import com.example.be.dto.request.admin.ThuocTinhRequest;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.entity.DanhMuc;
import com.example.be.repository.DanhMucRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class DanhMucService {
    @Autowired
    DanhMucRepository danhMucRepository;

    public List<ThuocTinhRepone> getALL() {
        return danhMucRepository.getALLDM();
    }
    public DanhMuc addDM(ThuocTinhRequest danhMucRequest) {
        int count = (int) danhMucRepository.count(); // đếm số lượng
        String ma = String.format("DM%03d", count + 1);
        DanhMuc danhMuc = DanhMuc.builder()
                .ma(ma)
                .ten(danhMucRequest.getTen())
                .ngayTao(LocalDateTime.now())
                .trangThai(0)
                .build();
        return danhMucRepository.save(danhMuc);
    }
    public DanhMuc update(String id, ThuocTinhRequest danhMucRequest) {
        DanhMuc dm = danhMucRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));
        dm.setTen(danhMucRequest.getTen());
        dm.setTrangThai(danhMucRequest.getTrangThai());
        dm.setNgaySua(LocalDateTime.now());  // nếu cần
        return danhMucRepository.save(dm);
    }


    public DanhMuc detailDM(String id){return danhMucRepository.findById(id).get();}

    public List<ThuocTinhRepone> getTim(SearchTenAndTrangThaiRequest bangConSearch) {
        return danhMucRepository.tim(bangConSearch);
    }

}
