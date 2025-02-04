import { User } from './user.interface';

export interface Event {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  userId: number;
}
