import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const WeeklyProgress = ({ done }: { done: number }) => {
  const total = 7;
  const pct = Math.max(0, Math.min(1, done / total));
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.label}>This week</Text>
        <Text style={styles.label}>{done}/{total}</Text>
      </View>
      <View style={styles.barWrap}>
        <View style={[styles.barFill, { width: `${pct * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection:'row', justifyContent:'space-between', marginBottom:6 },
  label: { color:'#D1D5DB', fontSize:12 },
  barWrap:{ height:10, backgroundColor:'#0f172a', borderRadius:999, overflow:'hidden' },
  barFill:{ height:'100%', backgroundColor:'#22C55E' }
});
