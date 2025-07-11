import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomandationComponent } from './recomandation.component';

describe('RecomandationComponent', () => {
  let component: RecomandationComponent;
  let fixture: ComponentFixture<RecomandationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomandationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecomandationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
