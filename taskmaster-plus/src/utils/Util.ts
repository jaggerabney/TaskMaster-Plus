export function toUntilDateString(date: Date): string {
  return date
    .toISOString() // ...to ISO string - e.g., 2023-12-24T18:30:00Z...
    .replace(/-:\./g, ""); // ...without the dashes, colons, or periods
}

export function getTomorrowsDate(): Date {
  const today = new Date();
  const tomorrow = new Date(today);

  tomorrow.setDate(today.getDate() + 1);

  return tomorrow;
}

export function formatDate(date: Date): string {
  // formats date as YYYY-MM-DD

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export interface WeeklyOptionsType {
  byDay: string[];
}

export interface MonthlyOptionsType {
  basis: string;
  byMonthDay: number;
  bySetPos: number;
  byDay: string;
}

export interface YearlyOptionsType {
  basis: string;
  byMonth: number;
  byMonthDay: number;
  bySetPos: number;
  byDay: string;
  bySetMonth: number; // same string used in RRule - BYMONTH - but different value is used to prevent crossover in form
}

export interface UntilOptionsType {
  basis: string;
  count: number;
  until: Date;
}

export interface RepeatFormStateType {
  isVisible: boolean;
  freq: string;
  interval: number;
  weekly: WeeklyOptionsType;
  monthly: MonthlyOptionsType;
  yearly: YearlyOptionsType;
  until: UntilOptionsType;
}

export const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const setPosDropdownDict = new Map<string, number>([
  ["1st", 1],
  ["2nd", 2],
  ["3rd", 3],
  ["4th", 4],
  ["Last", -1]
]);

export const daysPerMonth = new Map<string, number>([
  ["January", 31],
  ["February", 28], // extra day will be added in input max field for leap years
  ["March", 31],
  ["April", 30],
  ["May", 31],
  ["June", 30],
  ["July", 31],
  ["August", 31],
  ["September", 30],
  ["October", 31],
  ["November", 30],
  ["December", 31]
]);

export const monthsOfTheYear = Array.from(daysPerMonth.keys());

export const freqDict = new Map<string, string>([
  ["DAILY", "day"],
  ["WEEKLY", "week"],
  ["MONTHLY", "month"],
  ["YEARLY", "year"]
]);

export const defaultRepeatFormState: RepeatFormStateType = {
  isVisible: false,
  freq: "DAILY",
  interval: 1,
  weekly: {
    byDay: new Array<string>()
  },
  monthly: {
    basis: "BYMONTHDAY",
    byMonthDay: 1,
    bySetPos: 1,
    byDay: "SU"
  },
  yearly: {
    basis: "BYMONTH",
    byMonth: 1,
    byMonthDay: 1,
    bySetPos: 1,
    byDay: "SU",
    bySetMonth: 1
  },
  until: {
    basis: "COUNT",
    count: 1,
    until: getTomorrowsDate() // tomorrow
  }
};

export function buildRRuleStr(data: RepeatFormStateType): string {
  const { isVisible, freq, interval, weekly, monthly, yearly, until } = data;
  const rrules: string[] = [];

  if (isVisible) {
    rrules.push(`FREQ=${freq}`);

    switch (freq) {
      case "WEEKLY":
        if (weekly.byDay.length > 0) {
          rrules.push(`BYDAY=${weekly.byDay.join(",")}`);
        }

        break;
      case "MONTHLY":
        switch (monthly.basis) {
          case "BYMONTHDAY":
            rrules.push(`BYMONTHDAY=${monthly.byMonthDay}`);
            break;
          case "BYSETPOS":
            rrules.push(`BYSETPOS=${monthly.bySetPos}`);
            rrules.push(`BYDAY=${monthly.byDay}`);
            break;
        }
      case "YEARLY":
        switch (yearly.basis) {
          case "BYMONTH":
            rrules.push(`BYMONTH=${yearly.byMonth}`);
            rrules.push(`BYMONTHDAY=${yearly.byMonthDay}`);
            break;
          case "BYSETPOS":
            rrules.push(`BYSETPOS=${yearly.bySetPos}`);
            rrules.push(`BYDAY=${yearly.byDay}`);
            rrules.push(`BYMONTH=${yearly.bySetMonth}`);
        }
    }

    if (freq !== "YEARLY") rrules.push(`INTERVAL=${interval}`);

    switch (until.basis) {
      case "COUNT":
        rrules.push(`COUNT=${until.count}`);
        break;
      case "UNTIL":
        rrules.push(`UNTIL=${toUntilDateString(until.until)}`);
    }
  }

  return rrules.join(";");
}
