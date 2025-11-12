// FILE: src/screens/UserProfileScreen.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Switch, KeyboardAvoidingView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

type Gender = 'male' | 'female' | 'other';

type UserProfile = {
  name: string;
  age?: number;
  gender?: Gender;
  heightCm?: number;   // cm
  weightKg?: number;   // kg
  healthNote?: string; // tình trạng sức khỏe chung
  injured?: boolean;
  injuryNote?: string;
};

const STORAGE_KEY = 'user:profile';
const RECO_KEY = 'user:recommendation';

export const UserProfileScreen: React.FC<any> = ({ navigation }) => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: undefined,
    gender: undefined,
    heightCm: undefined,
    weightKg: undefined,
    healthNote: '',
    injured: false,
    injuryNote: ''
  });
  const [loading, setLoading] = useState(true);

  // Load hồ sơ đã lưu
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setProfile(JSON.parse(json));
      } catch {}
      setLoading(false);
    })();
  }, []);

  const setField = <K extends keyof UserProfile>(k: K, v: UserProfile[K]) =>
    setProfile(p => ({ ...p, [k]: v }));

  // Tính BMI và nhận xét
  const bmi = useMemo(() => {
    if (!profile.heightCm || !profile.weightKg) return undefined;
    const h = profile.heightCm / 100;
    if (h <= 0) return undefined;
    return +(profile.weightKg / (h * h)).toFixed(1);
  }, [profile.heightCm, profile.weightKg]);

  const bmiLabel = useMemo(() => {
    if (bmi === undefined) return '';
    if (bmi < 18.5) return 'Gầy';
    if (bmi < 25) return 'Bình thường';
    if (bmi < 30) return 'Thừa cân';
    return 'Béo phì';
  }, [bmi]);

  // Gợi ý giáo án cơ bản theo BMI + chấn thương
  const recommendation = useMemo(() => {
    if (profile.injured) {
      return 'Khuyến nghị: ưu tiên CORE/Upper nhẹ + Rest nhiều hơn trong tuần.';
    }
    if (bmi === undefined) return 'Điền chiều cao & cân nặng để nhận gợi ý.';
    if (bmi >= 25) return 'Khuyến nghị: Giáo án Giảm mỡ (HIIT nhẹ → vừa) + xen kẽ Lower/Core.';
    return 'Khuyến nghị: Giáo án Toàn thân (sức mạnh cơ bản + Core).';
  }, [bmi, profile.injured]);

  const valid = useMemo(() => {
    return profile.name.trim().length >= 2;
  }, [profile.name]);

  const save = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      await AsyncStorage.setItem(RECO_KEY, recommendation);
      Alert.alert('Đã lưu', recommendation);
      navigation.goBack?.();
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể lưu dữ liệu, thử lại.');
    }
  };

  const clear = async () => {
    setProfile({
      name: '',
      age: undefined,
      gender: undefined,
      heightCm: undefined,
      weightKg: undefined,
      healthNote: '',
      injured: false,
      injuryNote: ''
    });
    await AsyncStorage.multiRemove([STORAGE_KEY, RECO_KEY]);
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.safe,{justifyContent:'center',alignItems:'center'}]}>
        <Text style={{ color: '#64748B' }}>Loading…</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Hồ sơ người dùng</Text>
          <Text style={styles.caption}>Điền thông tin để khuyến nghị bài tập phù hợp</Text>

          {/* Tên */}
          <Label>Họ và tên *</Label>
          <Input
            placeholder="VD: Nguyễn Văn A"
            value={profile.name}
            onChangeText={(v) => setField('name', v)}
            returnKeyType="next"
          />

          {/* Tuổi + Giới tính */}
          <Row>
            <Col>
              <Label>Tuổi</Label>
              <Input
                placeholder="VD: 28"
                keyboardType="number-pad"
                value={profile.age?.toString() ?? ''}
                onChangeText={(v) => setField('age', v ? parseInt(v, 10) || undefined : undefined)}
              />
            </Col>
            <Col>
              <Label>Giới tính</Label>
              <Segment
                value={profile.gender}
                options={[
                  { key: 'male', label: 'Nam' },
                  { key: 'female', label: 'Nữ' },
                  { key: 'other', label: 'Khác' }
                ]}
                onChange={(g) => setField('gender', g as Gender)}
              />
            </Col>
          </Row>

          {/* Chiều cao + Cân nặng */}
          <Row>
            <Col>
              <Label>Chiều cao (cm)</Label>
              <Input
                placeholder="VD: 170"
                keyboardType="number-pad"
                value={profile.heightCm?.toString() ?? ''}
                onChangeText={(v) => setField('heightCm', v ? parseFloat(v) || undefined : undefined)}
              />
            </Col>
            <Col>
              <Label>Cân nặng (kg)</Label>
              <Input
                placeholder="VD: 65"
                keyboardType="decimal-pad"
                value={profile.weightKg?.toString() ?? ''}
                onChangeText={(v) => setField('weightKg', v ? parseFloat(v) || undefined : undefined)}
              />
            </Col>
          </Row>

          {/* BMI */}
          <InfoBox>
            <Text style={styles.infoText}>
              BMI: {bmi ?? '—'} {bmi ? `(${bmiLabel})` : ''}
            </Text>
          </InfoBox>

          {/* Tình trạng sức khỏe */}
          <Label>Tình trạng sức khỏe</Label>
          <Input
            placeholder="VD: Huyết áp ổn, ngủ đủ, mới tập lại sau thời gian nghỉ…"
            value={profile.healthNote}
            onChangeText={(v) => setField('healthNote', v)}
            multiline
            style={{ height: 80, textAlignVertical: 'top' }}
          />

          {/* Chấn thương */}
          <Row style={{ alignItems: 'center', marginTop: 8 }}>
            <Text style={[styles.label, { marginBottom: 0 }]}>Có chấn thương không?</Text>
            <Switch
              value={!!profile.injured}
              onValueChange={(v) => setField('injured', v)}
              trackColor={{ false: '#CBD5E1', true: '#86EFAC' }}
              thumbColor={profile.injured ? '#10B981' : '#E5E7EB'}
              style={{ marginLeft: 8 }}
            />
          </Row>

          {profile.injured && (
            <>
              <Label>Mô tả chấn thương</Label>
              <Input
                placeholder="VD: Đau gối trái, hạn chế squat sâu; đau vai khi đẩy…"
                value={profile.injuryNote}
                onChangeText={(v) => setField('injuryNote', v)}
                multiline
                style={{ height: 80, textAlignVertical: 'top' }}
              />
            </>
          )}

          {/* Gợi ý */}
          <InfoBox>
            <Text style={styles.infoText}>{recommendation}</Text>
          </InfoBox>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={clear}>
              <Text style={[styles.btnText, { color: '#334155' }]}>Xoá</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, valid ? styles.btnPrimary : styles.btnDisabled]}
              onPress={save}
              disabled={!valid}
            >
              <Text style={[styles.btnText, { color: valid ? '#fff' : '#94A3B8' }]}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

