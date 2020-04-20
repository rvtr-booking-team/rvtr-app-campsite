import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { GuestService } from './guest.service';
import { Config } from './config.booking';
import { Guest } from 'src/app/data/booking/guest.model';

describe('GuestService', () => {
  let service: GuestService;
  let config: Config;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [ HttpClientTestingModule ],
       providers: [ GuestService, Config ],
    });

    //intantiate the services using injection with TestBed
    service = TestBed.inject(GuestService);
    config = TestBed.inject(Config);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('#getGuest, #postGuest', () => {
    let ExpectedGuests: Guest[];

    beforeEach(() => {
      ExpectedGuests = [
        { guestId: 1, guestType: "Single", guestFirstName: "Tango", guestLastName: "Tew"},
        { guestId: 2, guestType: "Family", guestFirstName: "Tango", guestLastName: "Tew"}
      ] as Guest[];
    });

    //Testing httpGet
    it('shoud add a guest and return it', () => {
      service.getGuests().subscribe(
        guests => expect(guests).toEqual(ExpectedGuests, 'should expect list of guests')
      );

      const req = httpTestingController.expectOne(service.config.guest.uri);
      expect(req.request.method).toEqual("GET");

      req.flush(ExpectedGuests);
    });

    //Test 3  httpcontoller should returns the 404 error into empty heroes
    it('should convert 404 into empty hero', () => {
      service.getGuests().subscribe(
        data => expect(data.length).toEqual(0, 'should convert 404 error to 0 heroes'),
        fail
      )

      const req = httpTestingController.expectOne(service.config.guest.uri);
      let msg = "404 Error";
      req.flush(msg, {status: 404, statusText: "Not found"})
    });

  });

  describe('#saveGuest', () => {
    let newGuest: Guest;
    beforeEach(() => {
      newGuest = { guestId: 1, guestType: "Single", guestFirstName: "Tango", guestLastName: "Tew"};
    });

     //Testing httpPost response
    it('Expects to return successful if guest eposted correctly', () => {

      service.saveGuest(newGuest).subscribe(
        data => expect(data).toEqual(newGuest, 'should return a guest if saved successfully')
      );

      const req = httpTestingController.expectOne(service.config.guest.uri);
      expect(req.request.method).toEqual("POST");
      expect(req.request.body).toEqual(newGuest);

      // Expect server to return the guest after POST
      const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newGuest });
      //It delivers a HttpEvent on the response stream for this request
      req.event(expectedResponse);
    });
  });

  describe('#putStatus', () => {
    let newGuest: Guest;
    beforeEach(() => {
      newGuest = { guestId: 1, guestType: "Single", guestFirstName: "Tango", guestLastName: "Tew"};
    });

    it('#put should return an Observable<Status>', () => {
      service.putGuest(newGuest).subscribe(guest =>
        expect(guest.guestType).toEqual('Single'),
        fail
        );
      const req = httpTestingController.expectOne(service.config.guest.uri);
      expect(req.request.method).toEqual('PUT');
      req.flush(newGuest);
    });
  });

  describe('#deleteStatus', () => {
    let newGuest: Guest;
    beforeEach(() => {
      newGuest = { guestId: 1, guestType: "Single", guestFirstName: "Tango", guestLastName: "Tew"};
    });

    it('#delete should return an Observable<Status>', () => {
      service.deleteGuest(1).subscribe(guest =>
        expect(guest.guestType).toEqual('Single'),
        fail
      );
      const url = `${service.config.guest.uri}/${newGuest.guestId}`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(newGuest);
    });
  });
});
