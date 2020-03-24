import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneLoaderComponent } from './plane-loader.component';

describe('PlaneLoaderComponent', () => {
  let component: PlaneLoaderComponent;
  let fixture: ComponentFixture<PlaneLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
