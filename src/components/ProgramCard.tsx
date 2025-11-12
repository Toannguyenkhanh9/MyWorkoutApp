import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { WorkoutProgram } from '../data/programs';

interface Props { program: WorkoutProgram; onPress: () => void; }
export const ProgramCard: React.FC<Props> = ({ program, onPress }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={[styles.iconWrap, { backgroundColor: program.iconColor + '1A' }]}>
        <Image source={program.icon} style={styles.icon} resizeMode="cover" />
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
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEF2F7',
    // shadow
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  iconWrap: { width: 56, height: 56, borderRadius: 14, marginRight: 16, overflow: 'hidden' },
  icon: { width: '100%', height: '100%' },
  title: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  days: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  chevron: { fontSize: 28, color: '#94A3B8', marginLeft: 8 }
});