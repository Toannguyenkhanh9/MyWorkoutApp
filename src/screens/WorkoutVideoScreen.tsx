import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Video from 'react-native-video';
import { useTranslation } from 'react-i18next';

type RootStackParamList = {
  WorkoutVideo: {
    programId: string;
    dayId: string;
    videoUrl: string;
    sessionKey: string;
  };
};

type WorkoutVideoRouteProp = RouteProp<RootStackParamList, 'WorkoutVideo'>;

export const WorkoutVideoScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute<WorkoutVideoRouteProp>();
  const { videoUrl, sessionKey } = route.params;

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const height = (Dimensions.get('window').width * 9) / 16;

  return (
    <View style={styles.container}>
      {loading && !error && (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.label}>{t('video.loading')}</Text>
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text style={styles.error}>{t('video.error')}</Text>
        </View>
      )}

      {!error && (
        <Video
          source={{ uri: videoUrl }}
          style={[styles.video, { height }]}
          resizeMode="contain"
          controls
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}

      <Text style={styles.workoutName}>
        {t(`workouts.${sessionKey}`)}
      </Text>
      <Text style={styles.helper}>{t('video.play')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020817',
    padding: 16
  },
  center: {
    alignItems: 'center',
    marginTop: 40
  },
  label: {
    marginTop: 8,
    color: '#D1D5DB'
  },
  error: {
    color: '#FCA5A5'
  },
  video: {
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden'
  },
  workoutName: {
    marginTop: 16,
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '600'
  },
  helper: {
    marginTop: 4,
    color: '#9CA3AF',
    fontSize: 13
  }
});
