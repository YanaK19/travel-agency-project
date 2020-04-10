import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesOrdersComponent } from './countries-orders.component';

describe('CountriesOrdersComponent', () => {
  let component: CountriesOrdersComponent;
  let fixture: ComponentFixture<CountriesOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
