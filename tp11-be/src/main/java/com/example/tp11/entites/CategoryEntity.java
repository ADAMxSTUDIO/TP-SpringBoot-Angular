package com.example.tp11.entites;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;

@Entity
@Table
@Data
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
}
