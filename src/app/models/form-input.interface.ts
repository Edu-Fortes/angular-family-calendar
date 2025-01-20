import { FamilyMember } from "./family-members.data";

export interface CreateEventForm {
    allDay: boolean,
    eventTitle: string,
    familyMember: FamilyMember
}

export interface EditEventForm {
    allDay: boolean,
    eventTitle: string,
    familyMember: FamilyMember
    startDateStr: string,
    endDateStr: string
}