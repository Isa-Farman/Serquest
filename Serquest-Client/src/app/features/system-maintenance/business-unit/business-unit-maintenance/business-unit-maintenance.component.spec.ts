import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BusinessUnitMaintenanceComponent } from './business-unit-maintenance.component';

describe('BusinessUnitMaintenanceComponent', () => {
  let component: BusinessUnitMaintenanceComponent;
  let fixture: ComponentFixture<BusinessUnitMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessUnitMaintenanceComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessUnitMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});