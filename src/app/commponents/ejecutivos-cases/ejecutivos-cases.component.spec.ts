import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjecutivosCasesComponent } from './ejecutivos-cases.component';

describe('EjecutivosCasesComponent', () => {
  let component: EjecutivosCasesComponent;
  let fixture: ComponentFixture<EjecutivosCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjecutivosCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjecutivosCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
