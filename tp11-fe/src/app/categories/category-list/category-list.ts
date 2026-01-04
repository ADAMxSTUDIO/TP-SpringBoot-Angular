import { Component, inject, signal, OnInit } from '@angular/core';
import { Category } from '../service/category';
import { Category as CategoryModel } from '../model/category.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true, // Required in 2026 if not in a module
  imports: [RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryList implements OnInit {
  private categoryService = inject(Category);
  categoriesArr = signal<CategoryModel[]>([]);

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.get().subscribe({
      next: (res: any) => {
        this.categoriesArr.set(res.body || res);
        console.log(this.categoriesArr);
         
      },
      error: (err) => {
        console.error('Error fetching categories:', err.message); 
      }
    });
  }

  deleteCategory(i: any) {
    let id = Number(i); 
    this.categoryService.delete(id).subscribe({
      next: () => {
        console.log(`Category with id ${id} deleted successfully.`);
        this.getCategories(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error(`Error deleting category with id ${id}:`, err.message);
      }
    });
  }
}