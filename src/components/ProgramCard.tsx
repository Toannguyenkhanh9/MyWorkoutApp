import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { WorkoutProgram } from '../data/programs';

interface Props { program: WorkoutProgram; onPress: () => void; }
export const ProgramCard: React.FC<Props> = ({ program, onPress }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={[styles.iconWrap, { backgroundColor: program.iconColor + '33' }]}>
        <Image source={program.icon} style={styles.icon} resizeMode="contain" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{t(program.titleKey)}</Text>
        <Text style={styles.days}>{t('home.daysSuffix', { count: program.durationDays })}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    padding: 16, borderRadius: 18, backgroundColor: '#111827',
    marginBottom: 12, flexDirection: 'row', alignItems: 'center'
  },
  iconWrap: { width: 56, height: 56, borderRadius: 16, marginRight: 16, alignItems: 'center', justifyContent: 'center' },
  icon: { width: 42, height: 42 },
  title: { fontSize: 16, fontWeight: '700', color: '#F9FAFB' },
  days: { fontSize: 12, color: '#93A3B5', marginTop: 3 },
  chevron: { fontSize: 28, color: '#6B7280', marginLeft: 8 }
});