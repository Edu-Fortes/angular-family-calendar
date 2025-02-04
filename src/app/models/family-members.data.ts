export interface FamilyMember {
  id: number;
  name: string;
  color: string;
  textColor?: string;
}

export const familyMembers: FamilyMember[] = [
  {
    id: 1,
    name: 'Toda a família',
    color: 'sky',
    textColor: 'white',
  },
  {
    id: 2,
    name: 'Mãe',
    color: 'red',
  },
  {
    id: 3,
    name: 'Pai',
    color: 'black',
  },
  {
    id: 4,
    name: 'Filho',
    color: 'green',
  },
  {
    id: 5,
    name: 'Filha',
    color: 'pink',
  },
];
