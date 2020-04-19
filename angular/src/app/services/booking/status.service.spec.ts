// import { TestBed, getTestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { Config } from './config.booking';
// import { StatusService } from './status.service';

// describe('StatusService', () => {
//   let service: StatusService;
//   let httpMock: HttpTestingController;
//   let injector: TestBed;
//   let config: Config;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [StatusService]
//     });
//     injector = getTestBed();
//     service = injector.get(StatusService);
//     httpMock = injector.get(HttpTestingController);
//     config = injector.get(Config);
//   });

//   describe('#getStatus', () => {
//     it('should return an Observable<Status[]>', () => {
//       const dummyStatus = [
//         {
//           statusId: 1,
//           statusName: 'Confirmed'
//         },
//         {
//           statusId: 2,
//           statusName: 'Cancelled'
//         },
//         {
//           statusId: 3,
//           statusName: 'Pending'
//         }
//       ];

//       service.get().subscribe(status => {
//         expect(status.length).toBe(3);
//         expect(status).toEqual(dummyStatus);
//       });

//       const req = httpMock.expectOne(`${config.status}`)
//       expect(req.request.method).toBe("GET");
//       req.flush(dummyStatus);
//       });
//   })
// });
