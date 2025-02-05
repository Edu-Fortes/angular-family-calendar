import { User } from './user.interface';

export interface CreateEventForm {
  allDay: boolean;
  eventTitle: string;
  familyMember: User;
}

export interface EditEventForm {
  allDay: boolean | null;
  title: string | null;
  userId?: number | null;
  start: string | null;
  end: string | null;
}
