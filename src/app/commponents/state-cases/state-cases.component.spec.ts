import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCasesComponent } from './state-cases.component';

describe('StateCasesComponent', () => {
  let component: StateCasesComponent;
  let fixture: ComponentFixture<StateCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
