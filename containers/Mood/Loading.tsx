import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Container from '@/components/Container';
import Text from '@/components/common/Text';
import Bottom from '@/components/common/Bottom';
import Title from '@/components/common/Title';
import Button from '@/components/common/Button';
import {useNav} from '@/hooks/useNav';
import {Screens} from '@/models/nav';
import {useCommonStore} from '@/stores/commonStore';
import BottomBar from '@/components/BottomBar';
import {MOOD_LABELS} from '@/helpers/labels';

export default function MoodLoading() {
  const navigation = useNav();

  const currentMood = useCommonStore(state => state.currentMood);
  const label = MOOD_LABELS?.[currentMood] || 'Mystical night';

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(Screens.Mood_Timeline, {step: 1});
    }, 3000);
  }, []);

  return (
    <Container bg="mystical_night">
      <Bottom>
        <Title>Youre choosen: {label}</Title>

        <Text>Choosing content for you...</Text>

        <View style={{marginTop: 24}}>
          <Button title="Wait..." onPress={() => {}} />
        </View>

        <BottomBar />
      </Bottom>
    </Container>
  );
}
