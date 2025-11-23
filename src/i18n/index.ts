import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// (Tùy bạn giữ RNLocalize hay không. Ở đây mình dùng Intl + AsyncStorage)
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANG_KEY = 'app:lang';

const base = {
  appName: 'WorkoutApp',
  footer: { devBy: 'Developer by {{name}}' },
  tabs: {
    main: 'Main',
    nutrition: 'Nutrition',
    guide: 'Guide',
    premium: 'Premium',
    settings: 'Settings',
  },
  home: {
    title: 'Choose your workout plan',
    subtitle: 'Pick a program and train daily',
    program60: '60-Day Fat Burn Program',
    program90: '90-Day Full Body Program',
    daysSuffix: '{{count}} days',
    health_overview: 'Health overview',
  },
  program: {
    daysPrefix: 'Day {{day}} • {{weekday}}',
    weekTitle: 'Week {{n}}',
    completed: 'Completed',
    todayWorkout: 'Workout: {{name}}',
  },
  workouts: {
    rest: 'Recovery / Rest',
    hiit: 'Full-body HIIT',
    upper: 'Chest - Shoulder - Arms',
    lower: 'Glutes - Legs',
    core: 'Abs & Core',
  },
  nutrition: {
    title: 'Nutrition',
    content: 'Suggested macros, water intake, and sample meals for each plan.',
  },
  guide: {
    title: 'Guide',
    content:
      'How to use the app, watch videos, mark days completed, and track progress.',
  },
  premium: {
    title: 'Go Premium',
    removeAds: 'Remove all ads',
    allPrograms: 'Unlock all programs',
    cta: 'Upgrade now',
    active: 'You are Premium. Ads removed.',
  },
  video: {
    loading: 'Loading video...',
    play: 'Start workout',
    error: 'Unable to play video. Please try again.',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    choose: 'Choose a language',
  },
  onboard: {
    title: 'Let’s get started 👋',
    subtitle: 'Enter a few details so we can suggest a suitable plan',
    name: 'Full name *',
    age: 'Age *',
    gender: 'Gender *',
    gender_male: 'Male',
    gender_female: 'Female',
    gender_other: 'Other',
    health: 'Health condition',
    height: 'Height (cm) *',
    weight: 'Weight (kg) *',
    injured_q: 'Any injury?',
    injury_note: 'Injury description',
    goal: 'Current goal *',
    goals: {
      lose_weight: 'Lose weight',
      build_muscle: 'Build muscle',
      maintain: 'Maintain',
      recomp: 'Recomp (lose fat + build muscle)',
      endurance: 'Endurance',
      flexibility: 'Flexibility',
    },
    tip_title: 'Quick tips',
    tip_1:
      'If injured, start with low-impact exercises and increase gradually.',
    tip_2: 'Update your weight every 3 days to track progress.',
    back: 'Back',
    next: 'Next',
    finish: 'Finish',
    saving: 'Saving...',
    bmi: 'BMI',
    bmi_result_title: 'Health overview',
    bmi_label_under: 'Underweight',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Overweight',
    bmi_label_obese: 'Obese',
    advice_intro: '• Your BMI: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Focus on gaining lean mass: full-body/upper-lower at moderate intensity; increase load; adequate protein and calories.',
    advice_bmi_normal:
      '• Maintain: mix strength + moderate cardio (2–3 days/week); prioritize technique and sleep.',
    advice_bmi_over:
      '• Fat loss: moderate cardio/light HIIT 2–3 days + full-body strength; slight calorie deficit.',
    advice_bmi_obese:
      '• Safe fat loss: brisk walk/low-impact cardio + basic strength; monitor HR, increase intensity gradually.',
    advice_goal_lose_weight:
      '• Goal: Lose weight → track calories, 1.6–2.2g/kg protein, 7–8h sleep.',
    advice_goal_build_muscle:
      '• Goal: Build muscle → progressive overload 3–5 days/week, 1.6–2.2g/kg protein, slight surplus.',
    advice_goal_maintain:
      '• Goal: Maintain → 3 days/week, balanced strength + cardio, weigh-in weekly.',
    advice_goal_recomp:
      '• Goal: Recomp → basic lifting + high protein, slight deficit, sleep well.',
    advice_goal_endurance:
      '• Goal: Endurance → zone 2 + intervals; fuel with carbs pre-workout.',
    advice_goal_flexibility:
      '• Goal: Flexibility → daily mobility/ROM 10–20’, add light strength.',
    advice_injured:
      '• Injury note: low-impact, pain-free ROM; progress gradually; consult coach/doctor as needed.',
    advice_healthnote:
      '• Monitor noted health conditions and adjust intensity accordingly.',
    start_training: 'Start training',
  },
  weight: {
    prompt_title: 'Update weight',
    prompt_desc: 'Enter your current weight (kg)',
    prompt_placeholder: 'e.g. 65.5',
    later: 'Later',
    save: 'Save',
    chart_title: 'Weight tracking',
    chart_empty:
      'No data yet. The app will periodically remind you to log your weight.',
  },
};

const vi = {
  appName: 'WorkoutApp',
  footer: { devBy: 'Developer by {{name}}' },
  tabs: {
    main: 'Main',
    nutrition: 'Dinh dưỡng',
    guide: 'Hướng dẫn',
    premium: 'Premium',
    settings: 'Cài đặt',
  },
  home: {
    title: 'Chọn chương trình tập',
    subtitle: 'Chọn 1 giáo án và luyện tập mỗi ngày',
    program60: 'Giáo án Giảm mỡ 60 ngày',
    program90: 'Giáo án Toàn thân 90 ngày',
    daysSuffix: '{{count}} ngày',
    health_overview: 'Tổng quan sức khỏe',
  },
  program: {
    daysPrefix: 'Ngày {{day}} • {{weekday}}',
    weekTitle: 'Tuần {{n}}',
    completed: 'Đã hoàn thành',
    todayWorkout: 'Bài tập: {{name}}',
  },
  workouts: {
    rest: 'Nghỉ phục hồi',
    hiit: 'HIIT toàn thân',
    upper: 'Ngực - Vai - Tay',
    lower: 'Mông - Đùi - Chân',
    core: 'Cơ bụng & Core',
  },
  nutrition: {
    title: 'Dinh dưỡng',
    content: 'Gợi ý khẩu phần, protein, nước, và thực đơn mẫu theo giáo án.',
  },
  guide: {
    title: 'Hướng dẫn',
    content:
      'Cách dùng app, xem video, đánh dấu ngày đã tập và theo dõi tiến độ.',
  },
  premium: {
    title: 'Nâng cấp Premium',
    removeAds: 'Loại bỏ quảng cáo',
    allPrograms: 'Mở khóa tất cả chương trình',
    cta: 'Nâng cấp ngay',
    active: 'Bạn đang là Premium. Không còn quảng cáo.',
  },
  video: {
    loading: 'Đang tải video...',
    play: 'Bắt đầu tập',
    error: 'Không phát được video. Vui lòng thử lại.',
  },
  settings: { title: 'Cài đặt', language: 'Ngôn ngữ', choose: 'Chọn ngôn ngữ' },
  onboard: {
    title: 'Bắt đầu nhé 👋',
    subtitle: 'Điền vài thông tin để mình gợi ý giáo án phù hợp',
    name: 'Họ và tên *',
    age: 'Tuổi *',
    gender: 'Giới tính *',
    gender_male: 'Nam',
    gender_female: 'Nữ',
    gender_other: 'Khác',
    health: 'Tình trạng sức khỏe',
    height: 'Chiều cao (cm) *',
    weight: 'Cân nặng (kg) *',
    injured_q: 'Có chấn thương không?',
    injury_note: 'Mô tả chấn thương',
    goal: 'Mục tiêu hiện tại *',
    goals: {
      lose_weight: 'Giảm cân',
      build_muscle: 'Tăng cơ',
      maintain: 'Duy trì',
      recomp: 'Giảm mỡ + tăng cơ',
      endurance: 'Sức bền',
      flexibility: 'Dẻo dai',
    },
    tip_title: 'Mẹo nhanh',
    tip_1: 'Nếu có chấn thương, hãy ưu tiên bài tập nhẹ và tăng dần cường độ.',
    tip_2: 'Cân nặng nên cập nhật 3 ngày/lần để theo dõi tiến độ.',
    back: 'Quay lại',
    next: 'Tiếp tục',
    finish: 'Hoàn tất',
    saving: 'Đang lưu...',
    bmi: 'BMI',
    bmi_result_title: 'Tổng quan sức khỏe',
    bmi_label_under: 'Gầy',
    bmi_label_normal: 'Bình thường',
    bmi_label_over: 'Thừa cân',
    bmi_label_obese: 'Béo phì',
    advice_intro: '• BMI của bạn: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Tập trung tăng khối cơ: full-body/upper-lower cường độ vừa, tăng dần tải; ăn đủ đạm và tăng tổng kcal.',
    advice_bmi_normal:
      '• Duy trì: xen kẽ sức mạnh + cardio vừa (2–3 buổi/tuần), ưu tiên kỹ thuật và giấc ngủ.',
    advice_bmi_over:
      '• Giảm mỡ: ưu tiên cardio vừa/HIIT nhẹ 2–3 buổi + sức mạnh toàn thân; kiểm soát calo thâm hụt nhẹ.',
    advice_bmi_obese:
      '• Giảm mỡ an toàn: đi bộ nhanh/cardio tác động thấp + sức mạnh cơ bản; theo dõi nhịp tim, tăng cường độ từ từ.',
    advice_goal_lose_weight:
      '• Mục tiêu: Giảm cân → theo dõi calo, ưu tiên đạm 1.6–2.2g/kg, ngủ đủ 7–8h.',
    advice_goal_build_muscle:
      '• Mục tiêu: Tăng cơ → progressive overload 3–5 buổi/tuần, protein 1.6–2.2g/kg, thặng dư calo nhẹ.',
    advice_goal_maintain:
      '• Mục tiêu: Duy trì → 3 buổi/tuần, cân bằng sức mạnh + cardio, theo dõi cân nặng 1 lần/tuần.',
    advice_goal_recomp:
      '• Mục tiêu: Giảm mỡ + tăng cơ → tạ cơ bản + protein cao, thâm hụt calo nhẹ, ngủ đủ.',
    advice_goal_endurance:
      '• Mục tiêu: Sức bền → chạy/đạp zone 2 xen interval; bổ sung carb trước buổi.',
    advice_goal_flexibility:
      '• Mục tiêu: Dẻo dai → mobility/ROM hằng ngày 10–20’, kết hợp sức mạnh nhẹ.',
    advice_injured:
      '• Lưu ý chấn thương: bài tác động thấp, phạm vi không đau; tăng cường độ từ từ; hỏi HLV/BS khi cần.',
    advice_healthnote:
      '• Theo dõi tình trạng sức khỏe đã ghi chú và điều chỉnh cường độ phù hợp.',
    start_training: 'Bắt đầu luyện tập',
  },
  weight: {
    prompt_title: 'Cập nhật cân nặng',
    prompt_desc: 'Hãy nhập cân nặng hiện tại (kg)',
    prompt_placeholder: 'VD: 65.5',
    later: 'Để sau',
    save: 'Lưu',
    chart_title: 'Theo dõi cân nặng',
    chart_empty: 'Chưa có dữ liệu. Ứng dụng sẽ nhắc bạn nhập cân nặng định kỳ.',
  },
};

