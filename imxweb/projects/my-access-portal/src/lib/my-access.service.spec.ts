import { TestBed } from '@angular/core/testing';

import { MyAccessService } from './my-access.service';

describe('MyAccessService', () => {
  let service: MyAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
