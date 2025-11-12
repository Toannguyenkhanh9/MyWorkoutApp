import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

// Nhận params: { videoUrl: string, dayId: string }
export const WorkoutWebViewScreen: React.FC<any> = ({ route }) => {
  const { videoUrl, dayId } = route.params;
  const webRef = useRef<WebView>(null);
  const [ready, setReady] = useState(false);
  const [resume, setResume] = useState<number | null>(null);
  console.log(route.params);
  useEffect(() => {
    (async () => {
      const s = await AsyncStorage.getItem(`watch:${dayId}:sec`);
      if (s) setResume(parseFloat(s));
    })();
  }, [dayId]);

  // JS sẽ chạy trong trang embed để tìm thẻ <video> và gửi progress ra RN
  const injected = `
    (function(){
      function send(t){ window.ReactNativeWebView.postMessage(JSON.stringify(t)); }
      function hook(){
        var v = document.querySelector('video');
        if(!v){ setTimeout(hook, 1000); return; }
        send({ type:'found' });
        setInterval(function(){
          try{
            send({ type:'progress', currentTime: v.currentTime, duration: v.duration || 0 });
          }catch(e){}
        }, 2000);
        window.__seekTo = function(sec){ try{ v.currentTime = sec; }catch(e){} };
      }
      hook();
    })();
    true;
  `;

  const onMsg = async (e: any) => {
    try{
      const data = JSON.parse(e.nativeEvent.data);
      if (data.type === 'progress') {
        const cur = Math.floor(data.currentTime || 0);
        await AsyncStorage.setItem(`watch:${dayId}:sec`, String(cur));
      }
      if (data.type === 'found') setReady(true);
    }catch {}
  };

  const seekToResume = () => {
    if (resume != null) {
      webRef.current?.injectJavaScript(`window.__seekTo && window.__seekTo(${resume}); true;`);
    }
  };

  return (
    <View style={styles.container}>
      {resume != null && (
        <TouchableOpacity style={styles.resume} onPress={seekToResume}>
          <Text style={styles.resumeTxt}>⏯️ Resume at {Math.floor(resume/60)}′{resume%60}</Text>
        </TouchableOpacity>
      )}
      <WebView
        ref={webRef}
        source={{ uri: 'file:///android_asset/' + videoUrl }}
        injectedJavaScript={injected}
        onMessage={onMsg}
        allowsFullscreenVideo
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled
        domStorageEnabled
        style={{ flex:1, backgroundColor:'#000' }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#020817' },
  center:{ alignItems:'center', padding:12 },
  tip:{ color:'#9CA3AF', marginTop:6 },
  resume:{ backgroundColor:'#111827', padding:8, margin:8, borderRadius:8, alignSelf:'flex-start' },
  resumeTxt:{ color:'#F9FAFB', fontWeight:'700' }
});
