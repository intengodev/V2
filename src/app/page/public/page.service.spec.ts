/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PageService }            from './page.service';

describe('Service: PageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageService]
    });
  });

  it('should ...', inject([PageService], (service: PageService) => {
    expect(service).toBeTruthy();
  }));
});
