import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { TagFormComponent } from './tag/tag-form/tag-form.component';
import { TagListComponent } from './tag/tag-list/tag-list.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'product-create', component: ProductFormComponent },
  { path: 'product-create/:id', component: ProductFormComponent },
  { path: 'tag-create', component: TagFormComponent },
  {
    path: 'tags',
    component: TagListComponent,
  },
  { path: 'tag-create/:id', component: TagFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
