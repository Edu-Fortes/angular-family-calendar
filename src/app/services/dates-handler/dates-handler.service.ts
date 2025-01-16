import { Injectable } from '@angular/core';
import { formatDate, FormatDateOptions, formatRange } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root',
})
export class DatesHandlerService {
  constructor() {}
  private numberOfDays(startDate: string, endDate: string): number {
    const start: Date = new Date(startDate);
    const end: Date = new Date(endDate);

    return Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  public formatedDate(start: string, end: string): string {
    const numberOfSelectedDays = this.numberOfDays(start, end);
    const formatDateOptions: FormatDateOptions = {
      separator: ' a ',
      month: 'long',
      year: 'numeric',
      day: 'numeric',
      locale: 'pt-BR',
    };

    if (numberOfSelectedDays === 1) return formatDate(start, formatDateOptions);
    else
      return formatRange(start, end, {
        ...formatDateOptions,
        isEndExclusive: true,
      });
  }

  public moreThanOneDay(start: string, end: string): boolean {
    const numberOfSelectedDays = this.numberOfDays(start, end);

    if (numberOfSelectedDays <= 1) return false;
    return true;
  }
}
