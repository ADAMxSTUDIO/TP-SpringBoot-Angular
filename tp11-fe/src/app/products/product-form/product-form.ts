import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../service/product';
import { Category } from '../../categories/service/category';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(Product);
  private categoryService = inject(Category);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEditMode = signal(false);
  productId = signal<number | null>(null);
  categories = signal<any[]>([]); // To populate the dropdown

  productForm = this.fb.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    categoryId: [null as any, Validators.required]
  });

  ngOnInit() {
    // 1. Load categories for the dropdown
    this.categoryService.get().subscribe(data => this.categories.set(data));

    // 2. Check for Edit Mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.productId.set(+id);
      this.productService.getById(+id).subscribe((product: any) => {
        this.productForm.patchValue(product);
      });
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const data = this.productForm.getRawValue() as any;
    const request$ = this.isEditMode() 
      ? this.productService.update(this.productId()!, data)
      : this.productService.create(data);

    request$.subscribe({
      next: () => this.router.navigate(['/products']),
      error: (err) => console.error('Saving failed', err)
    });
  }
}
