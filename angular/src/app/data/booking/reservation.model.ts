import { Guest } from './guest.model';
import { Duration } from './duration.model';
import { Status } from './status.model';

/**
 * Represents Reservation object model.
 * class
 */

export class Reservation {
  reservationId: number;
  accountId: number;
  rentalId: number;
  duration: Duration;
  status: Status;
  guests: Guest[];
  notes: string;
}
