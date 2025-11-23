// FILE: src/data/programs.ts

export type WorkoutSessionKey = 'rest' | 'hiit' | 'upper' | 'lower' | 'core';

export type PlanItem =
  | { type: 'rest' }
  | {
      type: 'workout';
      sessionKey: Exclude<WorkoutSessionKey, 'rest'>;
      name: string;        // tên bài tập hiển thị
      url: string;         // URL mở bằng WebView
      durationMin: number; // thời lượng (phút)
    };

export interface WorkoutDay {
  id: string;
  dayNumber: number;     // 1..N theo đúng thứ tự bạn nhập
  weekdayIndex: number;  // 0=Mon..6=Sun (xoay vòng theo vị trí)
  sessionKey: WorkoutSessionKey;

  // mới:
  isRest: boolean;
  name?: string;
  webUrl?: string;
  durationMin?: number;

  // giữ tương thích cũ (trỏ về webUrl):
  videoUrl: string;
}

export interface WorkoutProgram {
  id: string;
  titleKey: string;
  durationDays: number;  // = plan.length để tương thích UI cũ
  iconColor: string;
  icon: any;             // require(image)
  plan: PlanItem[];      // <-- danh sách ngày bạn nhập, không lặp
}

// Helper tạo item workout nhanh
const W = (
  sessionKey: Exclude<WorkoutSessionKey, 'rest'>,
  name: string,
  url: string,
  durationMin: number
): PlanItem => ({ type: 'workout', sessionKey, name, url, durationMin });

