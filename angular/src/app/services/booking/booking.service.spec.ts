import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReservationService } from './reservation.service';
import { HttpResponse } from '@angular/common/http';
import { BookingService } from './booking.service';
import { Guest } from 'src/app/data/booking/guest.model';
import { Reservation } from 'src/app/data/booking/reservation.model';
import { GuestService } from './guest.service';
import { DurationService } from './duration.service';
import { StatusService } from './status.service';
import { Config } from './config.booking';

fdescribe('BookingService', () => {
  let service: BookingService;
  let config: Config;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingService, Config]
    });

    // Instantiate the services by injecting them in the TestBed
    service = TestBed.inject(BookingService);
    config = TestBed.inject(Config);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('#getById', () => {
    let dummyGuest: GuestService[];
    let dummyDuration: DurationService[];
    let dummyStatus: StatusService[];
    let dummyReservation: ReservationService[];

    beforeEach(() => {
      dummyReservation = [];
    });
    it('should be created', () => {
       const id = 1;
       service.getById(id).subscribe(
        data => expect(data.length).toEqual(dummyReservation, 'should convert 404 error to 0 heroes'),
        fail
      );

      const req = httpTestingController.expectOne(`${this.config.reservation.uri}/?id=${id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(dummyReservation);
    });
  });
});

