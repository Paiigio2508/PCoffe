package com.example.be.entity;
import com.example.be.entity.base.BaseEntity;
import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "muc_da")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class MucDa extends BaseEntity{
    private String ma;
    private String ten;
}