// (Rút gọn – các ngôn ngữ khác dùng base + vài chỗ override nếu cần)
const es = {
  ...base,
  premium: {
    ...base.premium,
    title: 'Hazte Premium',
    cta: 'Actualizar ahora',
    active: 'Ya eres Premium. Sin anuncios.',
  },
  onboard: {
    title: '¡Empecemos! 👋',
    subtitle: 'Ingresa algunos datos para sugerir un plan adecuado',
    name: 'Nombre completo *',
    age: 'Edad *',
    gender: 'Género *',
    gender_male: 'Hombre',
    gender_female: 'Mujer',
    gender_other: 'Otro',
    health: 'Condición de salud',
    height: 'Altura (cm) *',
    weight: 'Peso (kg) *',
    injured_q: '¿Alguna lesión?',
    injury_note: 'Descripción de la lesión',
    goal: 'Objetivo actual *',
    goals: {
      lose_weight: 'Bajar de peso',
      build_muscle: 'Ganar músculo',
      maintain: 'Mantener',
      recomp: 'Recomp (perder grasa + ganar músculo)',
      endurance: 'Resistencia',
      flexibility: 'Flexibilidad',
    },
    tip_title: 'Consejos',
    tip_1:
      'Si estás lesionado, comienza con ejercicios de bajo impacto y aumenta gradualmente.',
    tip_2: 'Actualiza tu peso cada 3 días para ver el progreso.',
    back: 'Atrás',
    next: 'Siguiente',
    finish: 'Finalizar',
    saving: 'Guardando...',
    bmi: 'IMC',
    bmi_result_title: 'Resumen de salud',
    bmi_label_under: 'Bajo peso',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Sobrepeso',
    bmi_label_obese: 'Obesidad',
    advice_intro: '• Tu IMC: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Enfócate en masa magra: rutinas full-body/upper-lower moderadas; aumenta carga; suficiente proteína y calorías.',
    advice_bmi_normal:
      '• Mantén: mezcla fuerza + cardio moderado (2–3 días/semana); prioriza técnica y sueño.',
    advice_bmi_over:
      '• Pérdida de grasa: cardio moderado/HIIT suave 2–3 días + fuerza full-body; ligero déficit calórico.',
    advice_bmi_obese:
      '• Pérdida segura: caminar rápido/cardio de bajo impacto + fuerza básica; controla la FC, aumenta gradualmente.',
    advice_goal_lose_weight:
      '• Objetivo: Bajar de peso → controla calorías, 1.6–2.2g/kg de proteína, 7–8h de sueño.',
    advice_goal_build_muscle:
      '• Objetivo: Ganar músculo → sobrecarga progresiva 3–5 días/sem, proteína 1.6–2.2g/kg, ligero superávit.',
    advice_goal_maintain:
      '• Objetivo: Mantener → 3 días/sem, fuerza + cardio balanceados, pésate semanalmente.',
    advice_goal_recomp:
      '• Objetivo: Recomp → pesos básicos + alta proteína, ligero déficit, buen descanso.',
    advice_goal_endurance:
      '• Objetivo: Resistencia → zona 2 + intervalos; carbohidratos antes de entrenar.',
    advice_goal_flexibility:
      '• Objetivo: Flexibilidad → movilidad/ROM diario 10–20’, fuerza ligera.',
    advice_injured:
      '• Lesión: bajo impacto, rango sin dolor; progresa con calma; consulta al entrenador/médico si es necesario.',
    advice_healthnote:
      '• Monitorea condiciones de salud anotadas y ajusta la intensidad.',
    start_training: 'Comenzar a entrenar',
  },
  weight: {
    prompt_title: 'Actualizar peso',
    prompt_desc: 'Ingresa tu peso actual (kg)',
    prompt_placeholder: 'p. ej. 65.5',
    later: 'Luego',
    save: 'Guardar',
    chart_title: 'Seguimiento de peso',
    chart_empty: 'Sin datos aún. La app te recordará registrar tu peso.',
  },
};
const fr = {
  ...base,
  premium: {
    ...base.premium,
    title: 'Passer en Premium',
    cta: 'Mettre à niveau',
    active: 'Vous êtes Premium. Sans publicité.',
  },
  onboard: {
    title: 'C’est parti 👋',
    subtitle: 'Saisissez quelques infos pour proposer un plan adapté',
    name: 'Nom complet *',
    age: 'Âge *',
    gender: 'Genre *',
    gender_male: 'Homme',
    gender_female: 'Femme',
    gender_other: 'Autre',
    health: 'État de santé',
    height: 'Taille (cm) *',
    weight: 'Poids (kg) *',
    injured_q: 'Blessure ?',
    injury_note: 'Description de la blessure',
    goal: 'Objectif actuel *',
    goals: {
      lose_weight: 'Perdre du poids',
      build_muscle: 'Prendre du muscle',
      maintain: 'Maintenir',
      recomp: 'Recomp (perdre du gras + gagner du muscle)',
      endurance: 'Endurance',
      flexibility: 'Flexibilité',
    },
    tip_title: 'Astuces',
    tip_1:
      'En cas de blessure, privilégiez les exercices à faible impact et progressez progressivement.',
    tip_2: 'Mettez à jour votre poids tous les 3 jours.',
    back: 'Retour',
    next: 'Suivant',
    finish: 'Terminer',
    saving: 'Enregistrement...',
    bmi: 'IMC',
    bmi_result_title: 'Aperçu santé',
    bmi_label_under: 'Insuffisance pondérale',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Surpoids',
    bmi_label_obese: 'Obésité',
    advice_intro: '• Votre IMC : {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Visez la masse maigre : full-body/haut-bas modéré ; augmentez la charge ; protéines et calories suffisantes.',
    advice_bmi_normal:
      '• Maintien : force + cardio modéré (2–3 j/sem) ; technique et sommeil en priorité.',
    advice_bmi_over:
      '• Perte de gras : cardio modéré/HIIT léger 2–3 j + force globale ; léger déficit calorique.',
    advice_bmi_obese:
      '• Perte sécurisée : marche rapide/cardio faible impact + force basique ; surveillez la FC, augmentez graduellement.',
    advice_goal_lose_weight:
      '• Objectif : Perdre du poids → calories contrôlées, 1.6–2.2 g/kg de protéines, 7–8 h de sommeil.',
    advice_goal_build_muscle:
      '• Objectif : Prendre du muscle → surcharge progressive 3–5 j/sem, protéines 1.6–2.2 g/kg, léger surplus.',
    advice_goal_maintain:
      '• Objectif : Maintenir → 3 j/sem, force + cardio équilibrés, pesée hebdo.',
    advice_goal_recomp:
      '• Objectif : Recomp → bases en musculation + protéines élevées, léger déficit, bon sommeil.',
    advice_goal_endurance:
      '• Objectif : Endurance → zone 2 + intervalles ; glucides avant séance.',
    advice_goal_flexibility:
      '• Objectif : Flexibilité → mobilité/ROM quotidien 10–20’, force légère.',
    advice_injured:
      '• Blessure : faible impact, amplitude sans douleur ; progression graduelle ; consultez un pro si besoin.',
    advice_healthnote:
      '• Suivez les conditions de santé notées et adaptez l’intensité.',
    start_training: 'Commencer l’entraînement',
  },
  weight: {
    prompt_title: 'Mettre à jour le poids',
    prompt_desc: 'Saisissez votre poids actuel (kg)',
    prompt_placeholder: 'ex. 65.5',
    later: 'Plus tard',
    save: 'Enregistrer',
    chart_title: 'Suivi du poids',
    chart_empty:
      'Aucune donnée. L’app vous rappellera d’enregistrer votre poids.',
  },
  home: { health_overview: 'Aperçu santé' },
};
const de = {
  ...base,
  premium: {
    ...base.premium,
    title: 'Premium werden',
    cta: 'Jetzt upgraden',
    active: 'Du bist Premium. Keine Werbung.',
  },
  onboard: {
    title: 'Los geht’s 👋',
    subtitle:
      'Gib ein paar Daten ein, damit wir einen passenden Plan vorschlagen',
    name: 'Vollständiger Name *',
    age: 'Alter *',
    gender: 'Geschlecht *',
    gender_male: 'Männlich',
    gender_female: 'Weiblich',
    gender_other: 'Sonstiges',
    health: 'Gesundheitszustand',
    height: 'Größe (cm) *',
    weight: 'Gewicht (kg) *',
    injured_q: 'Verletzung?',
    injury_note: 'Verletzungsbeschreibung',
    goal: 'Aktuelles Ziel *',
    goals: {
      lose_weight: 'Abnehmen',
      build_muscle: 'Muskeln aufbauen',
      maintain: 'Halten',
      recomp: 'Recomp (Fettabbau + Muskelaufbau)',
      endurance: 'Ausdauer',
      flexibility: 'Beweglichkeit',
    },
    tip_title: 'Tipps',
    tip_1: 'Bei Verletzung: Übungen mit geringer Belastung, langsam steigern.',
    tip_2: 'Gewicht alle 3 Tage aktualisieren.',
    back: 'Zurück',
    next: 'Weiter',
    finish: 'Fertig',
    saving: 'Speichern...',
    bmi: 'BMI',
    bmi_result_title: 'Gesundheitsübersicht',
    bmi_label_under: 'Untergewicht',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Übergewicht',
    bmi_label_obese: 'Adipositas',
    advice_intro: '• Dein BMI: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Fokus auf Magermasse: Ganzkörper/Upper-Lower moderat; Last steigern; genügend Protein & Kalorien.',
    advice_bmi_normal:
      '• Erhalten: Kraft + moderates Cardio (2–3×/Woche); Technik & Schlaf priorisieren.',
    advice_bmi_over:
      '• Fettabbau: moderates Cardio/leichtes HIIT 2–3× + Ganzkörperkraft; leichtes Kaloriendefizit.',
    advice_bmi_obese:
      '• Sicherer Fettabbau: zügiges Gehen/niedrig belastendes Cardio + Basiskraft; HF überwachen, langsam steigern.',
    advice_goal_lose_weight:
      '• Ziel: Abnehmen → Kalorien tracken, 1.6–2.2g/kg Protein, 7–8h Schlaf.',
    advice_goal_build_muscle:
      '• Ziel: Muskelaufbau → progressive Überlastung 3–5×/Woche, 1.6–2.2g/kg Protein, leichter Überschuss.',
    advice_goal_maintain:
      '• Ziel: Halten → 3×/Woche, Kraft + Cardio ausgewogen, wöchentliches Wiegen.',
    advice_goal_recomp:
      '• Ziel: Recomp → Grundübungen + viel Protein, leichtes Defizit, guter Schlaf.',
    advice_goal_endurance:
      '• Ziel: Ausdauer → Zone2 + Intervalle; Kohlenhydrate vor dem Training.',
    advice_goal_flexibility:
      '• Ziel: Beweglichkeit → tägliche Mobilität/ROM 10–20’, leichte Kraft.',
    advice_injured:
      '• Verletzung: geringe Belastung, schmerzfreier ROM; langsam steigern; ggf. Arzt/Coach konsultieren.',
    advice_healthnote:
      '• Erfasste Gesundheitsprobleme beachten und Intensität anpassen.',
    start_training: 'Training starten',
  },
  weight: {
    prompt_title: 'Gewicht aktualisieren',
    prompt_desc: 'Aktuelles Gewicht (kg) eingeben',
    prompt_placeholder: 'z. B. 65.5',
    later: 'Später',
    save: 'Speichern',
    chart_title: 'Gewichtsverlauf',
    chart_empty: 'Noch keine Daten. Die App erinnert dich regelmäßig.',
  },
  home: { health_overview: 'Gesundheitsübersicht' },
};
const zh = {
  ...base,
  tabs: {
    ...base.tabs,
    main: '主页',
    nutrition: '营养',
    guide: '指南',
    premium: '高级版',
    settings: '设置',
  },
  home: {
    ...base.home,
    title: '选择你的训练计划',
    subtitle: '选择课程并每日训练',
    program60: '60天燃脂计划',
    program90: '90天全身计划',
    daysSuffix: '{{count}} 天',
    health_overview: '健康概览',
  },
  program: {
    ...base.program,
    daysPrefix: '第 {{day}} 天 • {{weekday}}',
    weekTitle: '第 {{n}} 周',
  },
  premium: {
    ...base.premium,
    title: '升级高级版',
    cta: '立即升级',
    active: '已是高级版，无广告。',
  },
  onboard: {
    title: '开始吧 👋',
    subtitle: '填写一些信息以便我们推荐合适的计划',
    name: '姓名 *',
    age: '年龄 *',
    gender: '性别 *',
    gender_male: '男',
    gender_female: '女',
    gender_other: '其他',
    health: '健康状况',
    height: '身高（厘米）*',
    weight: '体重（公斤）*',
    injured_q: '是否有伤？',
    injury_note: '受伤描述',
    goal: '当前目标 *',
    goals: {
      lose_weight: '减重',
      build_muscle: '增肌',
      maintain: '维持',
      recomp: '体态重塑（减脂+增肌）',
      endurance: '耐力',
      flexibility: '柔韧',
    },
    tip_title: '小贴士',
    tip_1: '如有受伤，先从低冲击训练开始，逐步提高强度。',
    tip_2: '每3天更新一次体重以追踪趋势。',
    back: '返回',
    next: '继续',
    finish: '完成',
    saving: '保存中...',
    bmi: 'BMI',
    bmi_result_title: '健康概览',
    bmi_label_under: '偏瘦',
    bmi_label_normal: '正常',
    bmi_label_over: '超重',
    bmi_label_obese: '肥胖',
    advice_intro: '• 你的BMI：{{bmi}}（{{label}}）。',
    advice_bmi_under:
      '• 侧重增加瘦体重：全身/上下肢训练，中等强度；逐步加负荷；足量蛋白和热量。',
    advice_bmi_normal:
      '• 维持：力量+中等强度有氧（每周2–3次）；重视技术与睡眠。',
    advice_bmi_over:
      '• 降脂：中强度有氧/轻度HIIT每周2–3次 + 全身力量；轻微热量赤字。',
    advice_bmi_obese:
      '• 安全减脂：快走/低冲击有氧 + 基础力量；监测心率，循序渐进。',
    advice_goal_lose_weight:
      '• 目标：减重 → 控制热量，蛋白1.6–2.2g/kg，睡眠7–8小时。',
    advice_goal_build_muscle:
      '• 目标：增肌 → 渐进超负荷每周3–5次，蛋白1.6–2.2g/kg，轻微热量盈余。',
    advice_goal_maintain: '• 目标：维持 → 每周3次，力量+有氧平衡，每周称重。',
    advice_goal_recomp:
      '• 目标：体态重塑 → 基础力量 + 高蛋白，轻微热量赤字，保证睡眠。',
    advice_goal_endurance: '• 目标：耐力 → Zone2 + 间歇；训练前补充碳水。',
    advice_goal_flexibility:
      '• 目标：柔韧 → 每日灵活性/ROM 10–20 分钟，配合轻力量。',
    advice_injured:
      '• 伤病注意：低冲击、无痛范围；逐步增加；必要时咨询教练/医生。',
    advice_healthnote: '• 持续关注已记录的健康情况并调整强度。',
    start_training: '开始训练',
  },
  weight: {
    prompt_title: '更新体重',
    prompt_desc: '请输入当前体重（kg）',
    prompt_placeholder: '如：65.5',
    later: '稍后',
    save: '保存',
    chart_title: '体重追踪',
    chart_empty: '暂无数据。应用会定期提醒你记录体重。',
  },
};
const ja = {
  ...base,
  tabs: {
    ...base.tabs,
    main: 'メイン',
    nutrition: '栄養',
    guide: 'ガイド',
    premium: 'プレミアム',
    settings: '設定',
  },
  home: {
    ...base.home,
    title: 'ワークアウトプランを選択',
    subtitle: 'プログラムを選び毎日トレーニング',
    program60: '60日 脂肪燃焼',
    program90: '90日 全身',
    daysSuffix: '{{count}} 日',
    health_overview: '健康概要',
  },
  program: { ...base.program, weekTitle: '第{{n}}週' },
  premium: { ...base.premium, title: 'プレミアムにアップグレード' },
  onboard: {
    title: 'はじめましょう 👋',
    subtitle: 'いくつか入力して最適なプランをご提案します',
    name: '氏名 *',
    age: '年齢 *',
    gender: '性別 *',
    gender_male: '男性',
    gender_female: '女性',
    gender_other: 'その他',
    health: '健康状態',
    height: '身長 (cm) *',
    weight: '体重 (kg) *',
    injured_q: 'ケガはありますか？',
    injury_note: 'ケガの内容',
    goal: '現在の目標 *',
    goals: {
      lose_weight: '減量',
      build_muscle: '筋力アップ',
      maintain: '維持',
      recomp: 'リコンプ（減脂＋筋肥大）',
      endurance: '持久力',
      flexibility: '柔軟性',
    },
    tip_title: 'ヒント',
    tip_1: 'ケガがある場合は低負荷から始め、段階的に強度を上げましょう。',
    tip_2: '体重は3日ごとに更新すると推移が見えます。',
    back: '戻る',
    next: '次へ',
    finish: '完了',
    saving: '保存中…',
    bmi: 'BMI',
    bmi_result_title: '健康概要',
    bmi_label_under: '低体重',
    bmi_label_normal: '標準',
    bmi_label_over: '過体重',
    bmi_label_obese: '肥満',
    advice_intro: '• あなたのBMI：{{bmi}}（{{label}}）。',
    advice_bmi_under:
      '• 除脂肪量の増加に注力：全身/上下分割の中強度、負荷漸増。十分なタンパク質と摂取カロリー。',
    advice_bmi_normal:
      '• 維持：筋トレ＋中強度有酸素（週2–3回）、技術と睡眠を重視。',
    advice_bmi_over:
      '• 脂肪減少：中強度の有酸素/軽いHIITを週2–3回＋全身筋トレ。軽いカロリー赤字。',
    advice_bmi_obese:
      '• 安全な減量：速歩/低衝撃有酸素＋基礎筋トレ。心拍数を管理し段階的に強度アップ。',
    advice_goal_lose_weight:
      '• 目標：減量 → カロリー管理、1.6–2.2g/kgのタンパク質、睡眠7–8時間。',
    advice_goal_build_muscle:
      '• 目標：筋力アップ → 週3–5回の漸進的過負荷、1.6–2.2g/kgのタンパク質、軽いカロリー余剰。',
    advice_goal_maintain:
      '• 目標：維持 → 週3回、筋トレ＋有酸素のバランス、週1回の計量。',
    advice_goal_recomp:
      '• 目標：リコンプ → 基本リフティング＋高タンパク、軽い赤字、良質な睡眠。',
    advice_goal_endurance:
      '• 目標：持久力 → Zone2＋インターバル。運動前に糖質補給。',
    advice_goal_flexibility:
      '• 目標：柔軟性 → 毎日10–20分のモビリティ/ROM＋軽い筋トレ。',
    advice_injured:
      '• ケガの注意：低衝撃・無痛ROM、段階的に。必要なら専門家へ相談。',
    advice_healthnote: '• 記録した健康状態を確認し、強度を調整。',
    start_training: 'トレーニングを始める',
  },
  weight: {
    prompt_title: '体重を更新',
    prompt_desc: '現在の体重（kg）を入力',
    prompt_placeholder: '例：65.5',
    later: 'あとで',
    save: '保存',
    chart_title: '体重の推移',
    chart_empty: 'データがありません。アプリが定期的にリマインドします。',
  },
};
const ko = {
  ...base,
  tabs: {
    ...base.tabs,
    main: '메인',
    nutrition: '영양',
    guide: '가이드',
    premium: '프리미엄',
    settings: '설정',
  },
  home: {
    ...base.home,
    title: '운동 프로그램 선택',
    subtitle: '프로그램을 선택하고 매일 운동하세요',
    daysSuffix: '{{count}} 일',
    health_overview: '건강 개요',
  },
  program: { ...base.program, weekTitle: '{{n}}주차' },
  onboard: {
    title: '시작해볼까요 👋',
    subtitle: '몇 가지 정보를 입력하면 맞춤 플랜을 추천해드려요',
    name: '이름 *',
    age: '나이 *',
    gender: '성별 *',
    gender_male: '남성',
    gender_female: '여성',
    gender_other: '기타',
    health: '건강 상태',
    height: '키 (cm) *',
    weight: '몸무게 (kg) *',
    injured_q: '부상이 있나요?',
    injury_note: '부상 설명',
    goal: '현재 목표 *',
    goals: {
      lose_weight: '감량',
      build_muscle: '근육 증가',
      maintain: '유지',
      recomp: '체형 개선(감량+증가)',
      endurance: '지구력',
      flexibility: '유연성',
    },
    tip_title: '팁',
    tip_1: '부상이 있다면 저강도부터 시작하고 서서히 강도를 높이세요.',
    tip_2: '체중은 3일마다 업데이트하면 추이를 확인하기 좋아요.',
    back: '뒤로',
    next: '다음',
    finish: '완료',
    saving: '저장 중...',
    bmi: 'BMI',
    bmi_result_title: '건강 개요',
    bmi_label_under: '저체중',
    bmi_label_normal: '정상',
    bmi_label_over: '과체중',
    bmi_label_obese: '비만',
    advice_intro: '• BMI: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• 제지방 증가에 집중: 전신/상하분할 중강도, 점진적 과부하. 단백질·칼로리 충분히.',
    advice_bmi_normal:
      '• 유지: 근력 + 중강도 유산소(주2–3회), 기술과 수면 우선.',
    advice_bmi_over:
      '• 체지방 감소: 중강도 유산소/가벼운 HIIT 주2–3회 + 전신 근력; 약간의 열량 적자.',
    advice_bmi_obese:
      '• 안전한 감량: 빠른 걷기/저충격 유산소 + 기초 근력; 심박 모니터링, 점진적 증가.',
    advice_goal_lose_weight:
      '• 목표: 감량 → 칼로리 추적, 단백질 1.6–2.2g/kg, 7–8시간 수면.',
    advice_goal_build_muscle:
      '• 목표: 근증가 → 주3–5회 점진적 과부하, 단백질 1.6–2.2g/kg, 소량의 칼로리 흑자.',
    advice_goal_maintain:
      '• 목표: 유지 → 주3회, 근력+유산소 균형, 주 1회 체중 체크.',
    advice_goal_recomp:
      '• 목표: 체형 개선 → 기본 리프팅 + 고단백, 소량의 적자, 숙면.',
    advice_goal_endurance: '• 목표: 지구력 → 존2 + 인터벌; 운동 전 탄수 보충.',
    advice_goal_flexibility:
      '• 목표: 유연성 → 매일 10–20분 모빌리티/ROM, 가벼운 근력.',
    advice_injured:
      '• 부상 유의: 저충격·무통 범위, 단계적 진행. 필요 시 전문가 상담.',
    advice_healthnote: '• 기록한 건강 상태를 확인하며 강도를 조절하세요.',
    start_training: '운동 시작',
  },
  weight: {
    prompt_title: '몸무게 업데이트',
    prompt_desc: '현재 몸무게(kg)를 입력하세요',
    prompt_placeholder: '예: 65.5',
    later: '나중에',
    save: '저장',
    chart_title: '몸무게 추적',
    chart_empty: '데이터가 없습니다. 앱이 주기적으로 알림을 보냅니다.',
  },
};
const ru = {
  ...base,
  tabs: {
    ...base.tabs,
    main: 'Главная',
    nutrition: 'Питание',
    guide: 'Гид',
    premium: 'Премиум',
    settings: 'Настройки',
  },
  home: {
    ...base.home,
    title: 'Выберите программу тренировок',
    subtitle: 'Занимайтесь каждый день',
    daysSuffix: '{{count}} дней',
    health_overview: 'Обзор здоровья',
  },
  program: { ...base.program, weekTitle: 'Неделя {{n}}' },
  onboard: {
    title: 'Поехали 👋',
    subtitle: 'Введите данные, чтобы мы предложили подходящий план',
    name: 'Полное имя *',
    age: 'Возраст *',
    gender: 'Пол *',
    gender_male: 'Муж',
    gender_female: 'Жен',
    gender_other: 'Другое',
    health: 'Состояние здоровья',
    height: 'Рост (см) *',
    weight: 'Вес (кг) *',
    injured_q: 'Есть травмы?',
    injury_note: 'Описание травмы',
    goal: 'Текущая цель *',
    goals: {
      lose_weight: 'Снижение веса',
      build_muscle: 'Набор мышц',
      maintain: 'Поддержание',
      recomp: 'Рекомпозиция (жир↓ мышцы↑)',
      endurance: 'Выносливость',
      flexibility: 'Подвижность',
    },
    tip_title: 'Советы',
    tip_1: 'При травме начинайте с низкой нагрузки и постепенно повышайте.',
    tip_2: 'Обновляйте вес каждые 3 дня для отслеживания.',
    back: 'Назад',
    next: 'Далее',
    finish: 'Готово',
    saving: 'Сохранение...',
    bmi: 'ИМТ',
    bmi_result_title: 'Обзор здоровья',
    bmi_label_under: 'Недостаток веса',
    bmi_label_normal: 'Норма',
    bmi_label_over: 'Избыточный вес',
    bmi_label_obese: 'Ожирение',
    advice_intro: '• Ваш ИМТ: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Упор на набор сухой массы: фуллбоди/верх-низ средней интенсивности; прогрессия нагрузки; белок и калории.',
    advice_bmi_normal:
      '• Поддержание: силовые + умеренное кардио (2–3 р/нед), техника и сон.',
    advice_bmi_over:
      '• Снижение жира: умеренное кардио/лёгкий HIIT 2–3 р + силовые; небольшой дефицит калорий.',
    advice_bmi_obese:
      '• Безопасное снижение: быстрая ходьба/низкоударное кардио + базовые силовые; контроль пульса, постепенность.',
    advice_goal_lose_weight:
      '• Цель: Похудение → учёт калорий, 1.6–2.2 г/кг белка, 7–8 ч сна.',
    advice_goal_build_muscle:
      '• Цель: Набор мышц → прогрессивная нагрузка 3–5 р/нед, белок 1.6–2.2 г/кг, небольшой профицит.',
    advice_goal_maintain:
      '• Цель: Поддержание → 3 р/нед, баланс силовых и кардио, контроль веса еженедельно.',
    advice_goal_recomp:
      '• Цель: Рекомпозиция → базовые упражнения + высокий белок, лёгкий дефицит, качественный сон.',
    advice_goal_endurance:
      '• Цель: Выносливость → зона 2 + интервалы; углеводы перед тренировкой.',
    advice_goal_flexibility:
      '• Цель: Подвижность → ежедневная мобильность/ROM 10–20 мин + лёгкая сила.',
    advice_injured:
      '• Травма: низкая нагрузка, без боли; постепенный прогресс; при необходимости консультация.',
    advice_healthnote:
      '• Учитывайте отмеченные проблемы со здоровьем и корректируйте интенсивность.',
    start_training: 'Начать тренироваться',
  },
  weight: {
    prompt_title: 'Обновить вес',
    prompt_desc: 'Введите ваш текущий вес (кг)',
    prompt_placeholder: 'напр. 65.5',
    later: 'Позже',
    save: 'Сохранить',
    chart_title: 'Отслеживание веса',
    chart_empty: 'Нет данных. Приложение будет напоминать о вводе веса.',
  },
};
const ar = {
  ...base,
  tabs: {
    ...base.tabs,
    main: 'الرئيسية',
    nutrition: 'التغذية',
    guide: 'الدليل',
    premium: 'بريميوم',
    settings: 'الإعدادات',
  },
  home: {
    ...base.home,
    title: 'اختر برنامج التمرين',
    subtitle: 'تدرّب يوميًا',
    daysSuffix: '{{count}} يومًا',
    health_overview: 'لمحة صحية',
  },
  program: { ...base.program, weekTitle: 'الأسبوع {{n}}' },
  onboard: {
    title: 'لنبدأ 👋',
    subtitle: 'أدخل بعض المعلومات لنقترح خطة مناسبة',
    name: 'الاسم الكامل *',
    age: 'العمر *',
    gender: 'النوع *',
    gender_male: 'ذكر',
    gender_female: 'أنثى',
    gender_other: 'آخر',
    health: 'الحالة الصحية',
    height: 'الطول (سم) *',
    weight: 'الوزن (كجم) *',
    injured_q: 'هل لديك إصابة؟',
    injury_note: 'وصف الإصابة',
    goal: 'الهدف الحالي *',
    goals: {
      lose_weight: 'إنقاص الوزن',
      build_muscle: 'بناء العضلات',
      maintain: 'الحفاظ',
      recomp: 'إعادة التكوين (حرق دهون + بناء عضل)',
      endurance: 'التحمّل',
      flexibility: 'المرونة',
    },
    tip_title: 'نصائح',
    tip_1: 'مع وجود إصابة، ابدأ بتمارين منخفضة التأثير وزد الشدة تدريجياً.',
    tip_2: 'حدّث وزنك كل 3 أيام لمتابعة التغير.',
    back: 'عودة',
    next: 'التالي',
    finish: 'إنهاء',
    saving: 'جارٍ الحفظ...',
    bmi: 'مؤشر كتلة الجسم',
    bmi_result_title: 'لمحة صحية',
    bmi_label_under: 'نحيف',
    bmi_label_normal: 'طبيعي',
    bmi_label_over: 'زيادة وزن',
    bmi_label_obese: 'سمنة',
    advice_intro: '• مؤشر كتلة الجسم: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• ركّز على زيادة الكتلة الخالية من الدهون: تمارين شاملة متوسطة؛ زيادة الحمل تدريجياً؛ بروتين وسعرات كافية.',
    advice_bmi_normal:
      '• الحفاظ: قوة + كارديو معتدل (2–3 أيام/أسبوع)؛ أولوية للتقنية والنوم.',
    advice_bmi_over:
      '• خفض الدهون: كارديو معتدل/HIIT خفيف 2–3 أيام + قوة شاملة؛ عجز حراري بسيط.',
    advice_bmi_obese:
      '• خفض آمن: مشي سريع/كارديو منخفض التأثير + قوة أساسية؛ راقب النبض وازدد تدريجياً.',
    advice_goal_lose_weight:
      '• الهدف: إنقاص الوزن → تتبّع السعرات، بروتين 1.6–2.2 غ/كغ، نوم 7–8 ساعات.',
    advice_goal_build_muscle:
      '• الهدف: بناء العضلات → زيادة تدريجية 3–5 أيام/أسبوع، بروتين 1.6–2.2 غ/كغ، فائض بسيط.',
    advice_goal_maintain:
      '• الهدف: الحفاظ → 3 أيام/أسبوع، توازن بين القوة والكارديو، وزن أسبوعي.',
    advice_goal_recomp:
      '• الهدف: إعادة التكوين → تمارين أساسية + بروتين مرتفع، عجز بسيط، نوم جيد.',
    advice_goal_endurance:
      '• الهدف: التحمّل → منطقة 2 + فترات؛ كربوهيدرات قبل التمرين.',
    advice_goal_flexibility:
      '• الهدف: المرونة → حركة/ROM يومية 10–20 د + قوة خفيفة.',
    advice_injured:
      '• ملاحظة إصابة: تمارين منخفضة التأثير ونطاق دون ألم؛ تقدّم تدريجي؛ استشر المختص إذا لزم.',
    advice_healthnote: '• راقب الحالات الصحية المذكورة وعدّل الشدة وفقاً لذلك.',
    start_training: 'ابدأ التمرين',
  },
  weight: {
    prompt_title: 'تحديث الوزن',
    prompt_desc: 'أدخل وزنك الحالي (كجم)',
    prompt_placeholder: 'مثال: 65.5',
    later: 'لاحقاً',
    save: 'حفظ',
    chart_title: 'متابعة الوزن',
    chart_empty: 'لا توجد بيانات بعد. سيذكّرك التطبيق دورياً.',
  },
};
const hi = {
  ...base,
  home: {
    ...base.home,
    title: 'अपना वर्कआउट प्लान चुनें',
    subtitle: 'एक प्रोग्राम चुनें और रोज़ ट्रेन करें',
    daysSuffix: '{{count}} दिन',
    health_overview: 'स्वास्थ्य सारांश',
  },
  program: { ...base.program, weekTitle: 'सप्ताह {{n}}' },
  onboard: {
    title: 'शुरू करें 👋',
    subtitle: 'कुछ विवरण भरें ताकि हम उपयुक्त प्लान सुझा सकें',
    name: 'पूरा नाम *',
    age: 'उम्र *',
    gender: 'लिंग *',
    gender_male: 'पुरुष',
    gender_female: 'महिला',
    gender_other: 'अन्य',
    health: 'स्वास्थ्य स्थिति',
    height: 'लंबाई (सेमी) *',
    weight: 'वज़न (किग्रा) *',
    injured_q: 'कोई चोट है?',
    injury_note: 'चोट का विवरण',
    goal: 'वर्तमान लक्ष्य *',
    goals: {
      lose_weight: 'वज़न घटाना',
      build_muscle: 'मांसपेशी बढ़ाना',
      maintain: 'बनाए रखना',
      recomp: 'रीकम्प (फैट↓ + मसल↑)',
      endurance: 'सहनशक्ति',
      flexibility: 'लचीलापन',
    },
    tip_title: 'टिप्स',
    tip_1:
      'चोट होने पर लो-इम्पैक्ट एक्सरसाइज़ से शुरू करें और धीरे-धीरे बढ़ाएँ।',
    tip_2: 'प्रगति देखने के लिए हर 3 दिन में वज़न अपडेट करें।',
    back: 'वापस',
    next: 'आगे',
    finish: 'समाप्त',
    saving: 'सेव हो रहा है...',
    bmi: 'बीएमआई',
    bmi_result_title: 'स्वास्थ्य सारांश',
    bmi_label_under: 'कम वज़न',
    bmi_label_normal: 'सामान्य',
    bmi_label_over: 'अधिक वज़न',
    bmi_label_obese: 'मोटापा',
    advice_intro: '• आपका BMI: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• लीन मास बढ़ाएँ: फुल-बॉडी/अप्पर-लोअर मीडियम इंटेंसिटी; लोड बढ़ाएँ; पर्याप्त प्रोटीन/कैलोरी।',
    advice_bmi_normal:
      '• मेंटेन: स्ट्रेंथ + मीडियम कार्डियो (2–3 दिन/सप्ताह); टेक्निक/नींद प्राथमिकता।',
    advice_bmi_over:
      '• फैट लॉस: मीडियम कार्डियो/हल्का HIIT 2–3 दिन + फुल-बॉडी स्ट्रेंथ; हल्का कैलोरी डेफिसिट।',
    advice_bmi_obese:
      '• सुरक्षित फैट लॉस: तेज़ चाल/लो-इम्पैक्ट कार्डियो + बेसिक स्ट्रेंथ; HR मॉनिटर, धीरे-धीरे बढ़ाएँ।',
    advice_goal_lose_weight:
      '• लक्ष्य: वज़न घटाना → कैलोरी ट्रैक, 1.6–2.2g/kg प्रोटीन, 7–8 घंटे नींद।',
    advice_goal_build_muscle:
      '• लक्ष्य: मसल बढ़ाना → 3–5 दिन प्रोग्रेसिव ओवरलोड, 1.6–2.2g/kg प्रोटीन, हल्का सरप्लस।',
    advice_goal_maintain:
      '• लक्ष्य: बनाए रखना → 3 दिन/सप्ताह, स्ट्रेंथ + कार्डियो बैलेंस, साप्ताहिक वज़न।',
    advice_goal_recomp:
      '• लक्ष्य: रीकम्प → बेसिक लिफ्ट + हाई प्रोटीन, हल्का डेफिसिट, अच्छी नींद।',
    advice_goal_endurance:
      '• लक्ष्य: सहनशक्ति → ज़ोन2 + इंटरवल; वर्कआउट से पहले कार्ब्स।',
    advice_goal_flexibility:
      '• लक्ष्य: लचीलापन → डेली मोबिलिटी/ROM 10–20’, हल्की स्ट्रेंथ।',
    advice_injured:
      '• चोट नोट: लो-इम्पैक्ट, बिना दर्द ROM; धीरे-धीरे बढ़ाएँ; जरूरत पर डॉक्टर/कोच से सलाह।',
    advice_healthnote:
      '• दर्ज स्वास्थ्य स्थितियों के अनुसार तीव्रता समायोजित करें।',
    start_training: 'ट्रेनिंग शुरू करें',
  },
  weight: {
    prompt_title: 'वज़न अपडेट करें',
    prompt_desc: 'वर्तमान वज़न (किग्रा) दर्ज करें',
    prompt_placeholder: 'उदा. 65.5',
    later: 'बाद में',
    save: 'सेव',
    chart_title: 'वज़न ट्रैकिंग',
    chart_empty: 'अभी डेटा नहीं है। ऐप समय-समय पर याद दिलाएगा।',
  },
};
const th = {
  ...base,
  home: {
    ...base.home,
    title: 'เลือกโปรแกรมออกกำลังกาย',
    subtitle: 'เลือกแล้วฝึกทุกวัน',
    daysSuffix: '{{count}} วัน',
    health_overview: 'ภาพรวมสุขภาพ',
  },
  program: { ...base.program, weekTitle: 'สัปดาห์ {{n}}' },
  onboard: {
    title: 'เริ่มกันเลย 👋',
    subtitle: 'กรอกข้อมูลเล็กน้อยเพื่อแนะนำแผนที่เหมาะสม',
    name: 'ชื่อ-นามสกุล *',
    age: 'อายุ *',
    gender: 'เพศ *',
    gender_male: 'ชาย',
    gender_female: 'หญิง',
    gender_other: 'อื่น ๆ',
    health: 'สถานะสุขภาพ',
    height: 'ส่วนสูง (ซม.) *',
    weight: 'น้ำหนัก (กก.) *',
    injured_q: 'มีอาการบาดเจ็บหรือไม่?',
    injury_note: 'รายละเอียดอาการบาดเจ็บ',
    goal: 'เป้าหมายปัจจุบัน *',
    goals: {
      lose_weight: 'ลดน้ำหนัก',
      build_muscle: 'เพิ่มกล้ามเนื้อ',
      maintain: 'คงที่',
      recomp: 'รีคอมพ์ (ลดไขมัน + เพิ่มกล้ามเนื้อ)',
      endurance: 'ความอึด',
      flexibility: 'ความยืดหยุ่น',
    },
    tip_title: 'เคล็ดลับ',
    tip_1: 'หากบาดเจ็บให้เริ่มด้วยท่าที่กระแทกต่ำและค่อย ๆ เพิ่มความหนัก',
    tip_2: 'อัปเดตน้ำหนักทุก 3 วันเพื่อติดตามแนวโน้ม',
    back: 'ย้อนกลับ',
    next: 'ถัดไป',
    finish: 'เสร็จสิ้น',
    saving: 'กำลังบันทึก...',
    bmi: 'BMI',
    bmi_result_title: 'ภาพรวมสุขภาพ',
    bmi_label_under: 'น้ำหนักน้อย',
    bmi_label_normal: 'ปกติ',
    bmi_label_over: 'น้ำหนักเกิน',
    bmi_label_obese: 'โรคอ้วน',
    advice_intro: '• BMI ของคุณ: {{bmi}} ({{label}})',
    advice_bmi_under:
      '• เน้นเพิ่มมวลไร้ไขมัน: ฟูลบอดี้/บน-ล่าง ระดับปานกลาง เพิ่มน้ำหนักทีละน้อย โปรตีน/แคลอรีเพียงพอ',
    advice_bmi_normal:
      '• รักษา: เวท + คาร์ดิโอปานกลาง (สัปดาห์ละ 2–3) ให้ความสำคัญเทคนิคและการนอน',
    advice_bmi_over:
      '• ลดไขมัน: คาร์ดิโอปานกลาง/HIIT เบา 2–3 ครั้ง + เวททั้งตัว ขาดดุลแคลอรีเล็กน้อย',
    advice_bmi_obese:
      '• ลดอย่างปลอดภัย: เดินเร็ว/คาร์ดิโอแรงกระแทกต่ำ + เวทพื้นฐาน เฝ้าดู HR เพิ่มความหนักอย่างค่อยเป็นค่อยไป',
    advice_goal_lose_weight:
      '• เป้าหมาย: ลดน้ำหนัก → ติดตามแคลอรี โปรตีน 1.6–2.2 ก./กก. นอน 7–8 ชม.',
    advice_goal_build_muscle:
      '• เป้าหมาย: เพิ่มกล้าม → progressive overload 3–5 ครั้ง/สัปดาห์ โปรตีน 1.6–2.2 ก./กก. เกินแคลอรีเล็กน้อย',
    advice_goal_maintain:
      '• เป้าหมาย: คงที่ → 3 ครั้ง/สัปดาห์ เวท+คาร์ดิโอสมดุล ชั่งน้ำหนักรายสัปดาห์',
    advice_goal_recomp:
      '• เป้าหมาย: รีคอมพ์ → เวทพื้นฐาน + โปรตีนสูง ขาดดุลเล็กน้อย พักผ่อนเพียงพอ',
    advice_goal_endurance:
      '• เป้าหมาย: ความอึด → โซน 2 + อินเทอร์วอล คาร์บก่อนออกกำลัง',
    advice_goal_flexibility:
      '• เป้าหมาย: ยืดหยุ่น → โมบิลิตี้/ROM 10–20 นาที/วัน + เวทเบา',
    advice_injured:
      '• บาดเจ็บ: เลือกท่ากระแทกต่ำ ช่วงการเคลื่อนไหวไม่เจ็บ เพิ่มทีละน้อย ปรึกษาผู้เชี่ยวชาญหากจำเป็น',
    advice_healthnote: '• ติดตามอาการสุขภาพที่ระบุและปรับความหนักให้เหมาะสม',
    start_training: 'เริ่มฝึก',
  },
  weight: {
    prompt_title: 'อัปเดตน้ำหนัก',
    prompt_desc: 'กรอกน้ำหนักปัจจุบัน (กก.)',
    prompt_placeholder: 'เช่น 65.5',
    later: 'ภายหลัง',
    save: 'บันทึก',
    chart_title: 'ติดตามน้ำหนัก',
    chart_empty: 'ยังไม่มีข้อมูล ระบบจะเตือนให้บันทึกน้ำหนักเป็นระยะ',
  },
};
const id = {
  ...base,
  home: {
    ...base.home,
    title: 'Pilih program latihan',
    subtitle: 'Latihan setiap hari',
    daysSuffix: '{{count}} hari',
    health_overview: 'Ringkasan kesehatan',
  },
  program: { ...base.program, weekTitle: 'Minggu {{n}}' },
  onboard: {
    title: 'Ayo mulai 👋',
    subtitle: 'Masukkan beberapa detail agar kami sarankan rencana yang tepat',
    name: 'Nama lengkap *',
    age: 'Usia *',
    gender: 'Jenis kelamin *',
    gender_male: 'Pria',
    gender_female: 'Wanita',
    gender_other: 'Lainnya',
    health: 'Kondisi kesehatan',
    height: 'Tinggi (cm) *',
    weight: 'Berat (kg) *',
    injured_q: 'Ada cedera?',
    injury_note: 'Deskripsi cedera',
    goal: 'Tujuan saat ini *',
    goals: {
      lose_weight: 'Turun berat',
      build_muscle: 'Tambah otot',
      maintain: 'Pertahankan',
      recomp: 'Rekomposisi (lemak↓ otot↑)',
      endurance: 'Daya tahan',
      flexibility: 'Fleksibilitas',
    },
    tip_title: 'Tips',
    tip_1: 'Jika cedera, mulai latihan low-impact dan tingkatkan perlahan.',
    tip_2: 'Perbarui berat tiap 3 hari untuk memantau tren.',
    back: 'Kembali',
    next: 'Lanjut',
    finish: 'Selesai',
    saving: 'Menyimpan...',
    bmi: 'BMI',
    bmi_result_title: 'Ringkasan kesehatan',
    bmi_label_under: 'Kurus',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Kelebihan berat',
    bmi_label_obese: 'Obesitas',
    advice_intro: '• BMI Anda: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Fokus massa tanpa lemak: full-body/upper-lower intensitas sedang; tambah beban bertahap; cukup protein & kalori.',
    advice_bmi_normal:
      '• Pertahankan: kekuatan + kardio sedang (2–3x/minggu); utamakan teknik & tidur.',
    advice_bmi_over:
      '• Turun lemak: kardio sedang/HIIT ringan 2–3x + kekuatan full-body; defisit kalori ringan.',
    advice_bmi_obese:
      '• Turun aman: jalan cepat/kardio low-impact + kekuatan dasar; pantau detak, naikkan intensitas bertahap.',
    advice_goal_lose_weight:
      '• Tujuan: Turun berat → pantau kalori, protein 1.6–2.2g/kg, tidur 7–8 jam.',
    advice_goal_build_muscle:
      '• Tujuan: Tambah otot → progressive overload 3–5x/minggu, protein 1.6–2.2g/kg, surplus ringan.',
    advice_goal_maintain:
      '• Tujuan: Pertahankan → 3x/minggu, kekuatan+kardio seimbang, timbang mingguan.',
    advice_goal_recomp:
      '• Tujuan: Rekomposisi → angkat dasar + protein tinggi, defisit ringan, tidur cukup.',
    advice_goal_endurance:
      '• Tujuan: Daya tahan → zona 2 + interval; karbo sebelum latihan.',
    advice_goal_flexibility:
      '• Tujuan: Fleksibilitas → mobilitas/ROM harian 10–20’, kekuatan ringan.',
    advice_injured:
      '• Cedera: low-impact, ROM tanpa nyeri; tingkatkan bertahap; konsultasi bila perlu.',
    advice_healthnote:
      '• Pantau kondisi kesehatan yang dicatat dan sesuaikan intensitas.',
    start_training: 'Mulai latihan',
  },
  weight: {
    prompt_title: 'Perbarui berat',
    prompt_desc: 'Masukkan berat saat ini (kg)',
    prompt_placeholder: 'mis. 65.5',
    later: 'Nanti',
    save: 'Simpan',
    chart_title: 'Pelacakan berat',
    chart_empty:
      'Belum ada data. Aplikasi akan mengingatkan Anda secara berkala.',
  },
};
const ms = {
  ...base,
  home: {
    ...base.home,
    title: 'Pilih pelan senaman',
    subtitle: 'Berlatih setiap hari',
    daysSuffix: '{{count}} hari',
    health_overview: 'Gambaran kesihatan',
  },
  program: { ...base.program, weekTitle: 'Minggu {{n}}' },
  onboard: {
    title: 'Mari mula 👋',
    subtitle: 'Masukkan beberapa maklumat untuk cadangan pelan yang sesuai',
    name: 'Nama penuh *',
    age: 'Umur *',
    gender: 'Jantina *',
    gender_male: 'Lelaki',
    gender_female: 'Perempuan',
    gender_other: 'Lain-lain',
    health: 'Keadaan kesihatan',
    height: 'Tinggi (cm) *',
    weight: 'Berat (kg) *',
    injured_q: 'Ada kecederaan?',
    injury_note: 'Butiran kecederaan',
    goal: 'Matlamat semasa *',
    goals: {
      lose_weight: 'Turun berat',
      build_muscle: 'Bina otot',
      maintain: 'Kekal',
      recomp: 'Rekomposisi (lemak↓ otot↑)',
      endurance: 'Daya tahan',
      flexibility: 'Fleksibiliti',
    },
    tip_title: 'Tip',
    tip_1:
      'Jika cedera, mulakan dengan impak rendah dan tambah intensiti perlahan.',
    tip_2: 'Kemas kini berat setiap 3 hari untuk pantau kemajuan.',
    back: 'Kembali',
    next: 'Seterusnya',
    finish: 'Selesai',
    saving: 'Menyimpan...',
    bmi: 'BMI',
    bmi_result_title: 'Gambaran kesihatan',
    bmi_label_under: 'Kurus',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Berat berlebihan',
    bmi_label_obese: 'Obesiti',
    advice_intro: '• BMI anda: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Fokus tambah jisim tanpa lemak: full-body/upper-lower sederhana; tambah beban; protein & kalori cukup.',
    advice_bmi_normal:
      '• Kekal: kekuatan + kardio sederhana (2–3x/minggu); utamakan teknik & tidur.',
    advice_bmi_over:
      '• Kuruskan lemak: kardio sederhana/HIIT ringan 2–3x + kekuatan seluruh badan; defisit kalori ringan.',
    advice_bmi_obese:
      '• Kuruskan dengan selamat: berjalan pantas/kardio impak rendah + kekuatan asas; pantau nadi, naik berperingkat.',
    advice_goal_lose_weight:
      '• Matlamat: Turun berat → jejak kalori, protein 1.6–2.2g/kg, tidur 7–8j.',
    advice_goal_build_muscle:
      '• Matlamat: Bina otot → progressive overload 3–5x/minggu, protein 1.6–2.2g/kg, lebihan ringan.',
    advice_goal_maintain:
      '• Matlamat: Kekal → 3x/minggu, seimbang kekuatan+kardio, timbang mingguan.',
    advice_goal_recomp:
      '• Matlamat: Rekomposisi → angkat asas + protein tinggi, defisit ringan, tidur mencukupi.',
    advice_goal_endurance:
      '• Matlamat: Daya tahan → zon 2 + interval; karbo sebelum latihan.',
    advice_goal_flexibility:
      '• Matlamat: Fleksibiliti → mobiliti/ROM harian 10–20’, kekuatan ringan.',
    advice_injured:
      '• Kecederaan: impak rendah, ROM tanpa sakit; naik berperingkat; rujuk pakar jika perlu.',
    advice_healthnote:
      '• Pantau keadaan kesihatan yang dinyatakan dan sesuaikan intensiti.',
    start_training: 'Mula latihan',
  },
  weight: {
    prompt_title: 'Kemas kini berat',
    prompt_desc: 'Masukkan berat semasa (kg)',
    prompt_placeholder: 'cth. 65.5',
    later: 'Nanti',
    save: 'Simpan',
    chart_title: 'Jejak berat',
    chart_empty:
      'Tiada data lagi. Aplikasi akan mengingatkan anda secara berkala.',
  },
};
const fil = {
  ...base,
  home: {
    ...base.home,
    title: 'Pumili ng workout plan',
    subtitle: 'Mag-train araw-araw',
    daysSuffix: '{{count}} araw',
    health_overview: 'Buod ng kalusugan',
  },
  program: { ...base.program, weekTitle: 'Linggo {{n}}' },
  onboard: {
    title: 'Simulan na 👋',
    subtitle: 'Maglagay ng ilang detalye para makapag-suggest ng tamang plano',
    name: 'Buong pangalan *',
    age: 'Edad *',
    gender: 'Kasarian *',
    gender_male: 'Lalake',
    gender_female: 'Babae',
    gender_other: 'Iba pa',
    health: 'Kondisyon sa kalusugan',
    height: 'Taas (cm) *',
    weight: 'Timbang (kg) *',
    injured_q: 'May injury ba?',
    injury_note: 'Paglalarawan ng injury',
    goal: 'Kasalukuyang layunin *',
    goals: {
      lose_weight: 'Magbawas ng timbang',
      build_muscle: 'Magdagdag ng muscle',
      maintain: 'Panatilihin',
      recomp: 'Recomp (bawas taba + dagdag muscle)',
      endurance: 'Tibay',
      flexibility: 'Flexibility',
    },
    tip_title: 'Tips',
    tip_1: 'Kung may injury, magsimula sa low-impact at dahan-dahang dagdagan.',
    tip_2: 'I-update ang timbang kada 3 araw para makita ang progreso.',
    back: 'Bumalik',
    next: 'Susunod',
    finish: 'Tapos',
    saving: 'Sine-save...',
    bmi: 'BMI',
    bmi_result_title: 'Buod ng kalusugan',
    bmi_label_under: 'Mababa',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Sobra',
    bmi_label_obese: 'Obese',
    advice_intro: '• BMI mo: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Tutok sa lean mass: full-body/upper-lower na katamtaman; dagdagan ang load; sapat na protina at calories.',
    advice_bmi_normal:
      '• Panatilihin: lakas + katamtamang cardio (2–3x/linggo); unahin ang teknik at tulog.',
    advice_bmi_over:
      '• Bawas taba: katamtamang cardio/magaan na HIIT 2–3x + full-body strength; bahagyang calorie deficit.',
    advice_bmi_obese:
      '• Ligtas na pagbawas: brisk walk/low-impact cardio + basic strength; bantayan ang HR, dahan-dahang dagdagan.',
    advice_goal_lose_weight:
      '• Layunin: Magbawas → i-track calories, 1.6–2.2g/kg protina, 7–8h tulog.',
    advice_goal_build_muscle:
      '• Layunin: Magdagdag ng muscle → progressive overload 3–5x/linggo, 1.6–2.2g/kg protina, kaunting surplus.',
    advice_goal_maintain:
      '• Layunin: Panatilihin → 3x/linggo, balanse sa lakas + cardio, timbang lingguhan.',
    advice_goal_recomp:
      '• Layunin: Recomp → basic lifting + high protein, bahagyang deficit, maayos na tulog.',
    advice_goal_endurance:
      '• Layunin: Tibay → zone 2 + intervals; carbs bago mag-workout.',
    advice_goal_flexibility:
      '• Layunin: Flexibility → araw-araw na mobility/ROM 10–20’, magaan na lakas.',
    advice_injured:
      '• Injury: low-impact, pain-free ROM; unti-unting pag-progress; kumunsulta kung kailangan.',
    advice_healthnote:
      '• Bantayan ang mga nabanggit na kondisyon at i-adjust ang intensity.',
    start_training: 'Simulan ang workout',
  },
  weight: {
    prompt_title: 'I-update ang timbang',
    prompt_desc: 'Ilagay ang kasalukuyang timbang (kg)',
    prompt_placeholder: 'hal. 65.5',
    later: 'Mamaya',
    save: 'I-save',
    chart_title: 'Pagsubaybay ng timbang',
    chart_empty: 'Wala pang datos. Paalalahanan ka ng app paminsan-minsan.',
  },
};
const pt = {
  ...base,
  home: {
    ...base.home,
    title: 'Escolha seu plano de treino',
    subtitle: 'Treine todos os dias',
    daysSuffix: '{{count}} dias',
    health_overview: 'Visão geral da saúde',
  },
  program: { ...base.program, weekTitle: 'Semana {{n}}' },
  onboard: {
    title: 'Vamos começar 👋',
    subtitle: 'Informe alguns dados para sugerirmos um plano adequado',
    name: 'Nome completo *',
    age: 'Idade *',
    gender: 'Gênero *',
    gender_male: 'Masculino',
    gender_female: 'Feminino',
    gender_other: 'Outro',
    health: 'Condição de saúde',
    height: 'Altura (cm) *',
    weight: 'Peso (kg) *',
    injured_q: 'Alguma lesão?',
    injury_note: 'Descrição da lesão',
    goal: 'Objetivo atual *',
    goals: {
      lose_weight: 'Perder peso',
      build_muscle: 'Ganhar músculo',
      maintain: 'Manter',
      recomp: 'Recomp (perder gordura + ganhar músculo)',
      endurance: 'Resistência',
      flexibility: 'Flexibilidade',
    },
    tip_title: 'Dicas',
    tip_1: 'Se houver lesão, comece com baixo impacto e aumente gradualmente.',
    tip_2: 'Atualize o peso a cada 3 dias para acompanhar a evolução.',
    back: 'Voltar',
    next: 'Avançar',
    finish: 'Concluir',
    saving: 'Salvando...',
    bmi: 'IMC',
    bmi_result_title: 'Visão geral da saúde',
    bmi_label_under: 'Abaixo do peso',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Sobrepeso',
    bmi_label_obese: 'Obesidade',
    advice_intro: '• Seu IMC: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Foque em massa magra: full-body/superior-inferior moderado; aumente a carga; proteína e calorias adequadas.',
    advice_bmi_normal:
      '• Manutenção: força + cardio moderado (2–3x/semana); priorize técnica e sono.',
    advice_bmi_over:
      '• Perda de gordura: cardio moderado/HIIT leve 2–3x + força full-body; leve déficit calórico.',
    advice_bmi_obese:
      '• Perda segura: caminhada rápida/cardio de baixo impacto + força básica; monitore FC e aumente gradualmente.',
    advice_goal_lose_weight:
      '• Objetivo: Perder peso → controle calorias, 1.6–2.2g/kg de proteína, 7–8h de sono.',
    advice_goal_build_muscle:
      '• Objetivo: Ganhar músculo → sobrecarga progressiva 3–5x/sem, proteína 1.6–2.2g/kg, leve superávit.',
    advice_goal_maintain:
      '• Objetivo: Manter → 3x/sem, equilíbrio força+cardio, pesagem semanal.',
    advice_goal_recomp:
      '• Objetivo: Recomp → básicos + alta proteína, leve déficit, bom sono.',
    advice_goal_endurance:
      '• Objetivo: Resistência → zona 2 + intervalos; carbo antes do treino.',
    advice_goal_flexibility:
      '• Objetivo: Flexibilidade → mobilidade/ROM diário 10–20’, força leve.',
    advice_injured:
      '• Lesão: baixo impacto, amplitude sem dor; progressão gradual; consulte profissional se necessário.',
    advice_healthnote:
      '• Monitore condições registradas e ajuste a intensidade.',
    start_training: 'Começar treino',
  },
  weight: {
    prompt_title: 'Atualizar peso',
    prompt_desc: 'Informe seu peso atual (kg)',
    prompt_placeholder: 'ex.: 65.5',
    later: 'Depois',
    save: 'Salvar',
    chart_title: 'Acompanhamento de peso',
    chart_empty: 'Sem dados ainda. O app lembrará você periodicamente.',
  },
};

const resources = {
  vi: { translation: vi },
  en: { translation: base },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  zh: { translation: zh },
  ja: { translation: ja },
  ko: { translation: ko },
  ru: { translation: ru },
  ar: { translation: ar },
  hi: { translation: hi },
  th: { translation: th },
  id: { translation: id },
  ms: { translation: ms },
  fil: { translation: fil },
  pt: { translation: pt },
};

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
  interpolation: { escapeValue: false },
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
