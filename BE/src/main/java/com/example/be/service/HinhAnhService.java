package com.example.be.service;

import com.example.be.dto.request.admin.HinhAnhRequest;
import com.example.be.entity.HinhAnh;
import com.example.be.repository.HinhAnhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HinhAnhService {
    @Autowired
    HinhAnhRepository hinhAnhRepository;

}
