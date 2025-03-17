import {View} from 'react-native';
import React, {useEffect} from 'react';
import Container from '@/components/Container';
import BottomBar from '@/components/BottomBar';
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';
import {Moods} from '@/models/common';
import {useCommonStore} from '@/stores/commonStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bgToMood = {
  [Moods.Mystical]: 'bg',
  [Moods.Quite]: 'bg',
  [Moods.Starry]: 'bg',
};

export default function MoodFinish() {
  const currentMood = useCommonStore(state => state.currentMood);
  const setIsFinished = useCommonStore(state => state.setIsFinished);
  const setIsTodayFinished = useCommonStore(state => state.setIsTodayFinished);
  AsyncStorage.clear();
  useEffect(() => {
    setIsFinished(true);
    setIsTodayFinished(true);
  }, []);

  return (
    <Container ok bg={bgToMood[currentMood]}>
      <View
        style={{
          alignItems: 'center',
          marginTop: 120,
          gap: 16,
          paddingHorizontal: 24,
        }}>
        <Title
          style={{
            fontSize: 32,
            textAlign: 'center',
            fontFamily: 'Montserrat-Bold',
          }}>
          Good night!
        </Title>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Montserrat-Medium',
            color: '#E8E8E8',
          }}
          fw="bold"
          fs={24}>
          Bring back tomorrow!
        </Text>
      </View>

      <View
        style={{
          width: 220,
          marginHorizontal: 'auto',
          marginTop: 'auto',
          marginBottom: 60,
          paddingHorizontal: 20,
        }}>
        <BottomBar />
      </View>
    </Container>
  );
}
