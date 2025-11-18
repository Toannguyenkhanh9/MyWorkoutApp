// FILE: src/components/WeightPrompt.tsx
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { addWeight, lastEntry, markPromptShown } from '../weight/weightStore';
import { useTranslation } from 'react-i18next';
export const WeightPrompt: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSaved?: () => void;
}> = ({ visible, onClose, onSaved }) => {
  const [kg, setKg] = useState<string>('');
  const { t } = useTranslation();
  useEffect(() => {
    if (visible) {
      (async () => {
        const last = await lastEntry();
        setKg(last?.kg ? String(last.kg) : '');
        await markPromptShown();
      })();
    }
  }, [visible]);

  const save = async () => {
    const v = parseFloat(kg);
    if (!isNaN(v) && v > 0) {
      await addWeight(+v);
      onSaved?.();
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.wrap}>
        <View style={s.backdrop} />
        <View style={s.card}>
          <Text style={s.title}>{t('weight.prompt_title')}</Text>
          <Text style={s.caption}>{t('weight.prompt_desc')}</Text>
          <TextInput
            value={kg}
            onChangeText={setKg}
            keyboardType="decimal-pad"
            placeholder="VD: 65.5"
            placeholderTextColor="#9CA3AF"
            style={s.input}
          />
          <View style={s.actions}>
            <TouchableOpacity style={[s.btn, s.btnGhost]} onPress={onClose}><Text style={[s.btnTxt, {color:'#0F172A'}]}>{t('weight.later')}</Text></TouchableOpacity>
            <TouchableOpacity style={[s.btn, s.btnPrimary]} onPress={save}><Text style={[s.btnTxt, {color:'#fff'}]}>{t('weight.save')}</Text></TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const s = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)' },
  card: {
    width: '88%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#0F172A', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 4,
  },
  title: { fontSize: 18, fontWeight: '900', color: '#0F172A' },
  caption: { marginTop: 6, color: '#64748B' },
  input: {
    marginTop: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 12, paddingVertical: 10, color: '#0F172A'
  },
  actions: { flexDirection: 'row', gap: 10, marginTop: 14 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center', borderWidth: 1 },
  btnPrimary: { backgroundColor: '#10B981', borderColor: '#10B981' },
  btnGhost: { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' },
  btnTxt: { fontWeight: '800' },
});
