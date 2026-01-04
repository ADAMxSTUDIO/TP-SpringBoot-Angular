package com.example.tp11.repositories;

import com.example.tp11.entites.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    List<ProductEntity> findByCategoryId(Long categoryId);
}
