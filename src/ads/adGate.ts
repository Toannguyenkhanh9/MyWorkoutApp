import { isTrialActive, ensureTrialStarted } from './trial';
import { showRewarded, preloadRewarded } from './rewarded';

export type GateOptions = {
  isPremium?: boolean;      // từ SubscriptionProvider
  startTrialOnFirstUse?: boolean; // mặc định true → lần bấm đầu KHÔNG show ad
};

export async function canShowBanner(isPremium?: boolean) {
  if (isPremium) return false;
  return !(await isTrialActive());
}

// Gọi khi người dùng bấm vào 1 bài tập
export async function gateWorkout(opts: GateOptions = {}): Promise<boolean> {
  const { isPremium, startTrialOnFirstUse = true } = opts;
  if (isPremium) return true;

  // Nếu chưa có trial → bắt đầu trial và cho vào tập ngay (không show ad)
  if (!(await isTrialActive())) {
    if (startTrialOnFirstUse) {
      await ensureTrialStarted();
      preloadRewarded();
      return true;
    }
    // Nếu bạn muốn bắt xem 1 quảng cáo rồi mới bắt đầu trial, set startTrialOnFirstUse=false
  }

  // Trial còn hiệu lực → không show quảng cáo
  if (await isTrialActive()) return true;

  // Hết trial + chưa Premium → chặn bằng rewarded
  const ok = await showRewarded();
  return ok;
}
