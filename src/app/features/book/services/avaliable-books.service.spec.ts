import { TestBed } from '@angular/core/testing';

import { AvaliableBooksService } from './avaliable-books.service';

describe('AvaliableBooksService', () => {
  let service: AvaliableBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaliableBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
