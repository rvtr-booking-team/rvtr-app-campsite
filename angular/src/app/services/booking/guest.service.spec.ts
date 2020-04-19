import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GuestService } from './guest.service';
import { Config } from './config.booking';

describe('GuestService', () => {
  let service: GuestService;
  let config: Config;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [ HttpClientTestingModule ]
    });


    service = TestBed.inject(GuestService);
    config = TestBed.inject(Config);
    
     // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
