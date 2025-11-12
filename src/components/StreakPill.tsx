import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const StreakPill = ({ streak }: { streak: number }) => (
  <View style={styles.pill}>
    <Text style={styles.txt}>🔥 {streak} day streak</Text>
  </View>
);
const styles = StyleSheet.create({
  pill:{ alignSelf:'flex-start', backgroundColor:'#111827', borderRadius:999, paddingHorizontal:12, paddingVertical:6, marginBottom:8 },
  txt:{ color:'#FDE68A', fontWeight:'700' }
});
