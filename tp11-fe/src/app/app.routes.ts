import { Routes } from '@angular/router';
import { CategoryList } from './categories/category-list/category-list';
import { CategoryForm } from './categories/category-form/category-form';
import { ProductList } from './products/product-list/product-list';
import { ProductForm } from './products/product-form/product-form';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },

    { path: 'categories', component: CategoryList },
    { path: 'categories/add', component: CategoryForm },
    { path: 'categories/edit/:id', component: CategoryForm },

    { path: 'products', component: ProductList },
    { path: 'products/add', component: ProductForm },
    { path: 'products/edit/:id', component: ProductForm },
];
