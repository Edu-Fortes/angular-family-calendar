interface WeekDay {
  value: string;
  label: string;
  description: string;
}

interface TimePeriod {
  value: string;
  label: string;
}

interface RepeatEvery {
  value: number;
  label: string;
}

export const selectWeekDay: WeekDay[] = [
  { value: 'su', label: 'D', description: 'Domingo' },
  { value: 'mo', label: 'S', description: 'Segunda' },
  { value: 'tu', label: 'T', description: 'Terça' },
  { value: 'we', label: 'Q', description: 'Quarta' },
  { value: 'th', label: 'Q', description: 'Quinta' },
  { value: 'fr', label: 'S', description: 'Sexta' },
  { value: 'sa', label: 'S', description: 'Sábado' },
];

export const selectTimePeriod: TimePeriod[] = [
  { value: 'weekly', label: 'semana' },
  { value: 'monthly', label: 'mês' },
  { value: 'yearly', label: 'ano' },
];

export const repeatEvery: RepeatEvery[] = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];
