// FILE: src/screens/OnboardingProfileScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
type Gender = 'male' | 'female' | 'other';
type Goal =
  | 'lose_weight'   // Giảm cân
  | 'build_muscle'  // Tăng cơ
  | 'maintain'      // Duy trì
  | 'recomp'        // Giảm mỡ + tăng cơ
  | 'endurance'     // Sức bền
  | 'flexibility';  // Dẻo dai

export type UserProfile = {
  name: string;
  gender?: Gender;
  age?: number;
  heightCm?: number;
  weightKg?: number;
  healthNote?: string;
  injured?: boolean;
  injuryNote?: string;
  goal?: Goal;
};

const STORAGE_KEY = 'user:profile';
const ONBOARD_DONE = 'onboarding:done';
const BMI_KEY = 'user:bmi';
const RECO_KEY = 'user:recommendation';

export default function OnboardingProfileScreen({ onDone }: { onDone?: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<UserProfile>({ name: '', injured: false });
  const [saving, setSaving] = useState(false);

  const [showResult, setShowResult] = useState(false);
  const [bmiValue, setBmiValue] = useState<number | null>(null);
  const [bmiLabel, setBmiLabel] = useState<string>('');
  const [advice, setAdvice] = useState<string>('');
  const { t } = useTranslation();
  const setField = <K extends keyof UserProfile>(k: K, v: UserProfile[K]) =>
    setData(p => ({ ...p, [k]: v }));

  const basicOk =
    data.name.trim().length >= 2 &&
    !!data.gender &&
    !!data.age;

  const metricOk =
    !!data.heightCm &&
    !!data.weightKg;

  const allOk = basicOk && metricOk && !!data.goal;

 function bmiCategory(heightCm?: number, weightKg?: number) {
    if (!heightCm || !weightKg) return { bmi: null as number | null, key: '' as 'under'|'normal'|'over'|'obese'|'' };
    const h = heightCm / 100;
    const bmi = +(weightKg / (h * h)).toFixed(1);
    let key: 'under'|'normal'|'over'|'obese' = 'normal';
    if (bmi < 18.5) key = 'under';
    else if (bmi < 25) key = 'normal';
    else if (bmi < 30) key = 'over';
    else key = 'obese';
    return { bmi, key };
  }
function buildAdvice(bmi: number | null, catKey: 'under'|'normal'|'over'|'obese'|'', p: UserProfile) {
    const lines: string[] = [];
    const labelMap: Record<string, string> = {
      under: t('onboard.bmi_label_under'),
      normal: t('onboard.bmi_label_normal'),
      over: t('onboard.bmi_label_over'),
      obese: t('onboard.bmi_label_obese')
    };
    const label = catKey ? labelMap[catKey] : '';

    if (bmi !== null) lines.push(t('onboard.advice_intro', { bmi, label }));

    if (catKey === 'under') lines.push(t('onboard.advice_bmi_under'));
    if (catKey === 'normal') lines.push(t('onboard.advice_bmi_normal'));
    if (catKey === 'over') lines.push(t('onboard.advice_bmi_over'));
    if (catKey === 'obese') lines.push(t('onboard.advice_bmi_obese'));

    const goalKey = p.goal;
    if (goalKey) {
      const mapGoal: Record<string, string> = {
        lose_weight: t('onboard.advice_goal_lose_weight'),
        build_muscle: t('onboard.advice_goal_build_muscle'),
        maintain: t('onboard.advice_goal_maintain'),
        recomp: t('onboard.advice_goal_recomp'),
        endurance: t('onboard.advice_goal_endurance'),
        flexibility: t('onboard.advice_goal_flexibility'),
      };
      lines.push(mapGoal[goalKey]);
    }

    if (p.injured) lines.push(t('onboard.advice_injured'));
    if (p.healthNote?.trim()) lines.push(t('onboard.advice_healthnote'));

    return lines.join('\n');
  }

  const save = async () => {
    if (!allOk || saving) return;
    try {
      setSaving(true);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      const { bmi, key } = bmiCategory(data.heightCm, data.weightKg);
      const adv = buildAdvice(bmi, key, data);

      setBmiValue(bmi);
      setBmiLabel(key ? {
        under: t('onboard.bmi_label_under'),
        normal: t('onboard.bmi_label_normal'),
        over: t('onboard.bmi_label_over'),
        obese: t('onboard.bmi_label_obese'),
      }[key] : '');

      setAdvice(adv);
      if (bmi !== null) await AsyncStorage.setItem(BMI_KEY, String(bmi));
      await AsyncStorage.setItem(RECO_KEY, adv);
      setShowResult(true);
    } finally { setSaving(false); }
  };

  const finishAndEnterApp = async () => {
    await AsyncStorage.setItem(ONBOARD_DONE, '1');
    onDone?.();
  };

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.title}>Bắt đầu nhé 👋</Text>
          <Text style={s.subtitle}>Điền vài thông tin để mình gợi ý giáo án phù hợp</Text>
          <View style={s.steps}>
            <Dot active={step >= 1} />
            <Dot active={step >= 2} />
            <Dot active={step >= 3} />
          </View>
        </View>

        {/* Body */}
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step === 1 && (
            <View>
              <Label>Họ và tên *</Label>
              <Input
                placeholder="VD: Nguyễn Văn A"
                value={data.name}
                onChangeText={v => setField('name', v)}
              />

              <View style={s.row}>
                <View style={s.col}>
                  <Label>Tuổi *</Label>
                  <Input
                    placeholder="VD: 28"
                    keyboardType="number-pad"
                    value={data.age ? String(data.age) : ''}
                    onChangeText={v => setField('age', v ? parseInt(v, 10) || undefined : undefined)}
                  />
                </View>
                <View style={s.col}>
                  <Label>Giới tính *</Label>
                  <Segment
                    value={data.gender}
                    options={[
                      { key: 'male', label: 'Nam' },
                      { key: 'female', label: 'Nữ' },
                      { key: 'other', label: 'Khác' },
                    ]}
                    onChange={g => setField('gender', g as Gender)}
                  />
                </View>
              </View>

              <Label>Tình trạng sức khỏe</Label>
              <Input
                placeholder="VD: Huyết áp cao/đau lưng nhẹ/không có bệnh nền…"
                value={data.healthNote || ''}
                onChangeText={v => setField('healthNote', v)}
                multiline
                style={{ height: 90, textAlignVertical: 'top' }}
              />
            </View>
          )}

          {step === 2 && (
            <View>
              <View style={s.row}>
                <View style={s.col}>
                  <Label>Chiều cao (cm) *</Label>
                  <Input
                    placeholder="VD: 170"
                    keyboardType="number-pad"
                    value={data.heightCm ? String(data.heightCm) : ''}
                    onChangeText={v => setField('heightCm', v ? parseFloat(v) || undefined : undefined)}
                  />
                </View>
                <View style={s.col}>
                  <Label>Cân nặng (kg) *</Label>
                  <Input
                    placeholder="VD: 65.5"
                    keyboardType="decimal-pad"
                    value={data.weightKg ? String(data.weightKg) : ''}
                    onChangeText={v => setField('weightKg', v ? parseFloat(v) || undefined : undefined)}
                  />
                </View>
              </View>

              <View style={[s.row, { alignItems: 'center', marginTop: 12 }]}>
                <Text style={[s.label, { marginBottom: 0 }]}>Có chấn thương không?</Text>
                <SwitchLike
                  value={!!data.injured}
                  onToggle={(v) => setField('injured', v)}
                />
              </View>

              {data.injured ? (
                <>
                  <Label>Mô tả chấn thương</Label>
                  <Input
                    placeholder="VD: Đau gối trái, hạn chế squat sâu…"
                    value={data.injuryNote || ''}
                    onChangeText={v => setField('injuryNote', v)}
                    multiline
                    style={{ height: 90, textAlignVertical: 'top' }}
                  />
                </>
              ) : null}
            </View>
          )}

          {step === 3 && (
            <View>
              <Label>Mục tiêu hiện tại *</Label>
              <ChipGroup
                value={data.goal}
                onChange={g => setField('goal', g as Goal)}
                options={[
                  { key: 'lose_weight', label: 'Giảm cân' },
                  { key: 'build_muscle', label: 'Tăng cơ' },
                  { key: 'maintain', label: 'Duy trì' },
                  { key: 'recomp', label: 'Giảm mỡ + tăng cơ' },
                  { key: 'endurance', label: 'Sức bền' },
                  { key: 'flexibility', label: 'Dẻo dai' },
                ]}
              />

              <TipCard />
            </View>
          )}
        </ScrollView>

        {/* Footer actions */}
        <View style={s.footer}>
          {step > 1 ? (
            <TouchableOpacity style={[s.footBtn, s.ghost]} onPress={() => setStep((s) => (s === 3 ? 2 : 1))}>
              <Text style={[s.footTxt, { color: '#0F172A' }]}>Quay lại</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: '48%' }} />
          )}

          {step < 3 ? (
            <TouchableOpacity
              style={[s.footBtn, basicOk && step === 1 ? s.primary : metricOk && step === 2 ? s.primary : s.disabled]}
              onPress={() => setStep((s) => (s === 1 ? 2 : 3))}
              disabled={(step === 1 && !basicOk) || (step === 2 && !metricOk)}
            >
              <Text style={[s.footTxt, { color: (step === 1 && basicOk) || (step === 2 && metricOk) ? '#fff' : '#94A3B8' }]}>
                Tiếp tục
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[s.footBtn, allOk ? s.primary : s.disabled]}
              onPress={save}
              disabled={!allOk || saving}
            >
              <Text style={[s.footTxt, { color: allOk ? '#fff' : '#94A3B8' }]}>
                {saving ? 'Đang lưu...' : 'Hoàn tất'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>

      {/* Modal kết quả BMI + lời khuyên */}
      <Modal visible={showResult} transparent animationType="fade" onRequestClose={() => setShowResult(false)}>
        <View style={s.modalWrap}>
          <View style={s.backdrop} />
          <View style={s.resultCard}>
            <Text style={s.resultTitle}>Tổng quan sức khỏe</Text>
            <Text style={s.resultBMI}>
              BMI: {bmiValue ?? '—'} {bmiLabel ? `(${bmiLabel})` : ''}
            </Text>
            <View style={s.adviceBox}>
              <Text style={s.adviceText}>{advice}</Text>
            </View>
            <TouchableOpacity style={[s.footBtn, s.primary, { marginTop: 10 }]} onPress={finishAndEnterApp}>
              <Text style={[s.footTxt, { color: '#fff' }]}>Bắt đầu luyện tập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ---------- UI helpers ---------- */
const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={s.label}>{children}</Text>
);

const Input: React.FC<React.ComponentProps<typeof TextInput>> = (props) => (
  <TextInput
    {...props}
    placeholderTextColor="#9CA3AF"
    style={[s.input, props.style]}
  />
);

const Segment: React.FC<{
  value?: string;
  options: { key: string; label: string }[];
  onChange: (v: string) => void;
}> = ({ value, options, onChange }) => (
  <View style={s.segmentWrap}>
    {options.map(o => {
      const active = value === o.key;
      return (
        <TouchableOpacity key={o.key} onPress={() => onChange(o.key)} style={[s.segmentItem, active && s.segmentActive]}>
          <Text style={[s.segmentText, active && s.segmentTextActive]}>{o.label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const ChipGroup: React.FC<{
  value?: string;
  options: { key: string; label: string }[];
  onChange: (v: string) => void;
}> = ({ value, options, onChange }) => (
  <View style={s.chips}>
    {options.map(o => {
      const active = value === o.key;
      return (
        <TouchableOpacity
          key={o.key}
          onPress={() => onChange(o.key)}
          style={[s.chip, active && s.chipActive]}
        >
          <Text style={[s.chipTxt, active && s.chipTxtActive]}>{o.label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const SwitchLike: React.FC<{ value: boolean; onToggle: (v: boolean) => void }> = ({ value, onToggle }) => (
  <TouchableOpacity
    onPress={() => onToggle(!value)}
    style={[s.switch, value && s.switchOn]}
    activeOpacity={0.8}
  >
    <View style={[s.switchDot, value && s.switchDotOn]} />
  </TouchableOpacity>
);

const TipCard = () => (
  <View style={s.tip}>
    <Text style={s.tipTitle}>Mẹo nhanh</Text>
    <Text style={s.tipTxt}>• Nếu có chấn thương, hãy ưu tiên bài tập nhẹ và tăng dần cường độ.</Text>
    <Text style={s.tipTxt}>• Cân nặng nên cập nhật 3 ngày/lần để theo dõi tiến độ.</Text>
  </View>
);

/* ---------- Styles (Light) ---------- */
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F6F7FB' },
  header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },
  title: { color: '#0F172A', fontSize: 24, fontWeight: '900' },
  subtitle: { color: '#64748B', marginTop: 6 },
  steps: { flexDirection: 'row', gap: 6, marginTop: 10 },

  label: { color: '#334155', fontWeight: '800', marginBottom: 6 },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#0F172A',
    fontSize: 14,
    marginBottom: 10
  },

  row: { flexDirection: 'row', gap: 12 },
  col: { flex: 1 },

  segmentWrap: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10
  },
  segmentItem: { flex: 1, borderRadius: 10, paddingVertical: 8, alignItems: 'center' },
  segmentActive: { backgroundColor: '#10B981' },
  segmentText: { color: '#334155', fontWeight: '700' },
  segmentTextActive: { color: '#fff' },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  chip: {
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999,
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB'
  },
  chipActive: { backgroundColor: '#ECFDF5', borderColor: '#10B981' },
  chipTxt: { color: '#0F172A', fontWeight: '700' },
  chipTxtActive: { color: '#065F46' },

  switch: {
    width: 52, height: 32, borderRadius: 999, backgroundColor: '#CBD5E1',
    padding: 3, justifyContent: 'center'
  },
  switchOn: { backgroundColor: '#10B981' },
  switchDot: { width: 26, height: 26, borderRadius: 999, backgroundColor: '#FFFFFF', transform: [{ translateX: 0 }] },
  switchDotOn: { transform: [{ translateX: 20 }] },

  tip: {
    marginTop: 14, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', padding: 12
  },
  tipTitle: { color: '#0F172A', fontWeight: '900', marginBottom: 6 },
  tipTxt: { color: '#475569', marginTop: 2 },

  footer: {
    flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingBottom: 16, paddingTop: 6,
    backgroundColor: '#F6F7FB'
  },
  footBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center', borderWidth: 1 },
  primary: { backgroundColor: '#10B981', borderColor: '#10B981' },
  disabled: { backgroundColor: '#F1F5F9', borderColor: '#E5E7EB' },
  ghost: { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' },
  footTxt: { fontWeight: '900' },

  // Modal kết quả
  modalWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)' },
  resultCard: {
    width: '88%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#0F172A', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 4,
  },
  resultTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A' },
  resultBMI: { marginTop: 6, color: '#0F172A', fontWeight: '800' },
  adviceBox: { marginTop: 10, backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  adviceText: { color: '#334155' },
});

function Dot({ active }: { active: boolean }) {
  return <View style={{ width: 26, height: 6, borderRadius: 999, backgroundColor: active ? '#10B981' : '#E5E7EB' }} />;
}
