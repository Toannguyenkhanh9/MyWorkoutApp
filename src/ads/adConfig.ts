export const ADMOB = {
  android: {
    appId: 'ca-app-pub-7270703936050310~4564431234', // TODO: App ID
    rewarded: __DEV__
      ? 'ca-app-pub-3940256099942544/5224354917' // test rewarded
      : 'ca-app-pub-3940256099942544/5224354917',
    banner: __DEV__
      ? 'ca-app-pub-3940256099942544/6300978111' // test banner
      : 'ca-app-pub-3940256099942544/6300978111',
  },
  ios: {
    appId: 'ca-app-pub-xxxxxxxxxxxxxxxx~zzzzzzzzzz', // TODO: App ID
    rewarded: __DEV__
      ? 'ca-app-pub-3940256099942544/1712485313' // test rewarded
      : 'ca-app-pub-xxxxxxxxxxxxxxxx/cccccccccc',
    banner: __DEV__
      ? 'ca-app-pub-3940256099942544/2934735716' // test banner
      : 'ca-app-pub-xxxxxxxxxxxxxxxx/dddddddddd',
  },
} as const;