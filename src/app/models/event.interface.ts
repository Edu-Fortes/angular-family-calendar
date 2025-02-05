import { User } from './user.interface';

export interface Event {
  eventId?: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  extendedProps?: string;
  userId: number;
}
