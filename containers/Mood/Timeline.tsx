import {View, StyleSheet} from 'react-native';
import React, {useLayoutEffect} from 'react';
import Button from '@/components/common/Button';
import BottomBar from '@/components/BottomBar';
import {useNav} from '@/hooks/useNav';
import {Screens} from '@/models/nav';
import Title from '@/components/common/Title';
import {MOOD_LABELS} from '@/helpers/labels';
import {useCommonStore} from '@/stores/commonStore';
import Container from '@/components/Container';
import Text from '@/components/common/Text';
import Bottom from '@/components/common/Bottom';

import FinishIcon from '../../assets/icons/finish.svg';

const options = [
  // {
  //   label: 'Start Meditation',
  //   value: 1,
  // },
  // {
  //   label: 'Night story',
  //   value: 2,
  // },
  {
    label: 'Mood Tracker',
    value: 1,
  },
  {
    label: 'Go to sleep',
    value: 2,
  },
];

export default function MoodTimeline({route}: any) {
  const navigation = useNav();
  const step = route?.params?.step || 1;

  const currentMood = useCommonStore(state => state.currentMood);
  const isFinished = useCommonStore(state => state.isFinished);
  const currentStep = useCommonStore(state => state.currentStep);
  const setCurrentStep = useCommonStore(state => state.setCurrentStep);

  const label = MOOD_LABELS?.[currentMood] || 'Mystical night';

  useLayoutEffect(() => {
    if (currentStep <= step) {
      setCurrentStep(step);
    }
    if (isFinished) {
      navigation.navigate(Screens.Mood_Finish);
    }
  }, [isFinished, currentStep, step]);

  const getStepLabel = () => {
    switch (currentStep) {
      // case 1:
      //   return 'Start Meditation';
      // case 2:
      //   return 'Read night story';
      case 1:
        return 'Track your mood';
      default:
        return '';
    }
  };

  const handlePress = () => {
    switch (currentStep) {
      // case 1:
      //   navigation.navigate(Screens.Mood_Meditation);
      //   break;
      // case 2:
      //   navigation.navigate(Screens.Mood_NightStory);
      //   break;
      case 1:
        navigation.navigate(Screens.Mood_Track);
        break;
    }
  };

  return (
    <Container>
      <Bottom>
        <Title>{label}</Title>

        <View style={{gap: 12, marginTop: 10, position: 'relative'}}>
          <View
            style={{
              width: 1,
              height: 50,
              borderWidth: 1,
              borderStyle: 'dashed',
              position: 'absolute',
              borderColor: '#fff',
              top: 57,
              left: 28,
            }}
          />

          {options.map(item => {
            const isSelected = item.value === currentStep;
            const isFinish = item.value === 4;
            return (
              <View style={styles.container} key={item.value}>
                <View style={[styles.step, isSelected && styles.selected]}>
                  {isFinish && <FinishIcon />}
                  {!isFinish && (
                    <Text fw="semibold" fs={32} style={{color: '#57A9FF'}}>
                      {item.value}
                    </Text>
                  )}
                </View>

                <Text fw="semibold" fs={18}>
                  {item.label}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={{marginTop: 12}}>
          <Button title={getStepLabel()} onPress={handlePress} />
        </View>

        <BottomBar />
      </Bottom>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  step: {
    width: 58,
    height: 58,
    borderRadius: 9999,
    backgroundColor: '#5A718A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#fff',
  },
});
