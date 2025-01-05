import {View} from 'react-native';
import React from 'react';
import Container from '@/components/Container';
import Text from '@/components/common/Text';
import Bottom from '@/components/common/Bottom';
import Title from '@/components/common/Title';
import Button from '@/components/common/Button';
import {useNav} from '@/hooks/useNav';
import {Screens} from '@/models/nav';
import useSkip from '@/hooks/useSkip';

export default function Second() {
  const navigation = useNav();
  const skip = useSkip();

  return (
    <Container>
      <Bottom>
        <Title>What inspires your nights?</Title>
        <Text
          style={{
            textAlign: 'center',
            maxWidth: 300,
            textDecorationStyle: 'dotted',
          }}
          fs={17}>
          • Relaxation and calm
        </Text>
        <Text
          style={{textAlign: 'center', maxWidth: 300, marginTop: -12}}
          fs={17}>
          • Mystical and magical vibes
        </Text>
        <Text
          style={{textAlign: 'center', maxWidth: 300, marginTop: -12}}
          fs={17}>
          • Stories to drift away
        </Text>

        <View style={{gap: 8, marginTop: 8, marginBottom: 0}}>
          <Button
            title="Next"
            onPress={() => navigation.navigate(Screens.Greetings_Third)}
          />
          <Button variant="secondary" title="Skip" onPress={skip} />
        </View>
      </Bottom>
    </Container>
  );
}
