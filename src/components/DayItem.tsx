import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { WorkoutDay } from '../data/programs';

const WEEKDAYS_KEYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface Props {
  day: WorkoutDay;
  completed: boolean;
  onPress: () => void;
}

export const DayItem: React.FC<Props> = ({ day, completed, onPress }) => {
  const { t } = useTranslation();
  const weekday = WEEKDAYS_KEYS[day.weekdayIndex];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        completed && styles.completed
      ]}
    >
      <View style={styles.left}>
        <Text style={styles.dayTitle}>
          {t('program.daysPrefix', {
            day: day.dayNumber,
            weekday
          })}
        </Text>
        <Text style={styles.workoutName}>
          {t(`workouts.${day.sessionKey}`)}
        </Text>
      </View>
      {completed && (
        <Text style={styles.completedText}>
          ✓
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#111827',
    flexDirection: 'row',
    alignItems: 'center'
  },
  completed: {
    backgroundColor: '#065F46'
  },
  left: {
    flex: 1
  },
  dayTitle: {
    color: '#F9FAFB',
    fontWeight: '600',
    fontSize: 14
  },
  workoutName: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2
  },
  completedText: {
    color: '#BBF7D0',
    fontSize: 18,
    marginLeft: 8
  }
});
