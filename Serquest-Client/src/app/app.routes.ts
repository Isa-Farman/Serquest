import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'system-maintenance/business-unit',
    loadComponent: () =>
      import(
        './features/system-maintenance/business-unit/business-unit-maintenance/business-unit-maintenance.component'
      ).then((m) => m.BusinessUnitMaintenanceComponent)
  },
  {
    path: '',
    redirectTo: 'system-maintenance/business-unit',
    pathMatch: 'full'
  }
];