import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// (Tùy bạn giữ RNLocalize hay không. Ở đây mình dùng Intl + AsyncStorage)
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANG_KEY = 'app:lang';

const base = {
  appName: 'WorkoutApp',
  footer: { devBy: 'Developer by {{name}}' },
  tabs: { main: 'Main', nutrition: 'Nutrition', guide: 'Guide', premium: 'Premium', settings: 'Settings' },
  home: {
    title: 'Choose your workout plan',
    subtitle: 'Pick a program and train daily',
    program60: '60-Day Fat Burn Program',
    program90: '90-Day Full Body Program',
    daysSuffix: '{{count}} days'
  },
  program: {
    daysPrefix: 'Day {{day}} • {{weekday}}',
    weekTitle: 'Week {{n}}',
    completed: 'Completed',
    todayWorkout: 'Workout: {{name}}'
  },
  workouts: {
    rest: 'Recovery / Rest',
    hiit: 'Full-body HIIT',
    upper: 'Chest - Shoulder - Arms',
    lower: 'Glutes - Legs',
    core: 'Abs & Core'
  },
  nutrition: { title: 'Nutrition', content: 'Suggested macros, water intake, and sample meals for each plan.' },
  guide: { title: 'Guide', content: 'How to use the app, watch videos, mark days completed, and track progress.' },
  premium: {
    title: 'Go Premium',
    removeAds: 'Remove all ads',
    allPrograms: 'Unlock all programs',
    cta: 'Upgrade now',
    active: 'You are Premium. Ads removed.'
  },
  video: { loading: 'Loading video...', play: 'Start workout', error: 'Unable to play video. Please try again.' },
  settings: {
    title: 'Settings',
    language: 'Language',
    choose: 'Choose a language'
  }
};

const vi = {
  appName: 'WorkoutApp',
  footer: { devBy: 'Developer by {{name}}' },
  tabs: { main: 'Main', nutrition: 'Dinh dưỡng', guide: 'Hướng dẫn', premium: 'Premium', settings: 'Cài đặt' },
  home: {
    title: 'Chọn chương trình tập',
    subtitle: 'Chọn 1 giáo án và luyện tập mỗi ngày',
    program60: 'Giáo án Giảm mỡ 60 ngày',
    program90: 'Giáo án Toàn thân 90 ngày',
    daysSuffix: '{{count}} ngày'
  },
  program: {
    daysPrefix: 'Ngày {{day}} • {{weekday}}',
    weekTitle: 'Tuần {{n}}',
    completed: 'Đã hoàn thành',
    todayWorkout: 'Bài tập: {{name}}'
  },
  workouts: {
    rest: 'Nghỉ phục hồi',
    hiit: 'HIIT toàn thân',
    upper: 'Ngực - Vai - Tay',
    lower: 'Mông - Đùi - Chân',
    core: 'Cơ bụng & Core'
  },
  nutrition: { title: 'Dinh dưỡng', content: 'Gợi ý khẩu phần, protein, nước, và thực đơn mẫu theo giáo án.' },
  guide: { title: 'Hướng dẫn', content: 'Cách dùng app, xem video, đánh dấu ngày đã tập và theo dõi tiến độ.' },
  premium: {
    title: 'Nâng cấp Premium',
    removeAds: 'Loại bỏ quảng cáo',
    allPrograms: 'Mở khóa tất cả chương trình',
    cta: 'Nâng cấp ngay',
    active: 'Bạn đang là Premium. Không còn quảng cáo.'
  },
  video: { loading: 'Đang tải video...', play: 'Bắt đầu tập', error: 'Không phát được video. Vui lòng thử lại.' },
  settings: { title: 'Cài đặt', language: 'Ngôn ngữ', choose: 'Chọn ngôn ngữ' }
};

