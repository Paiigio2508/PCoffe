package com.example.be.controller;

import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.dto.request.admin.SizeRequest;
import com.example.be.dto.request.admin.ThuocTinhRequest;
import com.example.be.service.MucDaService;
import com.example.be.service.SizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/size")
@RequiredArgsConstructor
public class SizeController {
    @Autowired
    private SizeService sizeService;

    @GetMapping
    public ResponseEntity<?> getALLMD() {
        return ResponseEntity.ok(sizeService.getALL());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody SizeRequest v) {
        return ResponseEntity.ok(sizeService.addSize(v));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody SizeRequest request) {

        return ResponseEntity.ok(sizeService.update(id, request));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") String id) {
        return ResponseEntity.ok(sizeService.detail(id));
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody SearchTenAndTrangThaiRequest bangConSearch) {
        return ResponseEntity.ok(sizeService.getTim(bangConSearch));
    }
}
