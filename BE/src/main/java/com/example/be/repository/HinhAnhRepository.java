package com.example.be.repository;

import com.example.be.entity.HinhAnh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface HinhAnhRepository extends JpaRepository<HinhAnh, String> {
    @Modifying
    @Transactional
    @Query("DELETE FROM HinhAnh h WHERE h.sanPham.id = :id")
    void deleteHinhAnhBySanPhamId(String id);

}
