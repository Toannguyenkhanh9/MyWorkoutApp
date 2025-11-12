import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PROGRAMS, WorkoutProgram } from '../data/programs';
import { ProgramCard } from '../components/ProgramCard';
import { AdBanner } from '../components/AdBanner';

const BG = require('../../assets/images/bg_main.jpg');

export const MainScreen: React.FC<any> = ({ navigation }) => {
  const { t } = useTranslation();
  const goProgram = (program: WorkoutProgram) => navigation.navigate('ProgramDetail', { programId: program.id });

  return (
    <ImageBackground source={BG} style={styles.bg} imageStyle={{ opacity: 0.22 }}>
      <View style={styles.container}>
        <Text style={styles.appName}>{t('appName')}</Text>
        <Text style={styles.subtitle}>{t('home.subtitle')}</Text>

        <FlatList
          data={PROGRAMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (<ProgramCard program={item} onPress={() => goProgram(item)} />)}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 12 }}
          showsVerticalScrollIndicator={false}
        />

        <AdBanner />
        <Text style={styles.footer}>{t('footer.devBy', { name: 'Kevin' })}</Text>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#020817' },
  container: { flex: 1, padding: 16 },
  appName: { fontSize: 26, fontWeight: '800', color: '#F9FAFB' },
  subtitle: { fontSize: 13, color: '#B7C1D1', marginTop: 4 },
  footer: { textAlign: 'center', color: '#93A3B5', marginTop: 12, marginBottom: 8, fontSize: 12 }
});