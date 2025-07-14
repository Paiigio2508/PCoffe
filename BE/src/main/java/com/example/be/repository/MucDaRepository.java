package com.example.be.repository;

import com.example.be.dto.repon.ThuocTinhRepone;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.entity.MucDa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface MucDaRepository extends JpaRepository<MucDa,String>{
    @Query(value = """
                SELECT md.id as id,md.ma as ma ,md.ten as ten, md.trang_thai as trangThai FROM muc_da md ORDER BY md.ngay_tao DESC\s
                    """, nativeQuery = true)
    List<ThuocTinhRepone> getALLMD();

    @Query(value = """
            SELECT o.id as id,o.ma as ma ,o.ten as ten, o.trang_thai as trangThai FROM muc_da o WHERE 
             (:#{#bangConSearch.tenTimKiem} IS NULL OR o.ma LIKE (%:#{#bangConSearch.tenTimKiem}%) OR o.ten LIKE (%:#{#bangConSearch.tenTimKiem}%) ) AND
             ( :#{#bangConSearch.trangThai} IS NULL OR o.trang_thai=:#{#bangConSearch.trangThai})
            ORDER BY o.ma DESC
                    """, nativeQuery = true)
    List<ThuocTinhRepone> tim(SearchTenAndTrangThaiRequest bangConSearch);
}
