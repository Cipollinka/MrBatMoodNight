import {View, Animated, Easing} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Container from '@/components/Container';
import Text from '@/components/common/Text';
import Bottom from '@/components/common/Bottom';
import Title from '@/components/common/Title';
import Button from '@/components/common/Button';
import useSkip from '@/hooks/useSkip';

export default function Third() {
  const skip = useSkip();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  }, []);

  return (
    <Container>
      <Bottom>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
            paddingHorizontal: 24,
            alignItems: 'center',
          }}>
          <Title
            style={{
              fontSize: 32,
              marginBottom: 28,
              textAlign: 'center',
              fontFamily: 'Montserrat-Bold',
            }}>
            Your nocturnal companion
          </Title>
          <Text
            style={{
              textAlign: 'center',
              maxWidth: 340,
              lineHeight: 28,
              marginBottom: 24,
              fontFamily: 'Montserrat-Medium',
              color: '#E8E8E8',
              marginTop: 10,
            }}
            fs={18}>
            🦇 Mr. Bat will guide you through nightly stories, meditations, and
            reflections for a peaceful night.
          </Text>
        </Animated.View>

        <View
          style={{
            gap: 16,
            marginTop: 32,
            marginBottom: 8,
            marginHorizontal: 'auto',
          }}>
          <Button title="Let's Begin" onPress={skip} />
          <Button variant="link" title="Skip" onPress={skip} />
        </View>
      </Bottom>
    </Container>
  );
}
