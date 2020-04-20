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

    it('should return an Observable<Duration[]>', () => {
      service.getDurations().subscribe(durations =>
        expect(durations).toEqual(dummyDurations),
        fail
      );

      const req = httpTestingController.expectOne(service._config.duration.uri)
      expect(req.request.method).toEqual('GET');

      req.flush(dummyDurations);
      });

  //     //Test 2  httpcontoller should returns the 404 error into empty heroes
  //   it("should convert 404 into empty duration", () => {
  //     service.getDurations().subscribe(
  //       data => expect(data.length).toEqual(0, "should convert 404 error to 0 duratiopn"),
  //       fail
  //     )

  //     const req = httpTestingController.expectOne(service._config.duration.uri);
  //     let msg = "404 Error";
  //     req.flush(msg, {status: 404, statusText: "Not found"})
  //   });
  // });

  // describe("#saveDuration", () => {
  //   let newDuration: Duration;
  //   beforeEach(() => {
  //     newDuration =  {
  //           durationId: 2,
  //           checkIn: new Date(2020, 2, 4),
  //           checkOut: new Date(2020, 2, 5),
  //           creationDate: new Date(2020, 2, 2),
  //           modifiedDate: new Date(2020, 2, 3)
  //         };
  //   });

  //   //Testing httpPost response
  //   it("Expects to return successful if duration posted correctly", () => {
  //     service.saveDuration(newDuration).subscribe(
  //       data => expect(data).toEqual(newDuration, "should return a duration if saved successfully"),
  //       fail
  //     );

  //     const req = httpTestingController.expectOne(service._config.duration.uri);
  //     expect(req.request.method).toEqual("POST");
  //     expect(req.request.body).toEqual(newDuration);

  //     // Expect server to return the duration after POST
  //     const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newDuration });
  //     //It delivers a HttpEvent on the response stream for this request
  //     req.event(expectedResponse);
  //   });
  });
});
