import {Image, StyleSheet, View} from 'react-native';
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
import Block from '@/components/common/Block';
import {MOOD_ICONS} from '@/helpers/moodIcons';

export default function MoodLoading() {
  const navigation = useNav();

  const currentMood = useCommonStore(state => state.currentMood);
  const label = MOOD_LABELS?.[currentMood] || 'Mystical night';

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(Screens.Mood_Meditation);
    }, 3000);
  }, []);

  return (
    <Container bg="mystical_night" isLogoHidden>
      <Block style={{flex: 1}}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 22,
            backgroundColor: '#9950E8',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 3,
            borderColor: '#fff',
          }}>
          {MOOD_ICONS?.[currentMood]}
        </View>
        <Title>Youre choosen: {label}</Title>

        <View>
          <Image source={require('@/assets/images/loading.png')} />
        </View>

        <View style={{marginTop: 0}}>
          <Button title="Wait..." variant="secondary" onPress={() => {}} />
        </View>

        <View style={{marginTop: 'auto'}}>
          <BottomBar />
        </View>
      </Block>
    </Container>
  );
}
