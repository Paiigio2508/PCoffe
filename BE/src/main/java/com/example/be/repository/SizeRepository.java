package com.example.be.repository;

import com.example.be.dto.repon.SizeRepon;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SizeRepository extends JpaRepository<Size, String> {
    @Query(value = """
            SELECT s.id as id,s.ma as ma ,s.ten as ten,s.phu_thu as phuThu, s.trang_thai as trangThai FROM size s ORDER BY s.ngay_tao DESC
                 """, nativeQuery = true)
    List<SizeRepon> getALL();

    @Query(value = """
            SELECT o.id as id,o.ma as ma ,o.ten as ten,o.phu_thu as phuThu ,o.trang_thai as trangThai FROM size o WHERE 
             (:#{#bangConSearch.tenTimKiem} IS NULL OR o.ten LIKE (%:#{#bangConSearch.tenTimKiem}%) OR o.phu_thu LIKE (%:#{#bangConSearch.tenTimKiem}%) ) AND
             ( :#{#bangConSearch.trangThai} IS NULL OR o.trang_thai=:#{#bangConSearch.trangThai})
            ORDER BY o.ma DESC
                    """, nativeQuery = true)
    List<SizeRepon> tim(SearchTenAndTrangThaiRequest bangConSearch);
}
