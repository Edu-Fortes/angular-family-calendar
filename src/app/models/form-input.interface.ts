import { User } from './user.interface';

export interface CreateEventForm {
  allDay: boolean;
  eventTitle: string;
  familyMember: User;
  weekDay: string;
  timePeriod: string;
  repeatEvery: string;
}

export interface EditEventForm {
  [key: string]: any;
  allDay: boolean | null;
  title: string | null;
  userId?: number | null;
  start: Date | null;
  end: Date | null;
}
