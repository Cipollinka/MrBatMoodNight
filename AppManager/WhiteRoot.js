import React, {useEffect} from 'react';
import {AppState} from 'react-native';
import Navigation from '../components/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useCommonStore} from '../stores/commonStore';

function WhiteRoot() {
  const checkDayChange = useCommonStore(state => state.checkDayChange);

  useEffect(() => {
    checkDayChange();

    const handleAppStateChange = (nextAppState) => {
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

export default WhiteRoot;
