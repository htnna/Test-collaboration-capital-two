import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandEditComponent } from './brand-edit/brand-edit.component';
import { BrandComponent } from './brand/brand.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [BrandListComponent, BrandEditComponent, BrandComponent],
  imports: [
    CommonModule,
    BrandRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    DataViewModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TagModule,
    CalendarModule,
    CheckboxModule,
  ],
})
export class BrandModule {}
