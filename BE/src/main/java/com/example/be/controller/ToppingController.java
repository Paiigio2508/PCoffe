package com.example.be.controller;

import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.dto.request.admin.SizeRequest;
import com.example.be.dto.request.admin.ToppingRequest;
import com.example.be.service.ToppingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/topping")
@RequiredArgsConstructor
public class ToppingController {
    @Autowired
    private ToppingService toppingService;

    @GetMapping
    public ResponseEntity<?> getALL() {
        return ResponseEntity.ok(toppingService.getALL());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ToppingRequest v) {
        return ResponseEntity.ok(toppingService.addTopping(v));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody ToppingRequest request) {

        return ResponseEntity.ok(toppingService.update(id, request));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") String id) {
        return ResponseEntity.ok(toppingService.detail(id));
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody SearchTenAndTrangThaiRequest bangConSearch) {
        return ResponseEntity.ok(toppingService.getTim(bangConSearch));
    }
}
