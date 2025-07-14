package com.example.be.entity;
import com.example.be.entity.base.BaseEntity;
import lombok.*;
import jakarta.persistence.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "do_ngot")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // <-- bắt buộc với JPA
@SuperBuilder
public class DoNgot extends  BaseEntity {
    private String ma;
    private String ten;

}
