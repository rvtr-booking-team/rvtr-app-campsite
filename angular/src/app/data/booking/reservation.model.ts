import { Guest } from './guest.model';
import { Duration } from './duration.model';
import { Status } from './status.model';

/**
 * Represents a book.
 * @
 */

export class Reservation {
  reservationId: number;
  accountId: number;
  rentalId: number;
  duration: Duration;
  status: Status;
  guests: Array<Guest>;
  notes: string;
}
