import "@testing-library/jest-dom";
import {
  buildRRuleStr,
  defaultRepeatFormState,
  monthsOfTheYear,
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

interface MonthlyCountAfterTestType {
  freq: string;
  interval: number;
  byMonthDay: number;
  count: number;
}

interface MonthlyCountUntilTestType {
  freq: string;
  interval: number;
  byMonthDay: number;
  until: Date;
}

interface MonthlyDateAfterTestType {
  freq: string;
  interval: number;
  bySetPos: number;
  byDay: string;
  count: number;
}

interface MonthlyDateUntilTestType {
  freq: string;
  interval: number;
  bySetPos: number;
  byDay: string;
  until: Date;
}

interface YearlyDateAfterTestType {
  freq: string;
  byMonth: number;
  byMonthDay: number;
  count: number;
}

interface YearlyDateUntilTestType {
  freq: string;
  byMonth: number;
  byMonthDay: number;
  until: Date;
}

interface YearlySetPosAfterTestType {
  freq: string;
  bySetPos: number;
  byDay: string;
  byMonth: number;
  count: number;
}

interface YearlySetPosUntilTestType {
  freq: string;
  bySetPos: number;
  byDay: string;
  byMonth: number;
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

const monthlyCountAfterTestData: Map<MonthlyCountAfterTestType, string> =
  new Map([
    [
      {
        freq: "MONTHLY",
        interval: 1,
        byMonthDay: 15,
        count: 12
      },
      "FREQ=MONTHLY;BYMONTHDAY=15;INTERVAL=1;COUNT=12"
    ], // valid input
    [
      {
        freq: "",
        interval: 1,
        byMonthDay: 12,
        count: 4
      },
      "ERROR"
    ], // empty freq, should return error
    [
      {
        freq: "MONTHLY",
        interval: -3,
        byMonthDay: 4,
        count: 1
      },
      "ERROR"
    ], // negative interval, should return ERROR
    [
      {
        freq: "MONTHLY",
        interval: 1,
        byMonthDay: -10,
        count: 2
      },
      "ERROR"
    ], // negative byMonthDay, should return ERROR
    [
      {
        freq: "MONTHLY",
        interval: 2,
        byMonthDay: 100,
        count: 1
      },
      "ERROR"
    ], // byMonthDay not in month, should return ERROR
    [
      {
        freq: "MONTHLY",
        interval: 1,
        byMonthDay: 1,
        count: -1
      },
      "ERROR"
    ] // negative count, should return ERROR
  ]);

const monthlyCountUntilTestData: Map<MonthlyCountUntilTestType, string> =
  new Map([
    [
      {
        freq: "MONTHLY",
        interval: 1,
        byMonthDay: 15,
        until: new Date(2030, 0, 1)
      },
      "FREQ=MONTHLY;BYMONTHDAY=15;INTERVAL=1;UNTIL=20300101T000000Z"
    ], // valid input
    [
      {
        freq: "",
        interval: 2,
        byMonthDay: 9,
        until: new Date(2028, 4, 3)
      },
      "ERROR"
    ], // empty freq, should return error
    [
      {
        freq: "MONTHLY",
        interval: -8,
        byMonthDay: 2,
        until: new Date(2026, 3, 12)
      },
      "ERROR"
    ], // negative interval, should return ERROR
    [
      {
        freq: "MONTHLY",
        interval: 1,
        byMonthDay: -2,
        until: new Date(2029, 10, 23)
      },
      "ERROR"
    ], // negative byMonthDay, should return ERROR
    [
      {
        freq: "MONTHLY",
        interval: 2,
        byMonthDay: 100,
        until: new Date(2030, 1, 1)
      },
      "ERROR"
    ], // byMonthDay not in month, should return ERROR
    [
      {
        freq: "MONTHLY",
        interval: 1,
        byMonthDay: 1,
        until: new Date(1995, 9, 31)
      },
      "ERROR"
    ] // until date in past, should return ERROR
  ]);

const monthlyDateAfterTestData: Map<MonthlyDateAfterTestType, string> = new Map(
  [
    [
      {
        freq: "MONTHLY",
        interval: 1,
        bySetPos: 1,
        byDay: "MO",
        count: 12
      },
      "FREQ=MONTHLY;BYSETPOS=1;BYDAY=MO;INTERVAL=1;COUNT=12"
    ], // valid input
    [
      {
        freq: "",
        interval: 2,
        bySetPos: -1,
        byDay: "SU",
        count: 1
      },
      "ERROR"
    ], // empty freq, should be ERROR
    [
      {
        freq: "MONTHLY",
        interval: -8,
        bySetPos: 2,
        byDay: "WE",
        count: 3
      },
      "ERROR"
    ], // negative interval, should be ERROR
    [
      {
        freq: "MONTHLY",
        interval: 1,
        bySetPos: -9,
        byDay: "MO",
        count: 10
      },
      "ERROR"
    ], // set pos value not contained within setPosDropdownDict, should be ERROR
    [
      {
        freq: "MONTHLY",
        interval: 4,
        bySetPos: 3,
        byDay: "",
        count: 1
      },
      "ERROR"
    ], // empty byDay value, should be ERROR
    [
      {
        freq: "MONTHLY",
        interval: 1,
        bySetPos: 1,
        byDay: "FR",
        count: -1
      },
      "ERROR"
    ] // negative count, should be ERROR
  ]
);

const monthlyDateUntilTestData: Map<MonthlyDateUntilTestType, string> = new Map(
  [
    [
      {
        freq: "MONTHLY",
        interval: 3,
        bySetPos: 1,
        byDay: "FR",
        until: new Date(2030, 0, 25)
      },
      "FREQ=MONTHLY;BYSETPOS=1;BYDAY=FR;INTERVAL=3;UNTIL=20300125T000000Z"
    ], // valid input
    [
      {
        freq: "",
        interval: 1,
        bySetPos: 2,
        byDay: "TU",
        until: new Date(2030, 3, 15)
      },
      "ERROR"
    ], // empty freq, should return ERROR
    [
      {
        freq: "MONTHLY",
        interval: -1,
        bySetPos: -1,
        byDay: "MO",
        until: new Date(2030, 7, 28)
      },
      "ERROR"
    ], // negative interval, should return ERROR
    [
      {
        freq: "MONTHLY",
        interval: 2,
        bySetPos: 1000,
        byDay: "TH",
        until: new Date(2030, 8, 22)
      },
      "ERROR"
    ], // bySetPos not in freqDropdownDict, should return ERROR
    [
      {
        freq: "MONTHLY",
        interval: 1,
        bySetPos: 4,
        byDay: "",
        until: new Date(2028, 1, 3)
      },
      "ERROR"
    ], // empty byDay, should return ERROR
    [
      {
        freq: "MONTHLY",
        interval: 5,
        bySetPos: 2,
        byDay: "WE",
        until: new Date(2000, 0, 1)
      },
      "ERROR"
    ] // until date in past, should return ERROR
  ]
);

const yearlyDateAfterTestData: Map<YearlyDateAfterTestType, string> = new Map([
  [
    {
      freq: "YEARLY",
      byMonth: 1,
      byMonthDay: 15,
      count: 12
    },
    "FREQ=YEARLY;BYMONTH=1;BYMONTHDAY=15;COUNT=12"
  ], // valid input
  [
    {
      freq: "",
      byMonth: 1,
      byMonthDay: 1,
      count: 1
    },
    "ERROR"
  ], // empty freq, should return ERROR
  [
    {
      freq: "YEARLY",
      byMonth: -1,
      byMonthDay: 10,
      count: 2
    },
    "ERROR"
  ], // negative byMonth, should return ERROR
  [
    {
      freq: "YEARLY",
      byMonth: 4,
      byMonthDay: -3,
      count: 3
    },
    "ERROR"
  ], // negative byMonthDay, should return ERROR
  [
    {
      freq: "YEARLY",
      byMonth: 1,
      byMonthDay: 1000,
      count: 2
    },
    "ERROR"
  ], // byMonthDay not in month, should return ERROR
  [
    {
      freq: "YEARLY",
      byMonth: 3,
      byMonthDay: 30,
      count: -2
    },
    "ERROR"
    // negative count, should return ERROR
  ]
]);

const yearlyDateUntilTestData: Map<YearlyDateUntilTestType, string> = new Map([
  [
    {
      freq: "YEARLY",
      byMonth: 2,
      byMonthDay: 14,
      until: new Date(2030, 1, 14)
    },
    "FREQ=YEARLY;BYMONTH=2;BYMONTHDAY=14;UNTIL=20300214T000000Z"
  ], // valid input
  [
    {
      freq: "",
      byMonth: 4,
      byMonthDay: 29,
      until: new Date(2030, 3, 29)
    },
    "ERROR"
  ], // empty freq, should return ERROR
  [
    {
      freq: "YEARLY",
      byMonth: -1,
      byMonthDay: 30,
      until: new Date(2030, 0, 30)
    },
    "ERROR"
  ], // negative byMonth, should return ERROR
  [
    {
      freq: "YEARLY",
      byMonth: 8,
      byMonthDay: -2,
      until: new Date(2030, 7, 2)
    },
    "ERROR"
  ], // negative byMonthDay, should return ERROR
  [
    {
      freq: "YEARLY",
      byMonth: 3,
      byMonthDay: 100,
      until: new Date(2030, 2, 1)
    },
    "ERROR"
  ], // byMonthDay doesn't fit in month, should return ERROR
  [
    {
      freq: "YEARLY",
      byMonth: 12,
      byMonthDay: 25,
      until: new Date(1980, 11, 25)
    },
    "ERROR"
  ] // until date in past, should return ERROR
]);

const yearlySetPosAfterTestData: Map<YearlySetPosAfterTestType, string> =
  new Map([
    [
      {
        freq: "YEARLY",
        bySetPos: 1,
        byDay: "MO",
        byMonth: 1,
        count: 2
      },
      "FREQ=YEARLY;BYSETPOS=1;BYDAY=MO;BYMONTH=1;COUNT=2"
    ], // valid input
    [
      {
        freq: "",
        bySetPos: 1,
        byDay: "MO",
        byMonth: 1,
        count: 2
      },
      "ERROR"
    ], // empty freq, should return ERROR
    [
      {
        freq: "YEARLY",
        bySetPos: 1000,
        byDay: "TU",
        byMonth: 3,
        count: 1
      },
      "ERROR"
    ], // invalid bySetPos, should return ERROR
    [
      {
        freq: "YEARLY",
        bySetPos: 3,
        byDay: "",
        byMonth: 11,
        count: 3
      },
      "ERROR"
    ], // empty byDay, should return ERROR
    [
      {
        freq: "YEARLY",
        bySetPos: 1,
        byDay: "TU",
        byMonth: -2,
        count: 1
      },
      "ERROR"
    ], // negative byMonth, should return ERROR
    [
      {
        freq: "YEARLY",
        bySetPos: 1,
        byDay: "TU",
        byMonth: 15,
        count: 1
      },
      "ERROR"
    ] // invalid byMonth, should return ERROR
  ]);

const yearlySetPosUntilTestData: Map<YearlySetPosUntilTestType, string> =
  new Map([
    [
      {
        freq: "YEARLY",
        bySetPos: 1,
        byDay: "FR",
        byMonth: 3,
        until: new Date(2030, 2, 1)
      },
      "FREQ=YEARLY;BYSETPOS=1;BYDAY=FR;BYMONTH=3;UNTIL=20300301T000000Z"
    ], // valid input
    [
      {
        freq: "",
        bySetPos: 3,
        byDay: "MO",
        byMonth: 7,
        until: new Date(2030, 2, 1)
      },
      "ERROR"
    ], // empty freq, should return ERROR
    [
      {
        freq: "YEARLY",
        bySetPos: 512,
        byDay: "SA",
        byMonth: 3,
        until: new Date(2030, 2, 1)
      },
      "ERROR"
    ], // invalid setPos, should return ERROR
    [
      {
        freq: "YEARLY",
        bySetPos: -1,
        byDay: "",
        byMonth: 11,
        until: new Date(2030, 2, 1)
      },
      "ERROR"
    ], // empty byDay, should return ERROR
    [
      {
        freq: "YEARLY",
        bySetPos: 4,
        byDay: "TU",
        byMonth: -1,
        until: new Date(2030, 2, 1)
      },
      "ERROR"
    ], // negative byMonth, should return ERROR
    [
      {
        freq: "YEARLY",
        bySetPos: 2,
        byDay: "WE",
        byMonth: 24,
        until: new Date(2030, 2, 1)
      },
      "ERROR"
    ], // invalid byMonth, should return ERROR
    [
      {
        freq: "YEARLY",
        bySetPos: 3,
        byDay: "TH",
        byMonth: 3,
        until: new Date(1972, 3, 3)
      },
      "ERROR"
    ] // until date in past, should return ERROR
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

describe("RRule string builder - monthly, by monthday, end after", () => {
  for (const [
    { freq, interval, byMonthDay, count },
    rrule
  ] of monthlyCountAfterTestData) {
    it(`Monthly every ${interval} months, on day ${byMonthDay}, end after ${count} iterations`, () => {
      const repeatFormState = {
        ...mockRepeatFormState,
        freq,
        interval,
        monthly: {
          ...mockRepeatFormState.monthly,
          byMonthDay
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

describe("RRule string builder - monthly, by monthday, until", () => {
  for (const [
    { freq, interval, byMonthDay, until },
    rrule
  ] of monthlyCountUntilTestData) {
    it(`Monthly every ${interval} months, on day ${byMonthDay}, until ${until.toLocaleDateString()}`, () => {
      const repeatFormState = {
        ...mockRepeatFormState,
        freq,
        interval,
        monthly: {
          ...mockRepeatFormState.monthly,
          byMonthDay
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

describe("RRule string builder - monthly, by set pos, end after", () => {
  for (const [
    { freq, interval, bySetPos, byDay, count },
    rrule
  ] of monthlyDateAfterTestData) {
    it(`Monthly every ${interval} months, ${bySetPos} ${byDay}, end after ${count} iterations`, () => {
      const repeatFormState = {
        ...mockRepeatFormState,
        freq,
        interval,
        monthly: {
          ...mockRepeatFormState.monthly,
          basis: "BYSETPOS",
          bySetPos,
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

describe("RRule string builder - monthly, by set pos, until", () => {
  for (const [
    { freq, interval, bySetPos, byDay, until },
    rrule
  ] of monthlyDateUntilTestData) {
    it(`Monthly every ${interval} months, ${bySetPos} ${byDay}, until ${until.toLocaleDateString()}`, () => {
      const repeatFormState = {
        ...mockRepeatFormState,
        freq,
        interval,
        monthly: {
          ...mockRepeatFormState.monthly,
          basis: "BYSETPOS",
          bySetPos,
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

describe("RRule string builder - yearly, on date, end after ", () => {
  for (const [
    { freq, byMonth, byMonthDay, count },
    rrule
  ] of yearlyDateAfterTestData) {
    it(`Yearly on ${byMonth}/${byMonthDay}, end after ${count} iterations`, () => {
      const repeatFormState = {
        ...mockRepeatFormState,
        freq,
        yearly: {
          ...mockRepeatFormState.yearly,
          byMonth,
          byMonthDay
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

describe("RRule string builder - yearly, on date, until", () => {
  for (const [
    { freq, byMonth, byMonthDay, until },
    rrule
  ] of yearlyDateUntilTestData) {
    it(`Yearly on ${byMonth}/${byMonthDay}, until ${until.toLocaleDateString()}`, () => {
      const repeatFormState = {
        ...mockRepeatFormState,
        freq,
        yearly: {
          ...mockRepeatFormState.yearly,
          byMonth,
          byMonthDay
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

describe("RRule string builder - yearly, set pos, end after", () => {
  for (const [
    { freq, bySetPos, byMonth, byDay, count },
    rrule
  ] of yearlySetPosAfterTestData) {
    it(`Yearly on ${bySetPos} ${byDay} of ${
      monthsOfTheYear[byMonth - 1]
    }, end after ${count} iterations`, () => {
      const repeatFormState = {
        ...mockRepeatFormState,
        freq,
        yearly: {
          ...mockRepeatFormState.yearly,
          basis: "BYSETPOS",
          bySetPos,
          bySetMonth: byMonth,
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

describe("RRule string builder - yearly, set pos, until", () => {
  for (const [
    { freq, bySetPos, byMonth, byDay, until },
    rrule
  ] of yearlySetPosUntilTestData) {
    it(`Yearly on ${bySetPos} ${byDay} of ${
      monthsOfTheYear[byMonth - 1]
    }, until ${until.toLocaleDateString()}`, () => {
      const repeatFormState = {
        ...mockRepeatFormState,
        freq,
        yearly: {
          ...mockRepeatFormState.yearly,
          basis: "BYSETPOS",
          bySetPos,
          bySetMonth: byMonth,
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
