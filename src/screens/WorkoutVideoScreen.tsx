import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { WebView } from 'react-native-webview';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';
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
  useKeepAwake();
  const { t } = useTranslation();
  const route = useRoute<WorkoutVideoRouteProp>();
  const { videoUrl, sessionKey } = route.params;
  console.log(route.params);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const height = (Dimensions.get('window').width * 9) / 16;

  return (
    <View style={styles.container}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        source={{ uri: 'file:///android_asset/' + videoUrl }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
      />
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
