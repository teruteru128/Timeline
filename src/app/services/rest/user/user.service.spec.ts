import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { StorageService } from '../../storage/storage.service';
import { User, LoginCallback, ErrorResponse, MessageResponse } from '../models';
import { RouterTestingModule } from '@angular/router/testing';

const mockErrorResponse: ErrorResponse = {
  error: 'error'
};

const mockCreatedResponse: MessageResponse = {
  message: 'created'
};

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        UserService,
        StorageService
      ]
    });
  });

  it('should be created',
  inject([UserService],
    (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
