package com.example.be.controller;

import com.example.be.dto.repon.ThuocTinhRespone;
import com.example.be.dto.request.admin.DanhMucRequest;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.service.DanhMucService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/danh-muc")
@RequiredArgsConstructor
public class DanhMucController {
    @Autowired
    private DanhMucService danhMucService;
    @GetMapping
    public ResponseEntity<?> getALLDM(){
        return  ResponseEntity.ok(danhMucService.getALL());
    }
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody DanhMucRequest v){
        return  ResponseEntity.ok(danhMucService.addDM(v));
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody DanhMucRequest request){

        return ResponseEntity.ok(danhMucService.update(id,request));
    }

    @GetMapping("/detail/{idDM}")
    public ResponseEntity<?> detail(@PathVariable("idDM") String id){
        return ResponseEntity.ok(danhMucService.detailDM(id));
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody SearchTenAndTrangThaiRequest bangConSearch){
        return ResponseEntity.ok(danhMucService.getTim(bangConSearch));
    }
}