// ====== Ví dụ kế hoạch bạn nhập (không lặp tuần) ======
// Bạn có thể thêm/bớt, app sẽ hiển thị đúng số lượng.
const Max30: PlanItem[] = [
  // Week 1 (Day 1–7)
  W('hiit',  'Cardio Challenge',          'mindex1.html',  20), // Day 1 (Mon)
  W('upper', 'Tabata Power',              'mindex2.html',  25), // Day 2 (Tue)
  W('lower', 'Sweet Intervals',           'mindex3.html',  25), // Day 3 (Wed)
  W('core',  'Tabata Power',              'mindex2.html',  15), // Day 4 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 5 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 6 (Sat)
  { type: 'rest' },                                                // Day 7 (Sun) - Off

  // Week 2 (Day 8–14) – giống tuần 1
  W('hiit',  'Cardio Challenge',          'mindex1.html',  20), // Day 8  (Mon)
  W('upper', 'Tabata Power',              'mindex2.html',  25), // Day 9  (Tue)
  W('lower', 'Sweet Intervals',           'mindex3.html',  25), // Day 10 (Wed)
  W('core',  'Tabata Power',              'mindex2.html',  15), // Day 11 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 12 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 13 (Sat)
  { type: 'rest' },                                                // Day 14 (Sun) - Off

  // Week 3 (Day 15–21)
  W('hiit',  'Cardio Challenge',          'mindex1.html',  20), // Day 15 (Mon)
  W('upper', 'Tabata Strength',           'mindex4.html',  25), // Day 16 (Tue)
  W('lower', 'Sweet Intervals',           'mindex3.html',  25), // Day 17 (Wed)
  W('core',  'Tabata Strength',           'mindex4.html',  15), // Day 18 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 19 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 20 (Sat)
  { type: 'rest' },                                                // Day 21 (Sun) - Off

  // Week 4 (Day 22–28)
  W('hiit',  'Cardio Challenge',          'mindex1.html',  20), // Day 22 (Mon)
  W('upper', 'Tabata Strength',           'mindex4.html',  25), // Day 23 (Tue)
  W('lower', 'Sweet Intervals',           'mindex3.html',  25), // Day 24 (Wed)
  W('core',  'Tabata Strength',           'mindex4.html',  15), // Day 25 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 26 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 27 (Sat)
  { type: 'rest' },                                                // Day 28 (Sun) - Off

  // Week 5 (Day 29–35) – bắt đầu Max Out
  W('hiit',  'Max Out Cardio',            'mindex6.html',  20), // Day 29 (Mon)
  W('upper', 'Max Out Power',             'mindex7.html',  25), // Day 30 (Tue)
  W('lower', 'Max Out Sweet',             'mindex8.html',  25), // Day 31 (Wed)
  W('core',  'Max Out Strength',          'mindex9.html',  15), // Day 32 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 33 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 34 (Sat)
  { type: 'rest' },                                                // Day 35 (Sun) - Off

  // Week 6 (Day 36–42)
  W('hiit',  'Max Out Cardio',            'mindex6.html',  20), // Day 36 (Mon)
  W('upper', 'Max Out Power',             'mindex7.html',  25), // Day 37 (Tue)
  W('lower', 'Max Out Sweet',             'mindex8.html',  25), // Day 38 (Wed)
  W('core',  'Max Out Strength',          'mindex9.html',  15), // Day 39 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 40 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 41 (Sat)
  { type: 'rest' },                                                // Day 42 (Sun) - Off

  // Week 7 (Day 43–49)
  W('hiit',  'Max Out Cardio',            'mindex6.html',  20), // Day 43 (Mon)
  W('upper', 'Max Out Power',             'mindex7.html',  25), // Day 44 (Tue)
  W('lower', 'Max Out Sweet',             'mindex8.html',  25), // Day 45 (Wed)
  W('core',  'Max Out Strength',          'mindex9.html',  15), // Day 46 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 47 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 48 (Sat)
  { type: 'rest' },                                                // Day 49 (Sun) - Off

  // Week 8 (Day 50–56)
  W('hiit',  'Max Out Cardio',            'mindex6.html',  20), // Day 50 (Mon)
  W('upper', 'Max Out Power',             'mindex7.html',  25), // Day 51 (Tue)
  W('lower', 'Max Out Sweet',             'mindex8.html',  25), // Day 52 (Wed)
  W('core',  'Max Out Strength',          'mindex9.html',  15), // Day 53 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 54 (Fri)
  W('lower', 'Cardio Challenge',          'mindex1.html', 20), // Day 55 (Sat)
  { type: 'rest' },                                                // Day 56 (Sun) - Off

  // Week 9 (Day 57–63) – quay lại pattern Cardio/Tabata/Sweet
  W('hiit',  'Cardio Challenge',          'mindex1.html',  20), // Day 57 (Mon)
  W('upper', 'Tabata Power',              'mindex2.html',  25), // Day 58 (Tue)
  W('lower', 'Sweet Intervals',           'mindex3.html',  25), // Day 59 (Wed)
  W('core',  'Tabata Power',              'mindex2.html',  15), // Day 60 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 61 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 62 (Sat)
  { type: 'rest' },                                                // Day 63 (Sun) - Off

  // Week 10 (Day 64–70) – thêm Ab Attack 10
  W('hiit',  'Cardio Challenge & Ab Attack 10', 'mindex17.html', 20), // Day 64 (Mon)
  W('upper', 'Tabata Power',                    'mindex2.html',  25), // Day 65 (Tue)
  W('lower', 'Sweet Intervals & Ab Attack 10',  'mindex18.html', 25), // Day 66 (Wed)
  W('core',  'Tabata Power',                    'mindex2.html',  15), // Day 67 (Thu)
  W('hiit',  'Friday Fight Round 2',            'mindex10.html', 18), // Day 68 (Fri)
  W('lower', 'Pulse & Ab Attack 10',            'mindex19.html', 20), // Day 69 (Sat)
  { type: 'rest' },                                                        // Day 70 (Sun) - Off

  // Week 11 (Day 71–77)
  W('hiit',  'Cardio Challenge & Max Out ABS',  'mindex21.html', 20), // Day 71 (Mon)
  W('upper', 'Tabata Strength',                 'mindex4.html',  25), // Day 72 (Tue)
  W('lower', 'Sweet Intervals & 360 ABS',       'mindex22.html', 25), // Day 73 (Wed)
  W('core',  'Tabata Strength',                 'mindex4.html',  15), // Day 74 (Thu)
  W('hiit',  'Friday Fight Round 2',            'mindex10.html', 18), // Day 75 (Fri)
  W('lower', 'Pulse & Ab Attack 10',            'mindex19.html', 20), // Day 76 (Sat)
  { type: 'rest' },                                                        // Day 77 (Sun) - Off

  // Week 12 (Day 78–84)
  W('hiit',  'Cardio Challenge & 360 ABS',      'mindex23.html', 20), // Day 78 (Mon)
  W('upper', 'Tabata Strength',                 'mindex4.html',  25), // Day 79 (Tue)
  W('lower', 'Sweet Intervals & Max Out ABS',   'mindex24.html', 25), // Day 80 (Wed)
  W('core',  'Tabata Strength',                 'mindex4.html',  15), // Day 81 (Thu)
  W('hiit',  'Friday Fight Round 2',            'mindex10.html', 18), // Day 82 (Fri)
  W('lower', 'Pulse & Ab Attack 10',            'mindex19.html', 20), // Day 83 (Sat)
  { type: 'rest' },                                                        // Day 84 (Sun) - Off

  // Week 13 (Day 85–91) – Max Out phase 4
  W('hiit',  'Max Out Cardio',                  'mindex6.html',  20), // Day 85 (Mon)
  W('upper', 'Max Out Power',                   'mindex7.html',  25), // Day 86 (Tue)
  W('lower', 'Max Out Sweet',                   'mindex8.html',  25), // Day 87 (Wed)
  W('core',  'Max Out Strength',                'mindex9.html',  15), // Day 88 (Thu)
  W('hiit',  'Friday Fight Round 2',            'mindex10.html', 18), // Day 89 (Fri)
  W('lower', 'Pulse',                           'mindex11.html', 20), // Day 90 (Sat)
  { type: 'rest' },                                                        // Day 91 (Sun) - Off

  // Week 14 (Day 92–98)
  W('hiit',  'Max Out Cardio & Ab Attack 10',   'mindex25.html', 20), // Day 92 (Mon)
  W('upper', 'Max Out Power',                   'mindex7.html',  25), // Day 93 (Tue)
  W('lower', 'Max Out Sweet & Ab Attack 10',    'mindex26.html', 25), // Day 94 (Wed)
  W('core',  'Max Out Strength',                'mindex9.html',  15), // Day 95 (Thu)
  W('hiit',  'Friday Fight Round 2',            'mindex10.html', 18), // Day 96 (Fri)
  W('lower', 'Pulse & Ab Attack 10',            'mindex19.html', 20), // Day 97 (Sat)
  { type: 'rest' },                                                        // Day 98 (Sun) - Off

  // Week 15 (Day 99–105)
  W('hiit',  'Max Out Cardio & Max Out ABS',    'mindex27.html', 20), // Day 99 (Mon)
  W('upper', 'Max Out Power',                   'mindex7.html',  25), // Day 100 (Tue)
  W('lower', 'Max Out Sweet & 360 ABS',         'mindex27.html', 25), // Day 101 (Wed)
  W('core',  'Max Out Strength',                'mindex9.html',  15), // Day 102 (Thu)
  W('hiit',  'Friday Fight Round 2',            'mindex10.html', 18), // Day 103 (Fri)
  W('lower', 'Pulse & Ab Attack 10',            'mindex19.html', 20), // Day 104 (Sat)
  { type: 'rest' },                                                        // Day 105 (Sun) - Off

  // Week 16 (Day 106–112)
  W('hiit',  'Max Out Cardio & 360 ABS',        'mindex29.html', 20), // Day 106 (Mon)
  W('upper', 'Max Out Power',                   'mindex7.html',  25), // Day 107 (Tue)
  W('lower', 'Max Out Sweet & Max Out ABS',     'mindex30.html', 25), // Day 108 (Wed)
  W('core',  'Max Out Strength',                'mindex9.html',  15), // Day 109 (Thu)
  W('hiit',  'Friday Fight Round 2',            'mindex10.html', 18), // Day 110 (Fri)
  W('lower', 'Cardio Challenge',                'mindex1.html',  20), // Day 111 (Sat)
  { type: 'rest' },                                                        // Day 112 (Sun) - Off
];


