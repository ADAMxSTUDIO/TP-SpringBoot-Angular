package com.example.tp11.services;

import com.example.tp11.entites.CategoryEntity;

import java.util.List;

public interface CategoryServiceInterface {
    CategoryEntity create(CategoryEntity category);
    CategoryEntity update(Long id, CategoryEntity category);
    void delete(Long id);
    CategoryEntity get(Long id);
    List<CategoryEntity> list();
}
