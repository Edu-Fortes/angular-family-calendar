export interface FamilyMember {
  name: string;
  color: string;
  textColor?: string;
}

export const familyMembers: FamilyMember[] = [
  {
    name: 'Toda a família',
    color: 'sky',
    textColor: 'white',
  },
  {
    name: 'Mãe',
    color: 'red',
  },
  {
    name: 'Pai',
    color: 'black',
  },
  {
    name: 'Filho',
    color: 'green',
  },
  {
    name: 'Filha',
    color: 'pink',
  },
];
