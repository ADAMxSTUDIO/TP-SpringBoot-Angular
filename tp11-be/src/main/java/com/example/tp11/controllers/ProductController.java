package com.example.tp11.controllers;


import com.example.tp11.entites.ProductEntity;
import com.example.tp11.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // GET /api/products → liste de tous les produits
    @GetMapping
    public List<ProductEntity> list() {
        return productService.list();
    }

    // GET /api/products/{id} → récupérer un produit
    @GetMapping("/{id}")
    public ProductEntity get(@PathVariable Long id) {
        return productService.get(id);
    }

    // GET /api/products/category/{id} → liste par catégorie
    @GetMapping("/category/{id}")
    public List<ProductEntity> listByCategory(@PathVariable Long id) {
        return productService.listByCategory(id);
    }

    // POST /api/products → créer un produit
    @PostMapping
    public ProductEntity create(@RequestBody ProductEntity product) {
        return productService.create(product);
    }

    // PUT /api/products/{id} → mettre à jour un produit
    @PutMapping("/{id}")
    public ProductEntity update(@PathVariable Long id, @RequestBody ProductEntity product) {
        return productService.update(id, product);
    }

    // DELETE /api/products/{id} → supprimer un produit
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }
}
