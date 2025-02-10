export function toUntilDateString(date: Date): string {
  date.setUTCHours(0, 0, 0, 0); // normalize time

  const dateISOString = date.toISOString();

  return dateISOString // ...to ISO string - e.g., 2023-12-24T18:30:00Z...
    .replace(/\..../g, "") // remove ms portion
    .replace(/[-:]/g, ""); // ...without the dashes, colons, or periods
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

export const freqs = Array.from(freqDict.keys());

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
  // values are extracted from data to make things less messy
  const { isVisible, freq, interval, weekly, monthly, yearly, until } = data;
  // rrules are added to a string[] one-at-a-time; this is because the Array.join method is used
  // at the end of this function to create the overall rule and separate subrules with semicolons
  const rrules: string[] = [];

  if (isVisible) {
    // if the passed freq is not DAILY, WEEKLY, MONTHLY, or YEARLY, return ERROR
    if (!freqs.includes(freq)) {
      return "ERROR";
    }

    // if the freq is valid, add it to the rrules array.
    // this is done first because freq is one of the only required rrules
    rrules.push(`FREQ=${freq}`);

    // extra information is added via this switch state, depending on the freq.
    // daily is not included because it has no other information
    switch (freq) {
      case "WEEKLY":
        // only add BYDAY rule if byDays has values; otherwise, skip it
        if (weekly.byDay.length > 0) {
          rrules.push(`BYDAY=${weekly.byDay.join(",")}`);
        }

        break;
      case "MONTHLY":
        // there are two types of monthly rrules:
        // 1. those that repeat on a specific day of the month - e.g., the 15th
        // 2. those that repeat on a set "position" - e.g,. the third Thursday of the month
        // the monthly "basis" stores which of these is being used - BYMONTHDAY and BYSETPOS, respectively.
        // (this is also the case for YEARLY as well!)
        switch (monthly.basis) {
          case "BYMONTHDAY":
            // if byMonthDay is 0 or negative,
            // or if byMonthDay is over 31, a value which no month has more days than,
            // return ERROR
            if (monthly.byMonthDay <= 0 || monthly.byMonthDay > 31) {
              return "ERROR";
            }

            rrules.push(`BYMONTHDAY=${monthly.byMonthDay}`);

            break;
          case "BYSETPOS":
            // values associated with set positions - [1, 2, 3, 4, -1]
            const validSetPosValues = Array.from(setPosDropdownDict.values());
            // valid values for byDay - [SU, MO, TU, WE, TH, FR, SA, SU]
            const validByDayValues = daysOfTheWeek.map((day) =>
              day.slice(0, 2).toUpperCase()
            );

            // if bySetPos is not a valid value
            // OR if byDay is not a valid value
            // return ERROR
            if (
              !validSetPosValues.includes(monthly.bySetPos) ||
              !validByDayValues.includes(monthly.byDay)
            ) {
              return "ERROR";
            }

            rrules.push(`BYSETPOS=${monthly.bySetPos}`);
            rrules.push(`BYDAY=${monthly.byDay}`);

            break;
        }

        break;
      case "YEARLY":
        switch (yearly.basis) {
          case "BYMONTH":
            // index is yearly.byMonth - 1 because yearly.byMonth is 1-indexed
            const targetMonth = monthsOfTheYear[yearly.byMonth - 1];
            // how many days in the targetMonth - between 28 and 31
            const daysInMonth = daysPerMonth.get(targetMonth)!;

            // if byMonth is 0 or negative,
            // or byMonthDay is 0 or negative,
            // or byMonthDay is greater than the number of days in the month,
            // return ERROR
            if (
              yearly.byMonth <= 0 ||
              yearly.byMonthDay <= 0 ||
              yearly.byMonthDay > daysInMonth
            ) {
              return "ERROR";
            }

            rrules.push(`BYMONTH=${yearly.byMonth}`);
            rrules.push(`BYMONTHDAY=${yearly.byMonthDay}`);

            break;
          case "BYSETPOS":
            // values associated with set positions - [1, 2, 3, 4, -1]
            const validSetPosValues = Array.from(setPosDropdownDict.values());
            // valid values for byDay - [SU, MO, TU, WE, TH, FR, SA, SU]
            const validByDayValues = daysOfTheWeek.map((day) =>
              day.slice(0, 2).toUpperCase()
            );

            // if bySetPos is not valid,
            // or byDay is not valid,
            // or bySetMonth is not beteween 1-12,
            // return ERROR
            if (
              !validSetPosValues.includes(yearly.bySetPos) ||
              !validByDayValues.includes(yearly.byDay) ||
              yearly.bySetMonth > 12 ||
              yearly.bySetMonth < 0
            ) {
              return "ERROR";
            }

            rrules.push(`BYSETPOS=${yearly.bySetPos}`);
            rrules.push(`BYDAY=${yearly.byDay}`);
            rrules.push(`BYMONTH=${yearly.bySetMonth}`);

            break;
        }

        break;
    }

    if (freq !== "YEARLY") {
      // if interval is 0 or negative, return ERROR
      if (interval <= 0) {
        return "ERROR";
      }

      rrules.push(`INTERVAL=${interval}`);
    }

    switch (until.basis) {
      case "COUNT":
        // if count is 0 or negative, return ERROR
        if (until.count <= 0) {
          return "ERROR";
        }

        rrules.push(`COUNT=${until.count}`);

        break;
      case "UNTIL":
        const now = new Date();

        // if until date is in the past, return ERROR
        if (until.until.getTime() < now.getTime()) {
          return "ERROR";
        }

        rrules.push(`UNTIL=${toUntilDateString(until.until)}`);

        break;
    }
  }

  return rrules.join(";");
}
