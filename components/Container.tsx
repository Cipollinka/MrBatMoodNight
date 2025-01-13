import {useCommonStore} from '@/stores/commonStore';
import React, {useEffect} from 'react';
import {
  AppState,
  AppStateStatus,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const backgrounds = {
  greetings: require('@/assets/images/backgrounds/greetings-bg.png'),
  mystical_night: require('@/assets/images/backgrounds/mystical_night.png'),
  quite_moonlit: require('@/assets/images/backgrounds/quiet_moonlight.png'),
  starry_sky: require('@/assets/images/backgrounds/starry_sky.png'),
  meditation_mystical: require('@/assets/images/backgrounds/meditation_mystical.png'),
  meditation_quite: require('@/assets/images/backgrounds/meditation_quite.png'),
  meditation_starry: require('@/assets/images/backgrounds/meditation_starry.png'),
};

interface Props {
  children: React.ReactNode;
  bg?: keyof typeof backgrounds;
  ok?: boolean;
}

export default function Container({children, bg = 'greetings', ok}: Props) {
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
    <SafeAreaView style={styles.container}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={{
          width: 321,
          height: 100,
          marginHorizontal: 'auto',
          zIndex: 2,
          marginTop: ok ? 10 : 'auto',
        }}
      />
      <Image
        style={[
          StyleSheet.absoluteFill,
          {width: '100%', height: '104%', objectFit: 'fill'},
        ]}
        source={backgrounds[bg]}
      />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#022950', position: 'relative'},
});