// (Rút gọn – các ngôn ngữ khác dùng base + vài chỗ override nếu cần)
const es = { ...base, premium: { ...base.premium, title: 'Hazte Premium', cta: 'Actualizar ahora', active: 'Ya eres Premium. Sin anuncios.' } };
const fr = { ...base, premium: { ...base.premium, title: 'Passer en Premium', cta: 'Mettre à niveau', active: 'Vous êtes Premium. Sans publicité.' } };
const de = { ...base, premium: { ...base.premium, title: 'Premium werden', cta: 'Jetzt upgraden', active: 'Du bist Premium. Keine Werbung.' } };
const zh = { ...base, tabs: { ...base.tabs, main: '主页', nutrition: '营养', guide: '指南', premium: '高级版', settings: '设置' }, home: { ...base.home, title: '选择你的训练计划', subtitle: '选择课程并每日训练', program60: '60天燃脂计划', program90: '90天全身计划', daysSuffix: '{{count}} 天' }, program: { ...base.program, daysPrefix: '第 {{day}} 天 • {{weekday}}', weekTitle: '第 {{n}} 周' }, premium: { ...base.premium, title: '升级高级版', cta: '立即升级', active: '已是高级版，无广告。' } };
const ja = { ...base, tabs: { ...base.tabs, main: 'メイン', nutrition: '栄養', guide: 'ガイド', premium: 'プレミアム', settings: '設定' }, home: { ...base.home, title: 'ワークアウトプランを選択', subtitle: 'プログラムを選び毎日トレーニング', program60: '60日 脂肪燃焼', program90: '90日 全身', daysSuffix: '{{count}} 日' }, program: { ...base.program, weekTitle: '第{{n}}週' }, premium: { ...base.premium, title: 'プレミアムにアップグレード' } };
const ko = { ...base, tabs: { ...base.tabs, main: '메인', nutrition: '영양', guide: '가이드', premium: '프리미엄', settings: '설정' }, home: { ...base.home, title: '운동 프로그램 선택', subtitle: '프로그램을 선택하고 매일 운동하세요', daysSuffix: '{{count}} 일' }, program: { ...base.program, weekTitle: '{{n}}주차' } };
const ru = { ...base, tabs: { ...base.tabs, main: 'Главная', nutrition: 'Питание', guide: 'Гид', premium: 'Премиум', settings: 'Настройки' }, home: { ...base.home, title: 'Выберите программу тренировок', subtitle: 'Занимайтесь каждый день', daysSuffix: '{{count}} дней' }, program: { ...base.program, weekTitle: 'Неделя {{n}}' } };
const ar = { ...base, tabs: { ...base.tabs, main: 'الرئيسية', nutrition: 'التغذية', guide: 'الدليل', premium: 'بريميوم', settings: 'الإعدادات' }, home: { ...base.home, title: 'اختر برنامج التمرين', subtitle: 'تدرّب يوميًا', daysSuffix: '{{count}} يومًا' }, program: { ...base.program, weekTitle: 'الأسبوع {{n}}' } };
const hi = { ...base, home: { ...base.home, title: 'अपना वर्कआउट प्लान चुनें', subtitle: 'एक प्रोग्राम चुनें और रोज़ ट्रेन करें', daysSuffix: '{{count}} दिन' }, program: { ...base.program, weekTitle: 'सप्ताह {{n}}' } };
const th = { ...base, home: { ...base.home, title: 'เลือกโปรแกรมออกกำลังกาย', subtitle: 'เลือกแล้วฝึกทุกวัน', daysSuffix: '{{count}} วัน' }, program: { ...base.program, weekTitle: 'สัปดาห์ {{n}}' } };
const id = { ...base, home: { ...base.home, title: 'Pilih program latihan', subtitle: 'Latihan setiap hari', daysSuffix: '{{count}} hari' }, program: { ...base.program, weekTitle: 'Minggu {{n}}' } };
const ms = { ...base, home: { ...base.home, title: 'Pilih pelan senaman', subtitle: 'Berlatih setiap hari', daysSuffix: '{{count}} hari' }, program: { ...base.program, weekTitle: 'Minggu {{n}}' } };
const fil = { ...base, home: { ...base.home, title: 'Pumili ng workout plan', subtitle: 'Mag-train araw-araw', daysSuffix: '{{count}} araw' }, program: { ...base.program, weekTitle: 'Linggo {{n}}' } };
const pt = { ...base, home: { ...base.home, title: 'Escolha seu plano de treino', subtitle: 'Treine todos os dias', daysSuffix: '{{count}} dias' }, program: { ...base.program, weekTitle: 'Semana {{n}}' } };

const resources = { vi: { translation: vi }, en: { translation: base }, es: { translation: es }, fr: { translation: fr }, de: { translation: de }, zh: { translation: zh }, ja: { translation: ja }, ko: { translation: ko }, ru: { translation: ru }, ar: { translation: ar }, hi: { translation: hi }, th: { translation: th }, id: { translation: id }, ms: { translation: ms }, fil: { translation: fil }, pt: { translation: pt } };

function detectLang(): string {
  try {
    const loc = Intl?.DateTimeFormat?.().resolvedOptions?.().locale || 'en';
    return (loc.slice(0, 2) || 'en') as string;
  } catch {
    return 'en';
  }
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: detectLang(),
  fallbackLng: 'en',
  resources,
  interpolation: { escapeValue: false }
});

// Load override ngôn ngữ đã lưu
(async () => {
  try {
    const saved = await AsyncStorage.getItem(LANG_KEY);
    if (saved) i18n.changeLanguage(saved);
  } catch {}
})();

export { LANG_KEY };
export default i18n;