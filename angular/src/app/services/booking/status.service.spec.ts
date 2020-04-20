import { TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Config } from './config.booking';
import { StatusService } from './status.service';
import { Status } from 'src/app/data/booking/status.model';

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

  describe('#getStatuss', () => {
    let dummyStatuss : Status[];
    beforeEach(() => {
       dummyStatuss = [
        {
          statusId: 1, statusName: "Pending"
        },
        {
          statusId: 2,
          statusName: "complete"
        }
      ] as Status[];
    });

    it('should return an Observable<Status[]>', () => {
      service.getStatus().subscribe(
                          statuses => expect(statuses).toEqual(dummyStatuss),
                          fail
      );

      const req = httpTestingController.expectOne(service._config.status.uri)
      expect(req.request.method).toEqual('GET');

      req.flush(dummyStatuss);

      });
  });
});
