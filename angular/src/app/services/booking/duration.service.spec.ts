import { TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Config } from './config.booking';
import { DurationService } from './duration.service';
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

      const req = httpMock.expectOne(service._config.duration.uri)
      expect(req.request.method).toEqual('GET');
      req.flush(dummyDurations);
      });
  });
});
