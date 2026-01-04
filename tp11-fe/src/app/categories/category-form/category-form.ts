import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../service/category';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss',
})
export class CategoryForm implements OnInit {
  private fb = inject(FormBuilder);
  private categoryService = inject(Category);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Track if we are editing
  isEditMode = signal<boolean>(false);
  categoryId = signal<number | null>(null);

  categoryForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required]
  });

  ngOnInit() {
    // Check URL for ID: e.g., /categories/edit/5
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.categoryId.set(+id);
      this.loadCategoryData(+id);
    }
  }

  loadCategoryData(id: number) {
    this.categoryService.getById(id).subscribe({
      next: (data) => this.categoryForm.patchValue(data),
      error: (err) => console.error('Could not load category', err)
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) return;

    const formData = this.categoryForm.getRawValue() as any;
    const request$ = this.isEditMode() 
      ? this.categoryService.update(this.categoryId()!, formData) 
      : this.categoryService.create(formData);

    request$.subscribe({
      next: () => {
        this.router.navigate(['/categories']);
      },
      error: (err) => console.error('Operation failed', err)
    });
  }
}