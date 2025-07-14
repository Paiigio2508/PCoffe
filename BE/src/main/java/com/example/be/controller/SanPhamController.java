package com.example.be.controller;

import com.example.be.dto.request.admin.SanPhamRequest;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.service.SanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/san-pham")
@RequiredArgsConstructor
public class SanPhamController {
    @Autowired
    SanPhamService sanPhamSerivce;
    @GetMapping
    public ResponseEntity<?> getALL() {
        return ResponseEntity.ok(sanPhamSerivce.getALL());
    }
    @PostMapping("/add")
    public ResponseEntity<String> addSP(@RequestBody SanPhamRequest request) {
        sanPhamSerivce.addFullWithImages(request);
        return ResponseEntity.ok("Done");
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSP(@PathVariable("id") String id,@RequestBody SanPhamRequest request) {
        return ResponseEntity.ok(   sanPhamSerivce.updateWithNewImages(id,request));
    }
    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") String id) {
        return ResponseEntity.ok(sanPhamSerivce.detailSP(id));
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody SearchTenAndTrangThaiRequest bangConSearch) {
        return ResponseEntity.ok(sanPhamSerivce.getTim(bangConSearch));
    }
}
