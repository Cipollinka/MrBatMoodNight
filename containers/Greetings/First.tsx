import {View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import Container from '@/components/Container';
import Text from '@/components/common/Text';
import Bottom from '@/components/common/Bottom';
import Title from '@/components/common/Title';
import Button from '@/components/common/Button';
import {useNav} from '@/hooks/useNav';
import {Screens} from '@/models/nav';
import {useCommonStore} from '@/stores/commonStore';
import useSkip from '@/hooks/useSkip';

export default function First() {
  const navigation = useNav();
  const skip = useSkip();
  const isStartSkipped = useCommonStore(state => state.isStartSkipped);

  useLayoutEffect(() => {
    if (isStartSkipped) {
      navigation.navigate(Screens.Mood_Select);
    }
  }, [isStartSkipped]);

  return (
    <Container>
      <Bottom>
        <Title>Welcome to Mr.Bat: Night Vibes</Title>
        <Text style={{textAlign: 'center', maxWidth: 300}} fs={17}>
          Discover serenity under the stars. Let’s create the perfect nighttime
          mood together.
        </Text>

        <View style={{gap: 8, marginTop: 8, marginBottom: 0}}>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate(Screens.Greetings_Second)}
          />
          <Button variant="link" title="Skip" onPress={skip} />
        </View>
      </Bottom>
    </Container>
  );
}
