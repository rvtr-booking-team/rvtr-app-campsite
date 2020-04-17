import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DurationService } from './duration.service';

describe('DurationService', () => {
  let service: DurationService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DurationService]
    });
    injector = getTestBed();
    service = injector.get(DurationService);
    httpMock = injector.get(HttpTestingController);
    
  });

  describe('#getDurations', () => {
    it('should return an Observable<Duration[]>', () => {
      //dummy data
      const dummyDuration = [
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
      ];

      service.Get().subscribe( duration =>{
        expect(duration).toEqual(dummyDuration);
      });

    })
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
