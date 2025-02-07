import "@testing-library/jest-dom";
import {
  buildRRuleStr,
  defaultRepeatFormState,
  RepeatFormStateType
} from "@/utils/Util";

const mockRepeatFormState: RepeatFormStateType = {
  ...defaultRepeatFormState,
  isVisible: true
};

interface DailyAfterTestType {
  interval: number;
  count: number;
}

interface DailyUntilTestType {
  interval: number;
  date: Date;
}

interface WeeklyAfterTestType {
  freq: string;
  interval: number;
  byDay: string[];
  count: number;
}

interface WeeklyUntilTestType {
  freq: string;
  interval: number;
  byDay: string[];
  until: Date;
}

const dailyAfterTestData: Map<DailyAfterTestType, string> = new Map([
  [{ interval: 1, count: 30 }, "FREQ=DAILY;INTERVAL=1;COUNT=30"], // valid input
  [{ interval: -1, count: 1 }, "ERROR"], // negative interval
  [{ interval: 2, count: -5 }, "ERROR"], // negative count
  [{ interval: -5, count: -12 }, "ERROR"], // both negative
  [{ interval: 0, count: 0 }, "ERROR"] // zeroes
]);

const dailyUntilTestData: Map<DailyUntilTestType, string> = new Map([
  [
    { interval: 1, date: new Date(2030, 0, 1) },
    "FREQ=DAILY;INTERVAL=1;UNTIL=20300101T000000Z"
  ], // valid test
  [{ interval: 2, date: new Date(2020, 2, 12) }, "ERROR"], // until date is before now, should return ERROR
  [{ interval: -10, date: new Date(2027, 5, 25) }, "ERROR"], // negative interval, should return ERROR
  [
    { interval: 365, date: new Date(2050, 0, 18) },
    "FREQ=DAILY;INTERVAL=365;UNTIL=20500118T000000Z"
  ], // valid test w/ big interval and far out until date
  [{ interval: 0, date: new Date() }, "ERROR"] // zero interval and blank date object, should return ERROR
]);

const weeklyAfterTestData: Map<WeeklyAfterTestType, string> = new Map([
  [
    {
      freq: "WEEKLY",
      interval: 1,
      byDay: ["SU", "MO", "TU", "WE", "TH", "FR", "SA"],
      count: 8
    },
    "FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH,FR,SA;INTERVAL=1;COUNT=8"
  ], // valid
  [
    {
      freq: "WEEKLY",
      interval: 4,
      byDay: [],
      count: 12
    },
    "FREQ=WEEKLY;INTERVAL=4;COUNT=12"
  ], // valid, empty byDay - RRule string should contain no BYDAY section
  [
    {
      freq: "WEEKLY",
      interval: -52,
      byDay: ["SU"],
      count: 1
    },
    "ERROR"
  ], // negative interval, should return ERROR
  [
    {
      freq: "WEEKLY",
      interval: 1,
      byDay: ["SU", "WE", "FR"],
      count: -26
    },
    "ERROR"
  ], // negative count, should return ERROR
  [
    {
      freq: "",
      interval: 100,
      byDay: [],
      count: 100
    },
    "ERROR"
  ] // empty freq, should return ERROR
]);

const weeklyUntilTestData: Map<WeeklyUntilTestType, string> = new Map([
  [
    {
      freq: "WEEKLY",
      interval: 1,
      byDay: [],
      until: new Date(2030, 1, 6)
    },
    "FREQ=WEEKLY;INTERVAL=1;UNTIL=20300206T000000Z"
  ], // valid input, should return RRule str *without* BYDAY section
  [
    {
      freq: "WEEKLY",
      interval: 1,
      byDay: ["MO", "WE", "FR"],
      until: new Date(2030, 1, 6)
    },
    "FREQ=WEEKLY;BYDAY=MO,WE,FR;INTERVAL=1;UNTIL=20300206T000000Z"
  ], // valid input, should return RRule str with BYDAY section
  [
    {
      freq: "WEEKLY",
      interval: -4,
      byDay: ["SU", "WE"],
      until: new Date(2030, 0, 1)
    },
    "ERROR"
  ], // negative interval, should return ERROR
  [
    {
      freq: "WEEKLY",
      interval: 100,
      byDay: ["SU", "MO", "TU", "WE", "TH", "FR", "SA"],
      until: new Date(1776, 6, 4)
    },
    "ERROR"
  ], // until day in the past, should return ERROR
  [
    {
      freq: "",
      interval: 1,
      byDay: ["SU", "FR", "SA"],
      until: new Date(2028, 5, 16)
    },
    "ERROR"
  ] // empty freq, should return ERROR
]);

describe("RRule string builder - daily, end after", () => {
  for (const [{ interval, count }, rrule] of dailyAfterTestData) {
    it(`Daily every ${interval} day(s), end after ${count} iteration(s)`, () => {
      const repeatFormState = {
        ...mockRepeatFormState,
        interval,
        until: {
          ...mockRepeatFormState.until,
          count
        }
      };

      const rruleStr = buildRRuleStr(repeatFormState);

      expect(rruleStr).toBe(rrule);
    });
  }
});

describe("RRule string builder - daily, until", () => {
  for (const [{ interval, date }, rrule] of dailyUntilTestData) {
    it(`Daily every ${interval} day(s), until ${date.toLocaleDateString()}`, () => {
      const repeatFormState = {
        ...mockRepeatFormState,
        interval,
        until: {
          ...mockRepeatFormState.until,
          basis: "UNTIL",
          until: date
        }
      };

      const rruleStr = buildRRuleStr(repeatFormState);

      expect(rruleStr).toBe(rrule);
    });
  }
});

describe("RRule string builder - weekly, end after", () => {
  for (const [{ freq, interval, byDay, count }, rrule] of weeklyAfterTestData) {
    it(`Weekly every ${interval} week(s), byDay: [${byDay.toString()}], end after ${count} iteration(s)`, () => {
      const repeatFormState = {
        ...mockRepeatFormState,
        freq,
        interval,
        weekly: {
          byDay
        },
        until: {
          ...mockRepeatFormState.until,
          count
        }
      };

      const rruleStr = buildRRuleStr(repeatFormState);

      expect(rruleStr).toBe(rrule);
    });
  }
});

describe("RRule string builder - weekly, until", () => {
  for (const [{ freq, interval, byDay, until }, rrule] of weeklyUntilTestData) {
    it(`Weekly every ${interval} week(s), byDay: [${byDay.toString()}], until ${until.toLocaleDateString()}`, () => {
      const repeatFormState = {
        ...mockRepeatFormState,
        freq,
        interval,
        weekly: {
          byDay
        },
        until: {
          ...mockRepeatFormState.until,
          basis: "UNTIL",
          until
        }
      };

      const rruleStr = buildRRuleStr(repeatFormState);

      expect(rruleStr).toBe(rrule);
    });
  }
});
