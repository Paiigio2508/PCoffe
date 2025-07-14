package com.example.be.entity;
import com.example.be.entity.base.BaseEntity;
import lombok.*;
import jakarta.persistence.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Entity
@Table(name = "topping")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // <-- bắt buộc với JPA
@SuperBuilder
public class Topping extends BaseEntity{
    private String ma;
    private String ten;
    private BigDecimal gia;
}
