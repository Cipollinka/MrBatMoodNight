import {View} from 'react-native';
import React, {useEffect} from 'react';
import Container from '@/components/Container';
import BottomBar from '@/components/BottomBar';
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';
import {Moods} from '@/models/common';
import {useCommonStore} from '@/stores/commonStore';

const bgToMood = {
  [Moods.Mystical]: 'meditation_mystical',
  [Moods.Quite]: 'meditation_quite',
  [Moods.Starry]: 'meditation_starry',
};

export default function MoodFinish() {
  const currentMood = useCommonStore(state => state.currentMood);
  const setIsFinished = useCommonStore(state => state.setIsFinished);

  useEffect(() => {
    setIsFinished(true);
  }, []);

  return (
    <Container ok bg={bgToMood[currentMood]}>
      <View style={{alignItems: 'center', marginTop: 100, gap: 8}}>
        <Title>Good night!</Title>
        <Text fw="bold" fs={22}>
          Bring back tomorrow!
        </Text>
      </View>

      <View
        style={{
          width: 193,
          marginHorizontal: 'auto',
          marginTop: 'auto',
          marginBottom: 50,
        }}>
        <BottomBar />
      </View>
    </Container>
  );
}
