package com.example.tp11.services;


import com.example.tp11.entites.CategoryEntity;
import com.example.tp11.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements CategoryServiceInterface{
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public CategoryEntity create(CategoryEntity category) {
        return categoryRepository.save(category);
    }

    @Override
    public CategoryEntity update(Long id, CategoryEntity category) {
        Optional<CategoryEntity> existing = categoryRepository.findById(id);
        if (existing.isPresent()) {
            CategoryEntity c = existing.get();
            c.setName(category.getName());
            c.setDescription(category.getDescription());
            return categoryRepository.save(c);
        }
        return null; // ou lancer une exception
    }

    @Override
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryEntity get(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public List<CategoryEntity> list() {
        return categoryRepository.findAll();
    }
}
