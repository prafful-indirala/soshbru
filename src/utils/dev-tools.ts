import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';

// Ignore all log notifications on the simulator
LogBox.ignoreAllLogs();

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'React Native Demo',
  })
  .useReactNative({
    asyncStorage: true, // Enable AsyncStorage debugging
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
    editor: false, // there are more options to editor
    errors: { veto: _stackFrame => false }, // or turn it off with false
    overlay: false, // just turning off overlay
  })
  .connect();
