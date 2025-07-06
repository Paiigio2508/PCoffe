package com.example.be.entity;
import com.example.be.entity.base.BaseEntity;
import lombok.*;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "topping")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Topping extends BaseEntity{
    private String ma;
    private String ten;
    private BigDecimal gia;
}
