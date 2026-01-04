package com.example.tp11.entites;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double price;
    private Integer stock;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity category;
}
