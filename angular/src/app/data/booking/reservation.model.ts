import { Guest } from './guest.model';
import { Duration } from './duration.model';
import { Status } from './status.model';

/**
 * Represents the _Reservation_ model
 *
 * ```yaml
 * reservationId: number;
 * accountId: number;
 * rentalId: number;
 * status: Status;
 * duration: Duration;
 * guests: Guest[];
 * ```
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
