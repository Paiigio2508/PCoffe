package com.example.be.repository;

import com.example.be.dto.repon.SanPhamRepone;
import com.example.be.dto.request.admin.SearchTenAndTrangThaiRequest;
import com.example.be.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, String> {
    @Query(value = """
            SELECT
              sp.id AS idSP,
              sp.ma AS maSP,
              sp.ten AS tenSP,
              sp.gia AS giaSP,
              sp.mo_ta AS moTaSP,
              dm.ten AS tenDM,
              MIN(h.url) AS linkAnh,
              sp.trang_thai AS trangThai
                        FROM san_pham sp
            LEFT JOIN hinh_anh h ON sp.id = h.san_pham_id
            LEFT JOIN danh_muc dm ON sp.danh_muc_id = dm.id
            GROUP BY
              sp.id, sp.ma, sp.ten, sp.gia, sp.mo_ta, dm.ten, sp.trang_thai
            ORDER BY sp.ngay_tao DESC;

                             """, nativeQuery = true)
    List<SanPhamRepone> getALL();

    @Query(value = """
                 SELECT
                   sp.id AS idSP,
                   sp.ma AS maSP,
                   sp.ten AS tenSP,
                   sp.gia AS giaSP,
                   sp.mo_ta AS moTaSP,
                   dm.ten AS tenDM,
                   MIN(h.url) AS linkAnh,
                   sp.trang_thai AS trangThai
                 FROM san_pham sp
                 LEFT JOIN hinh_anh h ON sp.id = h.san_pham_id
                 LEFT JOIN danh_muc dm ON sp.danh_muc_id = dm.id
                 WHERE
            (:#{#bangConSearch.tenTimKiem} IS NULL OR sp.ten LIKE (%:#{#bangConSearch.tenTimKiem}%) OR sp.gia LIKE (%:#{#bangConSearch.tenTimKiem}%) or dm.ten LIKE (%:#{#bangConSearch.tenTimKiem}%) )
                   AND (:#{#bangConSearch.trangThai} IS NULL OR sp.trang_thai = :#{#bangConSearch.trangThai})
                 GROUP BY sp.id, sp.ma, sp.ten, sp.gia, sp.mo_ta, dm.ten, sp.trang_thai
                 ORDER BY sp.ngay_tao DESC;              
                                        """, nativeQuery = true)
    List<SanPhamRepone> tim(SearchTenAndTrangThaiRequest bangConSearch);

    @Query(value = """
           SELECT
                 sp.id AS idSP,
                 sp.ma AS maSP,
                 sp.ten AS tenSP,
                 sp.gia AS giaSP,
                 sp.mo_ta AS moTaSP,
                 dm.id AS idDM,
                 dm.ten as tenDM,
                 MIN(h.url) AS linkAnh,
                 sp.trang_thai AS trangThai
                           FROM san_pham sp
               LEFT JOIN hinh_anh h ON sp.id = h.san_pham_id
               LEFT JOIN danh_muc dm ON sp.danh_muc_id = dm.id
              where sp.id=:idSP

                     """, nativeQuery = true)
    SanPhamRepone detailSP(@Param("idSP")String idSP);
}
