import { TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Config } from './config.booking';
import { StatusService } from './status.service';
import { Status } from 'src/app/data/booking/status.model';
import { HttpResponse } from '@angular/common/http';

describe('StatusService', () => {
  let service: StatusService;
  let httpTestingController: HttpTestingController;
  let config: Config;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatusService, Config]
    });

    service = TestBed.inject(StatusService);
    httpTestingController = TestBed.inject(HttpTestingController);
    config = TestBed.inject(Config);

  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
   httpTestingController.verify();
  });

  describe('#getStatus', () => {
    let dummyStatus : Status[];

    beforeEach(() => {

      dummyStatus = [
        {
          statusId: 1, statusName: "Pending"
        },
        {
          statusId: 2,
          statusName: "complete"
        }
      ] as Status[];
    });

    afterEach(() => {
    // After every test, assert that there are no more pending requests.
     httpTestingController.verify();
    });

    it('should return an Observable<Status[]>', () => {
      service.getStatus().subscribe(
                            statuses => expect(statuses).toEqual(dummyStatus),
                            fail
                          );

      const req = httpTestingController.expectOne(service._config.status.uri);
      expect(req.request.method).toEqual('GET');

      req.flush(dummyStatus);
    });

      //Test 3  httpcontoller should returns the 404 error into empty heroes
    it("should convert 404 into empty status", () => {
      service.getStatus().subscribe(
        data => expect(data.length).toEqual(0, "should convert 404 error to 0 status"),
        fail
      );

      const req = httpTestingController.expectOne(service._config.status.uri);
      let msg = "404 Error";
      req.flush(msg, {status: 404, statusText: "Not found"})
    });
  });

  describe("#saveStatus", () => {
    let newStatus: Status;

    beforeEach(() => {
      newStatus =  { statusId: 1, statusName: "Pending"};
    });

    //Testing httpPost response
    it("Expects to return successful if status posted correctly", () => {

      service.saveStatus(newStatus).subscribe(
        data => expect(data).toEqual(newStatus, "should return a status if saved successfully")
      );

      const req = httpTestingController.expectOne(service._config.status.uri);
      expect(req.request.method).toEqual("POST");
      expect(req.request.body).toEqual(newStatus);

      // Expect server to return the status after POST
      const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newStatus });
      //It delivers a HttpEvent on the response stream for this request
      req.event(expectedResponse);
    });
  });

  describe("#putStatus", () => {
    let newStatus: Status;

    beforeEach(() => {
      newStatus =  { statusId: 1, statusName: "Pending"};
    });

    it('#put should return an Observable<Status>', () =>{
      service.putStatus<Status>(newStatus).subscribe(status =>
        expect(status.statusName).toEqual("Pending"),
        fail
        );
      let req = httpTestingController.expectOne(service._config.status.uri);
      expect(req.request.method).toEqual('PUT');
      req.flush(newStatus);
    });
  });

  describe("#deleteStatus", () => {
    let newStatus: Status;

    beforeEach(() => {
      newStatus =  { statusId: 1, statusName: "Pending"} as Status;
    });
    it('#delete should return an Observable<Status>', () => {
      service.deleteStatus<Status>(1).subscribe(status =>
        expect(status.statusName).toEqual("Pending"),
        fail
      );
      const url = `${service._config.status.uri}/${newStatus.statusId}`;
      let req = httpTestingController.expectOne(url);//config.duration.uri);
      expect(req.request.method).toEqual('DELETE');
      req.flush(newStatus);
    });
  });

});