/* ---------- UI helpers ---------- */
const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={styles.label}>{children}</Text>
);

const Input: React.FC<React.ComponentProps<typeof TextInput>> = (props) => (
  <TextInput
    {...props}
    placeholderTextColor="#9CA3AF"
    style={[styles.input, props.style]}
  />
);

const Row: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => (
  <View style={[styles.row, style]}>{children}</View>
);
const Col: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.col}>{children}</View>
);

const Segment: React.FC<{
  value?: string;
  options: { key: string; label: string }[];
  onChange: (v: string) => void;
}> = ({ value, options, onChange }) => (
  <View style={styles.segmentWrap}>
    {options.map((o) => {
      const active = value === o.key;
      return (
        <TouchableOpacity
          key={o.key}
          onPress={() => onChange(o.key)}
          style={[styles.segmentItem, active && styles.segmentActive]}
        >
          <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{o.label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const InfoBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.infoBox}>{children}</View>
);

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F6F7FB' },
  container: { padding: 16, paddingBottom: 24 },
  title: { fontSize: 20, fontWeight: '900', color: '#0F172A' },
  caption: { fontSize: 12, color: '#64748B', marginTop: 4, marginBottom: 12 },

  label: { color: '#334155', fontWeight: '700', marginBottom: 6 },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#0F172A',
    fontSize: 14
  },

  row: { flexDirection: 'row', gap: 12 },
  col: { flex: 1 },

  segmentWrap: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  segmentItem: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center'
  },
  segmentActive: { backgroundColor: '#10B981' },
  segmentText: { color: '#334155', fontWeight: '700' },
  segmentTextActive: { color: '#fff' },

  infoBox: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12
  },
  infoText: { color: '#0F172A' },

  actions: { flexDirection: 'row', gap: 12, marginTop: 16 },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1
  },
  btnPrimary: { backgroundColor: '#10B981', borderColor: '#10B981' },
  btnDisabled: { backgroundColor: '#F1F5F9', borderColor: '#E5E7EB' },
  btnGhost: { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' },
  btnText: { fontWeight: '800', fontSize: 14 }
});

export default UserProfileScreen;