// Ví dụ khác (tuỳ bạn thay)
const FULLBODY_PLAN: PlanItem[] = [
  W('upper', 'Upper Push',        'findex1.html', 25),
  W('lower', 'Lower Strength',    'findex1.html', 25),
  { type: 'rest' },
  W('core',  'Core Stability',    'findex1.html', 15),
  W('hiit',  'HIIT Mix',          'findex1.html', 20),
  W('upper', 'Upper Pull',        'findex1.html', 25),
  W('lower', 'Glutes Focus',      'findex1.html', 20),
  // ... có thể thêm tiếp, không cần bội số của 7
];

export const PROGRAMS: WorkoutProgram[] = [
  {
    id: 'fatburn-60',
    titleKey: 'home.program60',
    durationDays: Max30.length, // = số ngày bạn nhập
    iconColor: '#FF6B6B',
    icon: require('../../assets/images/icon_fatburn.jpg'),
    plan: Max30
  },
  {
    id: 'fullbody-90',
    titleKey: 'home.program90',
    durationDays: FULLBODY_PLAN.length,
    iconColor: '#4ECDC4',
    icon: require('../../assets/images/icon_fullbody.jpg'),
    plan: FULLBODY_PLAN
  }
];

/** Sinh list ngày đúng theo thứ tự plan, không lặp lại.
 *  weekdayIndex = i % 7 để tô màu theo Mon..Sun.
 */
export function generateProgramDays(program: WorkoutProgram): WorkoutDay[] {
  const plan = program.plan || [];
  return plan.map((item, i) => {
    const dayNumber = i + 1;
    const weekdayIndex = i % 7;

    if (item.type === 'rest') {
      return {
        id: `${program.id}-day-${dayNumber}`,
        dayNumber,
        weekdayIndex,
        sessionKey: 'rest',
        isRest: true,
        name: 'Rest / Recovery',
        webUrl: undefined,
        durationMin: undefined,
        videoUrl: '' // không dùng khi nghỉ
      };
    }

    // Workout
    return {
      id: `${program.id}-day-${dayNumber}`,
      dayNumber,
      weekdayIndex,
      sessionKey: item.sessionKey,
      isRest: false,
      name: item.name,
      webUrl: item.url,
      durationMin: item.durationMin,
      videoUrl: item.url // tương thích trường cũ
    };
  });
}
