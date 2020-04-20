import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ReservationService } from './reservation.service';
import { Reservation } from '../../data/booking/reservation.model';
import { Config } from './config.booking';

describe('ReservationService', () => {
  let service: ReservationService;
  let httpMock: HttpTestingController;
  let config: Config;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservationService, Config]
    });

    //Instantiate the services by injecting them in the TestBed
    service = TestBed.inject(ReservationService);
    httpMock = TestBed.inject(HttpTestingController);
    config = TestBed.inject(Config);
  });

  describe('#getReservations', () => {
    let dummyReservations: Reservation[];

    beforeEach(() => {
      dummyReservations = [
        {
          reservationId: 1,
          accountId: 1,
          rentalId: 1,
          duration: {
            durationId: 1,
            checkIn: new Date(2020, 2, 4),
            checkOut: new Date(2020, 2, 5),
            creationDate: new Date(2020, 2, 2),
            modifiedDate: new Date(2020, 2, 3)
          },
          status: {
            statusId: 1,
            statusName: 'Pending'
          },
          guests: {
            // {
            //   guestId: 1,
            //   guestType: 'adult',
            //   guestFirstName: 'John',
            //   guestLastName: 'Smith'
            // },
          },
          notes: 'accommodations ...'
        },
      ] as Reservation[];
    })

    it('should return an Observable<Reservation[]>', () => {
      service.getReseravtions().subscribe(
        reservations => expect(reservations).toEqual(dummyReservations, "should expect list of reservations"),
        fail
      );

      const req = httpMock.expectOne(config.reservation.uri);
      expect(req.request.method).toEqual("GET");

      req.flush(dummyReservations);
    });
  })
});
