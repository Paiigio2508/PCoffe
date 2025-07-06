package com.example.be.repository;

import com.example.be.dto.repon.ThuocTinhRespone;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.entity.DanhMuc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DanhMucRepository extends JpaRepository<DanhMuc,String> {
    @Query(value = """
    SELECT dm.id as id,dm.ma as ma ,dm.ten as ten, dm.trang_thai as trangThai FROM danh_muc dm ORDER BY dm.ngay_tao DESC 
            """, nativeQuery = true)
    List<ThuocTinhRespone> getALLDM();
    @Query(value = """
    SELECT o.id as id,o.ma as ma ,o.ten as ten, o.trang_thai as trangThai FROM danh_muc o WHERE 
     (:#{#bangConSearch.tenTimKiem} IS NULL OR o.ma LIKE (%:#{#bangConSearch.tenTimKiem}%) OR o.ten LIKE (%:#{#bangConSearch.tenTimKiem}%) ) AND
     ( :#{#bangConSearch.trangThai} IS NULL OR o.trang_thai=:#{#bangConSearch.trangThai})
    ORDER BY o.ma DESC
            """, nativeQuery = true)
    List<ThuocTinhRespone> tim(SearchTenAndTrangThaiRequest bangConSearch);
}
