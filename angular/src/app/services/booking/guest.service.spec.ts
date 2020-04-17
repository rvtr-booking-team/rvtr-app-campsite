import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GuestService } from './guest.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Guest } from 'src/app/data/booking/guest.model';
import { config } from 'process';

describe('GuestService', () => {
  let service: GuestService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestService);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]});

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  //test starting
  it('can test reservation.get', () =>{
    const testData: Guest = {guessFirstName: "tango", guessLastName: "tew", guestId: 1, guestType: "single" };


    //make http call.
    httpClient.get<Guest>("uri")
    .subscribe(data =>
      // When observable resolves, result should match test data
      expect(data).toEqual(testData)
    );

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne('/reservation');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
