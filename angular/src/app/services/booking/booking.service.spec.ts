import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookingService } from './booking.service';
import { Reservation } from 'src/app/data/booking/reservation.model';
import { Config } from './config.booking';

describe('BookingService', () => {
  let service: BookingService;
  let httpTestingController: HttpTestingController;
  let config: Config;

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

  describe('#getByAccountId', () => {
    let dummyReservation: Reservation[];
    let expectedReservation: Reservation[];

    beforeEach(() => {
      dummyReservation = [];
    });
    it('should returns undefine from getByAccountId', () => {
       const id = 1;
       expectedReservation = service.getByAccountId(id);
       expect(expectedReservation).toEqual(undefined, 'should return undefined');

       const req = httpTestingController.expectOne(`${config.reservation.uri}/?id=${id}`);
       expect(req.request.method).toEqual('GET');
       req.flush(dummyReservation);
    });
  });

  describe('#getByDates', () => {
    let dummyReservation: Reservation[];
    let expectedReservation: Reservation[];

    beforeEach(() => {
      dummyReservation = [];
    });
    it('should returns empty array', () => {
       const startDate = new Date();
       const endDate = new Date();
       expectedReservation = service.getByDates(startDate, endDate);
       expect(expectedReservation).toEqual(dummyReservation, 'should return empty array');

    });
  });
});

