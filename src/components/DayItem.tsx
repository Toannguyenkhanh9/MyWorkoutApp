import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { WorkoutDay } from '../data/programs';

const WEEKDAYS_KEYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface Props { day: WorkoutDay; completed: boolean; onPress: () => void; }

export const DayItem: React.FC<Props> = ({ day, completed, onPress }) => {
  const { t } = useTranslation();
  const weekday = WEEKDAYS_KEYS[day.weekdayIndex];
  const isRest = !!day.isRest;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isRest}
      activeOpacity={isRest ? 1 : 0.7}
      style={[
        styles.container,
        isRest ? styles.rest : (completed && styles.completed)
      ]}
    >
      <View style={styles.left}>
        <Text style={[styles.dayTitle, isRest && styles.restTitle]}>
          {t('program.daysPrefix', { day: day.dayNumber, weekday })}
        </Text>
        <Text style={[styles.workoutName, isRest && styles.restText]}>
          {isRest ? t('workouts.rest') : `${day.name} • ${day.durationMin}’`}
        </Text>
      </View>

      {!isRest && completed && <Text style={styles.completedText}>✓</Text>}
      {isRest && <Text style={styles.restIcon}>🛌</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginBottom: 10,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEF2F7',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  completed: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0'
  },
  rest: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },
  left: { flex: 1 },
  dayTitle: { color: '#111827', fontWeight: '700', fontSize: 14 },
  restTitle: { color: '#334155' },
  workoutName: { color: '#6B7280', fontSize: 12, marginTop: 4 },
  restText: { color: '#94A3B8' },
  completedText: { color: '#059669', fontSize: 18, marginLeft: 8 },
  restIcon: { color: '#94A3B8', fontSize: 16, marginLeft: 8 }
});