package com.example.be.controller;

import com.example.be.dto.request.admin.ThuocTinhRequest;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.service.DoNgotService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/do-ngot")
@RequiredArgsConstructor
public class DoNgotController {
    @Autowired
    private DoNgotService doNgotService;

    @GetMapping
    public ResponseEntity<?> getALLDN() {
        return ResponseEntity.ok(doNgotService.getALL());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ThuocTinhRequest v) {
        return ResponseEntity.ok(doNgotService.addDM(v));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody ThuocTinhRequest request) {

        return ResponseEntity.ok(doNgotService.update(id, request));
    }

    @GetMapping("/detail/{idDN}")
    public ResponseEntity<?> detail(@PathVariable("idDN") String id) {
        return ResponseEntity.ok(doNgotService.detailDN(id));
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody SearchTenAndTrangThaiRequest bangConSearch) {
        return ResponseEntity.ok(doNgotService.getTim(bangConSearch));
    }
}
