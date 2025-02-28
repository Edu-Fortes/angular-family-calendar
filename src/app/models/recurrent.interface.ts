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
  value: string;
  label: string;
}

export const selectWeekDay: WeekDay[] = [
  { value: '0', label: 'D', description: 'Domingo' },
  { value: '1', label: 'S', description: 'Segunda' },
  { value: '2', label: 'T', description: 'Terça' },
  { value: '3', label: 'Q', description: 'Quarta' },
  { value: '4', label: 'Q', description: 'Quinta' },
  { value: '5', label: 'S', description: 'Sexta' },
  { value: '6', label: 'S', description: 'Sábado' },
];

export const selectTimePeriod: TimePeriod[] = [
  { value: 'week', label: 'semana' },
  { value: 'month', label: 'mês' },
  { value: 'year', label: 'ano' },
];

export const repeatEvery: RepeatEvery[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];
