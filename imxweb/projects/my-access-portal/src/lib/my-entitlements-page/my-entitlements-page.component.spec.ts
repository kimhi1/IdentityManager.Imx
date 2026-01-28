import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEntitlementsPageComponent } from './my-entitlements-page.component';

describe('MyEntitlementsPageComponent', () => {
  let component: MyEntitlementsPageComponent;
  let fixture: ComponentFixture<MyEntitlementsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyEntitlementsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyEntitlementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
