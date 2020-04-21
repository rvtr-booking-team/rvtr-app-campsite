import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
       providers: [ GuestService, Config ],
    });
    service = TestBed.inject(GuestService);
    config = TestBed.inject(Config);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('#getGuest, #postGuest', () => {
    let ExpectedGuests: Guest[];

    beforeEach(() => {
      ExpectedGuests = [
        { guestId: 1, guestType: 'Single', guestFirstName: 'Tango', guestLastName: 'Tew'},
        { guestId: 2, guestType: 'Family', guestFirstName: 'Tango', guestLastName: 'Tew'}
      ] as Guest[];
    });

    it('shoud add a guest and return it', () => {
      service.get().subscribe(
        guests => expect(guests).toEqual(ExpectedGuests, 'should expect list of guests')
      );

      const req = httpTestingController.expectOne(service.config.guest.uri);
      expect(req.request.method).toEqual('GET');

      req.flush(ExpectedGuests);
    });


    it('should convert 404 into empty hero', () => {
      service.get().subscribe(
        data => expect(data.length).toEqual(0, 'should convert 404 error to 0 heroes'),
        fail
      );

      const req = httpTestingController.expectOne(service.config.guest.uri);
      const msg = '404 Error';
      req.flush(msg, {status: 404, statusText: 'Not found'});
    });

  });

  describe('#saveGuest', () => {
    let newGuest: Guest;
    beforeEach(() => {
      newGuest = { guestId: 1, guestType: 'Single', guestFirstName: 'Tango', guestLastName: 'Tew'};
    });

    it('Expects to return successful if guest posted correctly', () => {
      service.post(newGuest).subscribe(
        data => expect(data).toEqual(newGuest, 'should return a guest if saved successfully')
      );

      const req = httpTestingController.expectOne(service.config.guest.uri);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newGuest);
      const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newGuest });
      req.event(expectedResponse);
    });
  });

  describe('#putGuest', () => {
    let newGuest: Guest;
    beforeEach(() => {
      newGuest = { guestId: 1, guestType: 'Single', guestFirstName: 'Tango', guestLastName: 'Tew'};
    });

    it('#put should return an Observable<Guest>', () => {
      service.put(newGuest).subscribe(guest => {
        expect(guest).toEqual(newGuest,
          fail
        );
        const req = httpTestingController.expectOne(service.config.duration.uri);
        expect(req.request.method).toEqual('PUT');
        req.flush(newGuest);
      });
    });
  });

  describe('#deleteGuest', () => {
    let newGuest: Guest;
    beforeEach(() => {
      newGuest = { guestId: 1, guestType: 'Single', guestFirstName: 'Tango', guestLastName: 'Tew'};
    });

    it('#delete should return an Observable<Guest>', () => {
      service.delete(1).subscribe(guest =>
        expect(guest).toEqual(newGuest, fail)
      );
      const url = `${service.config.guest.uri}/${newGuest.guestId}`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(newGuest);
    });
  });
});
