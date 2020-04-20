import { TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Config } from './config.booking';
import { DurationService } from './duration.service';
import { Duration } from 'src/app/data/booking/duration.model';
import { HttpResponse } from '@angular/common/http';

describe('DurationService', () => {
  let service: DurationService;
  let httpTestingController: HttpTestingController;
  let config: Config;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DurationService, Config]
    });

  service = TestBed.inject(DurationService);
  httpTestingController = TestBed.inject(HttpTestingController);
  config = TestBed.inject(Config);
  });

   afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
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

    it('#get should return an Observable<Duration[]>', () => {
      service.getDurations().subscribe(durations =>
        expect(durations).toEqual(dummyDurations),
        fail
      );

      const req = httpTestingController.expectOne(service._config.duration.uri)//config.duration.uri);
      expect(req.request.method).toEqual('GET');

      req.flush(dummyDurations);
      });
    });

    describe('#postDuration', () => {
      let dummyDuration: Duration;
      let testDate = new Date(2020, 2, 5);
      beforeEach(() => {
        dummyDuration = {
          durationId: 1,
          checkIn: new Date(2020, 2, 4),
          checkOut: testDate,
          creationDate: new Date(2020, 2, 2),
          modifiedDate: new Date(2020, 2, 3)
        } as Duration;
      });

      it('#post should return and Observable<Duration>', () => {
        service.saveDuration<Duration>(dummyDuration).subscribe(durations =>
          expect(durations.checkOut).toEqual(testDate),
          fail
        );

        let req = httpTestingController.expectOne(service._config.duration.uri);//config.duration.uri);
        expect(req.request.method).toEqual('POST');
        req.flush(dummyDuration);
      });
    });

    describe('#putDuration', () => {
      let dummyDuration: Duration;
      let testDate = new Date(2020, 2, 5);
      beforeEach(() => {
        dummyDuration = {
          durationId: 1,
          checkIn: new Date(2020, 2, 4),
          checkOut: testDate,
          creationDate: new Date(2020, 2, 2),
          modifiedDate: new Date(2020, 2, 3)
        } as Duration;
      });

      it('#put should return an Observable<Duration>', () => {
        service.putDuration<Duration>(dummyDuration).subscribe(durations =>
          expect(durations.checkOut).toEqual(testDate),
          fail
        );

        let req = httpTestingController.expectOne(service._config.duration.uri);//config.duration.uri);
        expect(req.request.method).toEqual('PUT');
        req.flush(dummyDuration);
      });
    });

    describe('#deleteDuration', () => {
      let dummyDuration: Duration;
      let testDate = new Date(2020, 2, 5);
      beforeEach(() => {
        dummyDuration = {
          durationId: 1,
          checkIn: new Date(2020, 2, 4),
          checkOut: testDate,
          creationDate: new Date(2020, 2, 2),
          modifiedDate: new Date(2020, 2, 3)
        } as Duration;
      });

      it('#delete should return an Observable<Duration>', () => {
        service.deleteDuration<Duration>(1).subscribe(durations =>
          expect(durations.checkOut).toEqual(testDate),
          fail
        );
        const url = `${service._config.duration.uri}/${dummyDuration.durationId}`;
        let req = httpTestingController.expectOne(url);//config.duration.uri);
        expect(req.request.method).toEqual('DELETE');
        req.flush(dummyDuration);
      });
    });
});
