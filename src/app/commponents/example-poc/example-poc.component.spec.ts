import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplePocComponent } from './example-poc.component';

describe('ExamplePocComponent', () => {
  let component: ExamplePocComponent;
  let fixture: ComponentFixture<ExamplePocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamplePocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamplePocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
