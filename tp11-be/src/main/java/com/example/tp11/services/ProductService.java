package com.example.tp11.services;

import com.example.tp11.entites.ProductEntity;
import com.example.tp11.repositories.CategoryRepository;
import com.example.tp11.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements  ProductServiceInterface {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ProductEntity create(ProductEntity product) {
        return productRepository.save(product);
    }

    @Override
    public ProductEntity update(Long id, ProductEntity product) {
        return productRepository.findById(id).map(existing -> {
            existing.setName(product.getName());
            existing.setPrice(product.getPrice());
            existing.setStock(product.getStock());
            existing.setCategory(product.getCategory());
            return productRepository.save(existing);
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public ProductEntity get(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public List<ProductEntity> list() {
        return productRepository.findAll();
    }

    @Override
    public List<ProductEntity> listByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }
}
