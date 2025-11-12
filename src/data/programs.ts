export type WorkoutSessionKey = 'rest' | 'hiit' | 'upper' | 'lower' | 'core';

export interface WorkoutDay {
  id: string;
  dayNumber: number;
  weekdayIndex: number; // 0=Mon..6=Sun
  sessionKey: WorkoutSessionKey;
  videoUrl: string;
}

export interface WorkoutProgram {
  id: string;
  titleKey: string;
  durationDays: number;
  iconColor: string;
  icon: any; // require(image)
}

const WEEK_ORDER: WorkoutSessionKey[] = ['hiit', 'upper', 'lower', 'core', 'hiit', 'lower', 'rest'];

const VIDEO_MAP: Record<WorkoutSessionKey, string> = {
  rest: 'https://example.com/rest.mp4',
  hiit: 'https://example.com/hiit.mp4',
  upper: 'https://example.com/upper.mp4',
  lower: 'https://example.com/lower.mp4',
  core: 'https://example.com/core.mp4'
};

export const PROGRAMS: WorkoutProgram[] = [
  {
    id: 'fatburn-60',
    titleKey: 'home.program60',
    durationDays: 60,
    iconColor: '#FF6B6B',
    icon: require('../../assets/images/icon_fatburn.jpg')
  },
  {
    id: 'fullbody-90',
    titleKey: 'home.program90',
    durationDays: 90,
    iconColor: '#4ECDC4',
    icon: require('../../assets/images/icon_fullbody.jpg')
  }
];

export function generateProgramDays(program: WorkoutProgram): WorkoutDay[] {
  return Array.from({ length: program.durationDays }, (_, i) => {
    const dayNumber = i + 1;
    const weekdayIndex = i % 7;
    const sessionKey = WEEK_ORDER[weekdayIndex];
    return {
      id: `${program.id}-day-${dayNumber}`,
      dayNumber,
      weekdayIndex,
      sessionKey,
      videoUrl: VIDEO_MAP[sessionKey]
    };
  });
}