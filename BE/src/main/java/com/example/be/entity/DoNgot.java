package com.example.be.entity;
import com.example.be.entity.base.BaseEntity;
import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "do_ngot")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class DoNgot extends  BaseEntity {
    private String ma;
    private String ten;

}
