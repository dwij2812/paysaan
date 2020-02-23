import { TestBed } from '@angular/core/testing';

import { EncryptDecryptService } from './encrypt-decrypt.service';

describe('EncryptDecryptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncryptDecryptService = TestBed.get(EncryptDecryptService);
    expect(service).toBeTruthy();
  });
});
