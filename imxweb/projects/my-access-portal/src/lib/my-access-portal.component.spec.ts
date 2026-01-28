import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccessPortalComponent } from './my-access-portal.component';

describe('MyAccessPortalComponent', () => {
  let component: MyAccessPortalComponent;
  let fixture: ComponentFixture<MyAccessPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccessPortalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAccessPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
