// src/notifications/reminder.ts
import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
  AndroidVisibility
} from '@notifee/react-native';
import { Platform } from 'react-native';

/** Gọi 1 lần trong App.tsx */
export async function initNotifications() {
  // Android 13+ & iOS: xin quyền
  try {
    await notifee.requestPermission();
  } catch {}

  // Tạo channel Android
  if (Platform.OS === 'android') {
    await notifee.createChannel({
      id: 'workout',
      name: 'Workout Reminders',
      importance: AndroidImportance.DEFAULT,
      visibility: AndroidVisibility.PUBLIC,
      // smallIcon: 'ic_notification', // nếu bạn có icon nhỏ riêng
    });
  }
}

/** Lên lịch nhắc giờ hằng ngày (VD: 20:00) */
export async function scheduleDailyReminder(hour: number, minute: number) {
  // Hủy lịch cũ (nếu bạn dùng 1 ID cố định)
  try { await notifee.cancelNotification('daily-workout-reminder'); } catch {}
  try { await notifee.cancelTriggerNotification('daily-workout-reminder'); } catch {}

  const now = new Date();
  const fire = new Date();
  fire.setHours(hour, minute, 0, 0);
  if (fire.getTime() <= now.getTime()) {
    fire.setDate(fire.getDate() + 1); // nếu đã qua giờ hôm nay -> ngày mai
  }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: fire.getTime(),
    repeatFrequency: RepeatFrequency.DAILY,
    alarmManager: { allowWhileIdle: true }, // ưu tiên chính xác hơn
  };

  await notifee.createTriggerNotification(
    {
      id: 'daily-workout-reminder',
      title: 'Đến giờ tập rồi! 💪',
      body: 'Mở WorkoutApp và hoàn thành buổi hôm nay.',
      android: {
        channelId: 'workout',
        pressAction: { id: 'default' },
      },
      ios: {
        // iOS options nếu cần
      }
    },
    trigger
  );
}
