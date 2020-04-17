import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ReservationService } from './reservation.service';

describe('ReservationService', () => {
  let service: ReservationService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ReservationService]
  });
  service = injector.get(ReservationService);
  httpMock = injector.get(HttpTestingController);
  injector = getTestBed();

  describe('#getReservation', () => {
    it('should return an Observable<Reservation[]>', () => {
      //dummy data
      const dummyReservation = [
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
            guestId: 1,
            guestType: 'adult',
            guestFirstName: 'John',
            guestLastName: 'Smith'            
          },
          notes: 'accommodations ...'
        },
      ]
      
    })
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
