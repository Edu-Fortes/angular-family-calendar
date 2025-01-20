import { FamilyMember } from './family-members.data';

export interface CreateEventForm {
  allDay: boolean;
  eventTitle: string;
  familyMember: FamilyMember;
}

export interface EditEventForm {
  allDay: boolean;
  eventTitle: string;
  familyMember: FamilyMember;
  startDate: string;
  endDate: string;
}
