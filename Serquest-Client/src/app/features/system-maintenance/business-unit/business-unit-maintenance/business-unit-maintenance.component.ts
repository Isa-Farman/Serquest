import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core'; // <-- Import TranslatePipe instead of TranslateModule
import { BusinessUnit } from '../models/business-unit.model';
import { BusinessUnitService } from '../services/business-unit.service';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-business-unit-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe, // <-- Use TranslatePipe here
    TableModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './business-unit-maintenance.component.html',
  styleUrls: ['./business-unit-maintenance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessUnitMaintenanceComponent implements OnInit {
  private readonly buService = inject(BusinessUnitService);
  private readonly translate = inject(TranslateService);

  readonly currentLang = signal<string>('en');
  readonly gridData = signal<BusinessUnit[]>([]);
  readonly formData = signal<BusinessUnit>(this.getEmptyForm());
  readonly showInputPage = signal<boolean>(false);
  readonly isLoading = signal<boolean>(false);
  readonly isEditMode = signal<boolean>(false);

  ngOnInit(): void {
  this.translate.use('en');
  this.loadGridData();
}

  onLanguageChange(event: Event): void {
    const lang = (event.target as HTMLSelectElement).value;
    this.currentLang.set(lang);
    this.translate.use(lang);
  }

  updateFormField<K extends keyof BusinessUnit>(field: K, value: BusinessUnit[K]): void {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  loadGridData(): void {
    this.isLoading.set(true);
    this.buService.getAll().subscribe({
      next: (data) => {
        this.gridData.set(data ?? []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching business units:', err);
        this.isLoading.set(false);
      }
    });
  }

  onAddNew(): void {
    this.formData.set(this.getEmptyForm());
    this.isEditMode.set(false);
    this.showInputPage.set(true);
  }

  onSelectRow(row: BusinessUnit): void {
    this.formData.set(structuredClone(row));
    this.isEditMode.set(true);
    this.showInputPage.set(true);
  }

  onSave(): void {
    if (!this.validateBeforeSave()) return;

    const form = this.formData();
    this.isLoading.set(true);

    if (this.isEditMode() && form.id) {
      this.buService.update(form.id, form)
        .subscribe(this.buildSaveObserver());
    } else {
      const createPayload = { ...form, createdBy: form.createdBy || 'Intern' };
      this.buService.create(createPayload)
        .subscribe(this.buildSaveObserver());
    }
  }

  private buildSaveObserver() {
    return {
      next: (): void => {
        this.showInputPage.set(false);
        this.loadGridData();
      },
      error: (err: unknown): void => {
        console.error('Error saving business unit:', err);
        this.isLoading.set(false);
      },
      complete: (): void => this.isLoading.set(false)
    };
  }

  onCancel(): void {
    this.formData.set(this.getEmptyForm());
    this.showInputPage.set(false);
  }

  private validateBeforeSave(): boolean {
    const form = this.formData();
    return !!form.businessUnit?.trim() && !!form.businessUnitName?.trim();
  }

  private getEmptyForm(): BusinessUnit {
    return {
      businessUnit: '',
      businessUnitName: '',
      addressLine1: '',
      telephoneNumber: '',
      isActive: true,
      createdBy: 'Intern',
      logo: '',
      district: ''
    };
  }
}