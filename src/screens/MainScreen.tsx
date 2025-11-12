// FILE: src/screens/MainScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { PROGRAMS, WorkoutProgram } from '../data/programs';
import { ProgramCard } from '../components/ProgramCard';
import { AdBanner } from '../components/AdBanner';

const BG = require('../../assets/images/bg_main.jpg');

export const MainScreen: React.FC<any> = ({ navigation }) => {
  const { t } = useTranslation();
  const goProgram = (program: WorkoutProgram) =>
    navigation.navigate('ProgramDetail', { programId: program.id });

  return (
    <ImageBackground source={BG} style={styles.bg}>
      {/* Giữ chữ không chạm status bar */}
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.headingWrap}>
            <Text style={styles.appName}>{t('appName')}</Text>
            <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
          </View>

          <FlatList
            data={PROGRAMS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProgramCard program={item} onPress={() => goProgram(item)} />}
            contentContainerStyle={{ paddingTop: 8, paddingBottom: 12 }}
            showsVerticalScrollIndicator={false}
          />

          <AdBanner />
          <Text style={styles.footer}>{t('footer.devBy', { name: 'Kevin' })}</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16, paddingBottom: 12 },

  // Kéo title xuống, căn giữa, dàn chữ, có shadow để nổi trên ảnh
  headingWrap: { alignItems: 'center', marginTop: 8, marginBottom: 10 },
  appName: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.2,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#F3F4F6',
    marginTop: 6,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3
  },
  footer: {
    textAlign: 'center',
    color: '#E5E7EB',
    marginTop: 14,
    marginBottom: 8,
    fontSize: 12,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  }
});

export default MainScreen;
