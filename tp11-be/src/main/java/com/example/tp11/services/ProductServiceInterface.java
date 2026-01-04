package com.example.tp11.services;

import com.example.tp11.entites.ProductEntity;

import java.util.List;

public interface ProductServiceInterface {
    ProductEntity create(ProductEntity product);
    ProductEntity update(Long id, ProductEntity product);
    void delete(Long id);
    ProductEntity get(Long id);
    List<ProductEntity> list();
    List<ProductEntity> listByCategory(Long categoryId);
}
