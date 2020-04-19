import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { GuestService } from './guest.service';
import { Config } from './config.booking';
import { Guest } from 'src/app/data/booking/guest.model';

fdescribe('GuestService', () => {
  let service: GuestService;
  let config: Config;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [ HttpClientTestingModule ],
       providers: [ GuestService, Config ]
    });

    //intantiate the services using injection with TestBed
    service = TestBed.inject(GuestService);
    config = TestBed.inject(Config);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe("#getGuest", () => {
    let ExpectedGuests: Guest[];

    beforeEach(() => {
      ExpectedGuests = [
        { guestId: 1, guestType: "Single", guessFirstName: "Tango", guessLastName: "Tew"},
        { guestId: 2, guestType: "Family", guessFirstName: "Tango", guessLastName: "Tew"}
      ] as Guest[];
    });

    //Testing httpGet
    it("Expects to return all the guests", () => {
      service.getGuests().subscribe(
        guests => expect(guests).toEqual(ExpectedGuests, "should expect list of guests")
      );

      const mockReq = httpTestingController.expectOne(service._config.guest.uri);
      expect(mockReq.request.method).toEqual("GET");

      mockReq.flush(ExpectedGuests);
    });
  });

});
