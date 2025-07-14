package com.example.be.repository;

import com.example.be.dto.repon.ToppingRepon;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.entity.Topping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ToppingRepository extends JpaRepository<Topping, String> {
    @Query(value = """
            SELECT t.id as id,t.ma as ma ,t.ten as ten,t.gia as gia, t.trang_thai as trangThai FROM topping t ORDER BY t.ngay_tao DESC
               """, nativeQuery = true)
    List<ToppingRepon> getALL();

    @Query(value = """
            SELECT o.id as id,o.ma as ma ,o.ten as ten,o.gia as gia ,o.trang_thai as trangThai FROM topping o WHERE 
             (:#{#bangConSearch.tenTimKiem} IS NULL OR o.ten LIKE (%:#{#bangConSearch.tenTimKiem}%) OR o.gia LIKE (%:#{#bangConSearch.tenTimKiem}%) ) AND
             ( :#{#bangConSearch.trangThai} IS NULL OR o.trang_thai=:#{#bangConSearch.trangThai})
            ORDER BY o.ma DESC
                    """, nativeQuery = true)
    List<ToppingRepon> tim(SearchTenAndTrangThaiRequest bangConSearch);
}
