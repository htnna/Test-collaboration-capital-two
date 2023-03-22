import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandEditComponent } from './brand-edit/brand-edit.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandComponent } from './brand/brand.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/brand',
    pathMatch: 'full',
  },
  {
    path: 'brand',
    component: BrandComponent,
    children: [
      {
        path: '',
        component: BrandListComponent,
      },
      {
        path: ':requestId',
        component: BrandEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandRoutingModule {}
