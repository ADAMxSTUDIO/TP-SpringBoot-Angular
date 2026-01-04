package com.example.tp11.controllers;

import com.example.tp11.entites.CategoryEntity;
import com.example.tp11.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // GET /api/categories → liste de toutes les catégories
    @GetMapping
    public List<CategoryEntity> list() {
        return categoryService.list();
    }

    // GET /api/categories/{id} → récupérer une catégorie
    @GetMapping("/{id}")
    public CategoryEntity get(@PathVariable Long id) {
        return categoryService.get(id);
    }

    // POST /api/categories → créer une catégorie
    @PostMapping
    public CategoryEntity create(@RequestBody CategoryEntity category) {
        return categoryService.create(category);
    }

    // PUT /api/categories/{id} → mettre à jour une catégorie
    @PutMapping("/{id}")
    public CategoryEntity update(@PathVariable Long id, @RequestBody CategoryEntity category) {
        return categoryService.update(id, category);
    }

    // DELETE /api/categories/{id} → supprimer une catégorie
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categoryService.delete(id);
    }
}

