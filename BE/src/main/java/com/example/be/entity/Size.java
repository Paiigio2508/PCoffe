package com.example.be.entity;
import com.example.be.entity.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Entity
@Table(name = "size")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // <-- bắt buộc với JPA
@SuperBuilder
public class Size extends BaseEntity {
    private String ma;
    private String ten;
    private BigDecimal phuThu;
}
