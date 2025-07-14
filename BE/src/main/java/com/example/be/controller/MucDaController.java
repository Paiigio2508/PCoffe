package com.example.be.controller;

import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.dto.request.admin.ThuocTinhRequest;
import com.example.be.service.DoNgotService;
import com.example.be.service.MucDaService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/muc-da")
@RequiredArgsConstructor
public class MucDaController {
    @Autowired
    private MucDaService mucDaService;

    @GetMapping
    public ResponseEntity<?> getALLMD() {
        return ResponseEntity.ok(mucDaService.getALL());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ThuocTinhRequest v) {
        return ResponseEntity.ok(mucDaService.addMD(v));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody ThuocTinhRequest request) {

        return ResponseEntity.ok(mucDaService.update(id, request));
    }

    @GetMapping("/detail/{idDN}")
    public ResponseEntity<?> detail(@PathVariable("idDN") String id) {
        return ResponseEntity.ok(mucDaService.detailMD(id));
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody SearchTenAndTrangThaiRequest bangConSearch) {
        return ResponseEntity.ok(mucDaService.getTim(bangConSearch));
    }
}
