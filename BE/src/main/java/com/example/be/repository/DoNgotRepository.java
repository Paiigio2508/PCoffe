package com.example.be.repository;

import com.example.be.dto.repon.ThuocTinhRepone;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.entity.DoNgot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DoNgotRepository extends JpaRepository<DoNgot,String> {
    @Query(value = """
               SELECT dn.id as id,dn.ma as ma ,dn.ten as ten, dn.trang_thai as trangThai FROM do_ngot dn ORDER BY dn.ngay_tao DESC 
                    """, nativeQuery = true)
    List<ThuocTinhRepone> getALLDN();

    @Query(value = """
            SELECT o.id as id,o.ma as ma ,o.ten as ten, o.trang_thai as trangThai FROM do_ngot o WHERE 
             (:#{#bangConSearch.tenTimKiem} IS NULL OR o.ma LIKE (%:#{#bangConSearch.tenTimKiem}%) OR o.ten LIKE (%:#{#bangConSearch.tenTimKiem}%) ) AND
             ( :#{#bangConSearch.trangThai} IS NULL OR o.trang_thai=:#{#bangConSearch.trangThai})
            ORDER BY o.ma DESC
                    """, nativeQuery = true)
    List<ThuocTinhRepone> tim(SearchTenAndTrangThaiRequest bangConSearch);
}
