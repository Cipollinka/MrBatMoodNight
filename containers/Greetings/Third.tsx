import {View} from 'react-native';
import React from 'react';
import Container from '@/components/Container';
import Text from '@/components/common/Text';
import Bottom from '@/components/common/Bottom';
import Title from '@/components/common/Title';
import Button from '@/components/common/Button';
import useSkip from '@/hooks/useSkip';

export default function Third() {
  const skip = useSkip();

  return (
    <Container>
      <Bottom>
        <Title>Your nocturnal companion</Title>
        <Text
          style={{
            textAlign: 'center',
            maxWidth: 300,
            textDecorationStyle: 'dotted',
          }}
          fs={17}>
          • Mr. Bat will guide you through nightly stories, meditations, and
          reflections for a peaceful night.
        </Text>

        <View style={{gap: 8, marginTop: 8, marginBottom: 0}}>
          <Button title="Let's Begin" onPress={skip} />
          <Button variant="link" title="Skip" onPress={skip} />
        </View>
      </Bottom>
    </Container>
  );
}
