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
const FATBURN_PLAN: PlanItem[] = [
  W('hiit',  'HIIT Toàn Thân',    'findex1.html', 20), // Mon
  W('upper', 'Ngực - Vai - Tay',  'findex1.html', 25), // Tue
  W('lower', 'Mông - Đùi - Chân', 'findex1.html', 25), // Wed
  W('core',  'Bụng & Core',       'findex1.html', 15), // Thu
  W('hiit',  'HIIT Đốt Mỡ',       'findex1.html', 18), // Fri
  W('lower', 'Chân + Cardio nhẹ', 'findex1.html', 20), // Sat
  { type: 'rest' } ,
  W('hiit',  'HIIT Toàn Thân1',    'findex1.html', 20), // Mon
  W('upper', 'Ngực - Vai - Tay1',  'findex1.html', 25), // Tue
  W('lower', 'Mông - Đùi - Chân1', 'findex1.html', 25), // Wed
  W('core',  'Bụng & Core1',       'findex1.html', 15), // Thu
  W('hiit',  'HIIT Đốt Mỡ1',       'findex1.html', 18), // Fri
  W('lower', 'Chân + Cardio nhẹ1', 'findex1.html', 20), // Sat
  { type: 'rest' }                                        // Sun (nghỉ)
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
    durationDays: FATBURN_PLAN.length, // = số ngày bạn nhập
    iconColor: '#FF6B6B',
    icon: require('../../assets/images/icon_fatburn.jpg'),
    plan: FATBURN_PLAN
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
