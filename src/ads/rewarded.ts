// src/ads/rewarded.ts
import {
  RewardedAd,
  RewardedAdEventType,   // <-- dùng LOADED & EARNED_REWARD từ đây
  AdEventType,           // <-- vẫn dùng CLOSED/ERROR/OPENED từ đây
} from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';
import { ADMOB } from './adConfig';

const UNIT_ID = Platform.OS === 'android'
  ? ADMOB.android.rewarded
  : ADMOB.ios.rewarded;

let ad: RewardedAd | null = null;
let loaded = false;
let loading = false;

function create() {
  ad = RewardedAd.createForAdRequest(UNIT_ID, {
    requestNonPersonalizedAdsOnly: true,
  });

  // ✅ ĐÚNG: dùng RewardedAdEventType.LOADED
  ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
    console.log('[AD] rewarded loaded');
    loaded = true;
    loading = false;
  });

  // (tuỳ phiên bản lib, ERROR có thể là AdEventType.ERROR – vẫn OK)
ad.addAdEventListener(AdEventType.ERROR, (e) => {
  console.log('[AD] error', e);
  loaded = false; loading = false;
});

  ad.load();
  loading = true;
}

export function preloadRewarded() {
  if (!ad && !loading) create();
}

export async function showRewarded(): Promise<boolean> {
  if (!ad || (!loaded && !loading)) create();
  if (!ad || !loaded) {
    // Không có sẵn quảng cáo → cho qua để UX mượt
    return true;
  }

  return new Promise<boolean>((resolve) => {
    let earned = false;

    const r1 = ad!.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,   // ✅ sự kiện nhận thưởng
      () => { earned = true; }
    );

    const r2 = ad!.addAdEventListener(
      AdEventType.CLOSED,                  // ✅ đóng quảng cáo
      () => {
        ad = null; loaded = false; loading = false;
        preloadRewarded();
        resolve(earned);                   // chỉ pass khi đã earn
        r1(); r2();
      }
    );

    ad!.show().catch(() => {
      resolve(true);                       // lỗi khi show → không chặn
      r1(); r2();
    });
  });
}
