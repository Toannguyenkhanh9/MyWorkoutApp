// FILE: src/screens/WeightChartScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { loadHistory } from '../weight/weightStore';
import { useTranslation } from 'react-i18next';

export const WeightChartScreen: React.FC = () => {
 const { t } = useTranslation();
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const hist = await loadHistory();
      setLabels(hist.map(h => h.dateISO.slice(5)));       // MM-DD
      setData(hist.map(h => h.kg));
    })();
  }, []);

  return (
    <View style={st.container}>
        <Text style={st.title}>{t('weight.chart_title')}</Text>
      {data.length === 0 ? (
  <Text style={st.caption}>{t('weight.chart_empty')}</Text>
      ) : (
        <LineChart
          data={{ labels, datasets: [{ data, strokeWidth: 2 }] }}
          width={Dimensions.get('window').width - 32}
          height={240}
          yAxisSuffix=" kg"
          fromZero
          withInnerLines
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            decimalPlaces: 1,
            color: (o) => `rgba(16, 185, 129, ${o.opacity ?? 1})`,
            labelColor: (o) => `rgba(100, 116, 139, ${o.opacity ?? 1})`,
            propsForDots: { r: '3' },
          }}
          bezier
          style={{ borderRadius: 12 }}
        />
      )}
    </View>
  );
};

const st = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7FB', padding: 16 },
  title: { fontSize: 22, fontWeight: '900', color: '#0F172A' },
  caption: { marginTop: 8, color: '#64748B' },
});

export default WeightChartScreen;
