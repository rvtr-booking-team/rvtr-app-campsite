// import { TestBed, getTestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { Config } from './config.booking';
// import { DurationService } from './duration.service';

// describe('DurationService', () => {
//   let service: DurationService;
//   let httpMock: HttpTestingController;
//   let injector: TestBed;
//   let config: Config;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [DurationService]
//     });
//     injector = getTestBed();
//     service = injector.get(DurationService);
//     httpMock = injector.get(HttpTestingController);
//     config = injector.get(Config);

//   });

//   describe('#getDurations', () => {
//     it('should return an Observable<Duration[]>', () => {
//       let dummyDurations = [
//         {
//           durationId: 1,
//           checkIn: new Date(2019, 1, 4),
//           checkOut: new Date(2019, 1, 5),
//           creationDate: new Date(2019, 1, 2),
//           modifiedDate: new Date(2019, 1, 3)
//         },
//         {
//           durationId: 2,
//           checkIn: new Date(2020, 2, 4),
//           checkOut: new Date(2020, 2, 5),
//           creationDate: new Date(2020, 2, 2),
//           modifiedDate: new Date(2020, 2, 3)
//         }
//       ];

//       service.get().subscribe(durations => {
//         expect(durations.length).toBe(2);
//         expect(durations).toEqual(dummyDurations);
//       });

//       let req = httpMock.expectOne(`${config.duration}`);
//       expect(req.request.method).toBe("GET");
//       req.flush(dummyDurations);
//       });

//           //404 error testing
//     it('can test for 404 error', () => {
//       const emsg = '404 Error Test';

//       service.get().subscribe( data =>
//         fail('should have failed with 404 error'),
//         (error: HttpErrorResponse) => {
//           expect(error.status).toEqual(404, 'status');
//           expect(error.error).toEqual(emsg, 'message');

//       });
//       let req = httpMock.expectOne(`${config.duration}`);
//       req.flush(emsg, {status: 404, statusText: 'Not Found'});
//     });
//   });
// });
