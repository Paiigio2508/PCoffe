package com.example.be.service;

import com.example.be.dto.impldto.NguoiDungResponseImplDTO;
import com.example.be.dto.repon.DiaChiKhachHangRepon;
import com.example.be.dto.request.admin.DiaChiRequest;
import com.example.be.dto.request.admin.NguoiDungRequest;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.entity.DiaChi;
import com.example.be.entity.NguoiDung;
import com.example.be.model.NguoiDungAdminRepository;
import com.example.be.model.NguoiDungDiaChiRepository;
import com.example.be.repository.DiaChiRepository;
import com.example.be.repository.NguoiDungRepository;
import com.example.be.util.EmailServiceImpl;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class KhachHangService {
    @Autowired
    NguoiDungRepository nguoiDungRepository;
    @Autowired
    private EmailServiceImpl emailService;
    @Autowired
    private DiaChiRepository diaChiRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<NguoiDungAdminRepository> getAll() {
        return nguoiDungRepository.getNguoiDungByChucVu("KHACHHANG");
    }
    public NguoiDungResponseImplDTO add(NguoiDungRequest request) {
        String password = RandomStringUtils.random(8, true, true);
        NguoiDung add = NguoiDung.builder()
                .ten(request.getTen())
                .ma(String.format("KH%03d", nguoiDungRepository.countNguoiDungByChucVu("KHACHHANG") + 1))
                .email(request.getEmail())
                .gioiTinh(request.getGioiTinh())
                .chucVu("KHACHHANG")
                .cccd(request.getCccd())
                .trangThai(0)
                .ngaySinh(request.getNgaySinh())
                .anh(request.getAnh())
                .ngayThamGia(java.sql.Date.valueOf(LocalDate.now()))
                .ngayTao(LocalDateTime.now())
                .hangKhachHang("Thành viên")
                .matKhau(passwordEncoder.encode(password))
                .soDienThoai(request.getSoDienThoai())
                .build();
        nguoiDungRepository.save(add);
        DiaChi diaChi = new DiaChi();
        diaChi.setDiaChi(request.getDiaChi());
        diaChi.setTenThanhPho(request.getTenThanhPho());
        diaChi.setTenHuyen(request.getTenHuyen());
        diaChi.setTenXa(request.getTenXa());
        diaChi.setIdThanhPho(request.getIdThanhPho());
        diaChi.setIdHuyen(request.getIdHuyen());
        diaChi.setIdXa(request.getIdXa());
        diaChi.setTenNguoiNhan(request.getTen());
        diaChi.setSoDienThoai(request.getSoDienThoai());
        diaChi.setNguoiDung(add);
        diaChi.setTrangThai(0);
        diaChiRepository.save(diaChi);
        emailService.sendEmailPasword(request.getEmail(), "Mật khẩu bạn là ", password);
        return new NguoiDungResponseImplDTO(add, diaChi);
    }
    @Async
    @Transactional
    public NguoiDungResponseImplDTO update(NguoiDungRequest request) {
        Optional<NguoiDung> optional = nguoiDungRepository.findById(request.getId());
        // todo: update user
        NguoiDung update = optional.get();
        update.setTen(request.getTen());
        update.setEmail(request.getEmail());
        update.setGioiTinh(request.getGioiTinh());
        update.setCccd(request.getCccd());
        update.setTrangThai(0);
        update.setNgaySinh(request.getNgaySinh());
        update.setAnh(request.getAnh());
        update.setSoDienThoai(request.getSoDienThoai());
        update.setNgaySua(LocalDateTime.now());
        nguoiDungRepository.save(update);
        DiaChi diaChiupdate = diaChiRepository.findByUserAndStatus(request.getId());
        diaChiupdate.setDiaChi(request.getDiaChi());
        diaChiupdate.setTenThanhPho(request.getTenThanhPho());
        diaChiupdate.setTenHuyen(request.getTenHuyen());
        diaChiupdate.setTenXa(request.getTenXa());
        diaChiupdate.setIdThanhPho(request.getIdThanhPho());
        diaChiupdate.setIdHuyen(request.getIdHuyen());
        diaChiupdate.setIdXa(request.getIdXa());
        diaChiupdate.setTenNguoiNhan(request.getTen());
        diaChiupdate.setSoDienThoai(request.getSoDienThoai());
        diaChiRepository.save(diaChiupdate);

        return new NguoiDungResponseImplDTO(update, diaChiupdate);
    }
    public List<NguoiDungAdminRepository> timKiemKH(SearchTenAndTrangThaiRequest nguoiDungSeacrh){
        return nguoiDungRepository.searchNguoiDung(nguoiDungSeacrh,"KHACHHANG");
    }
    public NguoiDungDiaChiRepository getByID(String id) {
        NguoiDungDiaChiRepository optional = nguoiDungRepository.findByIdAndChucVu(id,"KHACHHANG");
        return optional;

    }
    // tìm kiếm list địa chỉ khách hàng
    public List<DiaChiKhachHangRepon> findDiaChiByKH(String idKH){
        return diaChiRepository.findDiaChiByKH(idKH);
    }
        // thêm địa chỉ khách hàng
    public DiaChi addDiaChi(DiaChiRequest diaChiRequest){
        DiaChi diaChi=diaChiRequest.map(new DiaChi());
        return diaChiRepository.save(diaChi);
    }
    public DiaChi updateDiaChi(String id,DiaChiRequest diaChiRequest){
        DiaChi diaChi=diaChiRequest.map(new DiaChi());
        diaChi.setId(id);
        return diaChiRepository.save(diaChi);
    }
    public DiaChi updateDiaChiMacDinh(String id){
        diaChiRepository.findAll().stream().forEach(o-> {
            if(o.getNguoiDung().getId().equals(diaChiRepository.findById(id).get().getNguoiDung().getId())) {
                o.setTrangThai(1);
                diaChiRepository.save(o);
            }
        });
        DiaChi diaChi=diaChiRepository.findById(id).get();
        diaChi.setTrangThai(0);
        return diaChiRepository.save(diaChi);
    }
}
