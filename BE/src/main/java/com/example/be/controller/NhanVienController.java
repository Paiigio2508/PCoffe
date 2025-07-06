package com.example.be.controller;


import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.dto.request.admin.NguoiDungRequest;
import com.example.be.service.NhanVienService;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/nhan-vien")
@RequiredArgsConstructor
public class NhanVienController {
    @Autowired
    NhanVienService nhanVienService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(nhanVienService.getAll());
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestParam("request") String requestJson) {
        Gson gson = new Gson();
        NguoiDungRequest requestDto = gson.fromJson(requestJson, NguoiDungRequest.class);
        return ResponseEntity.ok(nhanVienService.add(requestDto));
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestParam("request") String request) {
        Gson gson = new Gson();
        NguoiDungRequest requestDto = gson.fromJson(request, NguoiDungRequest.class);
        return ResponseEntity.ok(nhanVienService.update(requestDto));

    }

    @PostMapping("/search")
    public ResponseEntity<?> search(@RequestBody SearchTenAndTrangThaiRequest nguoiDungSeacrh) {
        return ResponseEntity.ok(nhanVienService.timKiemNV(nguoiDungSeacrh));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") String id) {
        return ResponseEntity.ok(nhanVienService.getByID(id));
    }

}
