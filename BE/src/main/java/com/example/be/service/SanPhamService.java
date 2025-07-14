package com.example.be.service;

import com.example.be.dto.repon.SanPhamRepone;
import com.example.be.dto.request.admin.SanPhamRequest;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.entity.HinhAnh;
import com.example.be.entity.SanPham;
import com.example.be.repository.HinhAnhRepository;
import com.example.be.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SanPhamService {
    @Autowired
    SanPhamRepository sanPhamRepository;
    @Autowired
    HinhAnhRepository hinhAnhRepository;

    public List<SanPhamRepone> getALL() {
        return sanPhamRepository.getALL();
    }

    public SanPham addFullWithImages(SanPhamRequest spRequest) {
        int count = (int) sanPhamRepository.count();
        String ma = String.format("SP%03d", count + 1);
        spRequest.setNgayTao(LocalDateTime.now());
        spRequest.setTrangThai(0);
        spRequest.setMa(ma);
        SanPham sp = spRequest.map(SanPham.builder().build());
        SanPham spSave = sanPhamRepository.save(sp);


        List<String> linkAnh = spRequest.getLinkAnh();
        if (linkAnh != null && !linkAnh.isEmpty()) {
            List<HinhAnh> dsAnh = new ArrayList<>();

            for (int i = 0; i < linkAnh.size(); i++) {
                HinhAnh ha = HinhAnh.builder()
                        .url(linkAnh.get(i))
                        .sanPham(SanPham.builder().id(spSave.getId()).build()) // chỉ cần ID
                        .trangThai(0)
                        .ngayTao(LocalDateTime.now())
                        .build();

                dsAnh.add(ha);
            }
            hinhAnhRepository.saveAll(dsAnh);
        }
        return spSave;
    }
    public SanPham updateWithNewImages(String id, SanPhamRequest spRequest) {
        // 1. Lấy sản phẩm đang tồn tại
        Optional<SanPham> optional = sanPhamRepository.findById(id);
        if (optional.isEmpty()) {
            throw new RuntimeException("Không tìm thấy sản phẩm");
        }

        SanPham sp = spRequest.map(optional.get()); // map dữ liệu từ request sang entity
        sp.setNgaySua(LocalDateTime.now());

        // 2. Cập nhật sản phẩm
        SanPham spSave = sanPhamRepository.save(sp);

        // 3. THÊM MỚI ẢNH NẾU CÓ (và xóa ảnh cũ trước đó)
        List<String> linkAnh = spRequest.getLinkAnh();
        if (linkAnh != null && !linkAnh.isEmpty()) {
            // 👉 Chỉ xóa ảnh cũ nếu có danh sách ảnh mới gửi lên
            hinhAnhRepository.deleteHinhAnhBySanPhamId(sp.getId());

            List<HinhAnh> dsAnh = new ArrayList<>();
            for (String url : linkAnh) {
                dsAnh.add(HinhAnh.builder()
                        .url(url)
                        .sanPham(spSave)
                        .trangThai(0)
                        .ngayTao(LocalDateTime.now())
                        .build());
            }
            hinhAnhRepository.saveAll(dsAnh);
        }

        return spSave;
    }

    public SanPhamRepone detailSP(String idSP){
        return  sanPhamRepository.detailSP(idSP);
    }
    public List<SanPhamRepone> getTim(SearchTenAndTrangThaiRequest bangConSearch) {
        return sanPhamRepository.tim(bangConSearch);
    }
}
