import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessTileComponent } from './access-tile.component';

describe('AccessTileComponent', () => {
  let component: AccessTileComponent;
  let fixture: ComponentFixture<AccessTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
