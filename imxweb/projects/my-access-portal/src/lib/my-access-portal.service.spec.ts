import { TestBed } from '@angular/core/testing';

import { MyAccessPortalService } from './my-access-portal.service';

describe('MyAccessPortalService', () => {
  let service: MyAccessPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAccessPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
