import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../service/product'; 
import { Product as ProductModel } from '../model/product.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductList implements OnInit {
  private productService = inject(Product);
  products = signal<ProductModel[]>([]);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.get().subscribe((data: any) => this.products.set(data));
  }

  deleteProduct(id: number | undefined) {
    if (id && confirm('Are you sure?')) {
      this.productService.delete(id).subscribe(() => {
        this.products.update(prev => prev.filter(p => p.id !== id));
      });
    }
  }
}