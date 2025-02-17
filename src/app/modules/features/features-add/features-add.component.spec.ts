import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesAddComponent } from './features-add.component';

describe('FeaturesAddComponent', () => {
  let component: FeaturesAddComponent;
  let fixture: ComponentFixture<FeaturesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
