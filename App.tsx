import React, {useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import Navigation from './components/Navigation';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useCommonStore} from './stores/commonStore';

function App(): React.JSX.Element {
  const checkDayChange = useCommonStore(state => state.checkDayChange);

  useEffect(() => {
    checkDayChange();

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        checkDayChange();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [checkDayChange]);

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
AppRegistry.registerComponent(appName, () => App);

export default App;
