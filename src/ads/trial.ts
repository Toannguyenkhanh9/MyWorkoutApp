import AsyncStorage from '@react-native-async-storage/async-storage';

const TRIAL_KEY = 'ads:trialStartAt';
const DAY = 24 * 60 * 60 * 1000;
const TRIAL_DAYS = 7;

// Khi người dùng bấm tập lần đầu → bật trial nếu chưa có
export async function ensureTrialStarted() {
  const ts = await AsyncStorage.getItem(TRIAL_KEY);
  if (!ts) {
    await AsyncStorage.setItem(TRIAL_KEY, String(Date.now()));
  }
}

export async function isTrialActive(): Promise<boolean> {
  const ts = await AsyncStorage.getItem(TRIAL_KEY);
  if (!ts) return false;
  const start = parseInt(ts, 10);
  return Date.now() - start < TRIAL_DAYS * DAY;
}