// FILE: src/store/activePrograms.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'active:programs'; // [{id:string,lastOpen:number}]

type Item = { id: string; lastOpen: number };

export async function getActiveIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const arr: Item[] = raw ? JSON.parse(raw) : [];
    return arr.sort((a,b)=>b.lastOpen-a.lastOpen).map(i=>i.id);
  } catch { return []; }
}

export async function markActive(id: string) {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const arr: Item[] = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const idx = arr.findIndex(x => x.id === id);
    if (idx >= 0) { arr[idx].lastOpen = now; }
    else { arr.push({ id, lastOpen: now }); }
    await AsyncStorage.setItem(KEY, JSON.stringify(arr));
  } catch {}
}

export async function unmarkActive(id: string) {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const arr: Item[] = raw ? JSON.parse(raw) : [];
    const next = arr.filter(x => x.id !== id);
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
}
