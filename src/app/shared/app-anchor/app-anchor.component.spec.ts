import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAnchorComponent } from './app-anchor.component';

describe('AppAnchorComponent', () => {
  let component: AppAnchorComponent;
  let fixture: ComponentFixture<AppAnchorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppAnchorComponent]
    });
    fixture = TestBed.createComponent(AppAnchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
