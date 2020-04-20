import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Config } from './config.booking';
import { DurationService } from './duration.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Duration } from 'src/app/data/booking/duration.model';

describe('DurationService', () => {
  let service: DurationService;
  let httpMock: HttpTestingController;
  let config: Config;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DurationService, Config]
    });
    service = TestBed.inject(DurationService);
    httpMock = TestBed.inject(HttpTestingController);
    config = TestBed.inject(Config);

  });

   afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  describe('#getDurations', () => {
    let dummyDurations : Duration[];
    beforeEach(() => {
       dummyDurations = [
        {
          durationId: 1,
          checkIn: new Date(2019, 1, 4),
          checkOut: new Date(2019, 1, 5),
          creationDate: new Date(2019, 1, 2),
          modifiedDate: new Date(2019, 1, 3)
        },
        {
          durationId: 2,
          checkIn: new Date(2020, 2, 4),
          checkOut: new Date(2020, 2, 5),
          creationDate: new Date(2020, 2, 2),
          modifiedDate: new Date(2020, 2, 3)
        }
      ] as Duration[];
    });

    it('should return an Observable<Duration[]>', () => {
      service.getDurations().subscribe(durations =>
        expect(durations).toEqual(dummyDurations),
        fail
      );

      const req = httpMock.expectOne('api/duration')//config.duration.uri);
      expect(req.request.method).toEqual('GET');
      req.flush(dummyDurations);
      });

          //404 error testing
    // it('can test for 404 error', () => {
    //   const emsg = '404 Error Test';

    //   service.get().subscribe( data =>
    //     fail('should have failed with 404 error'),
    //     (error: HttpErrorResponse) => {
    //       expect(error.status).toEqual(404, 'status');
    //       expect(error.error).toEqual(emsg, 'message');

    //   });
    //   let req = httpMock.expectOne(`${config.duration.uri}`);
    //   req.flush(emsg, {status: 404, statusText: 'Not Found'});
    // });
  });
});
