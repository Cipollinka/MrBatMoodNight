import {View, Animated, Easing} from 'react-native';
import React, {useEffect, useRef} from 'react';
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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
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
              marginBottom: 32,
              textAlign: 'center',
              fontFamily: 'Montserrat-Bold',
            }}>
            What inspires your nights?
          </Title>
          <Text
            style={{
              textAlign: 'center',
              maxWidth: 340,
              marginBottom: 20,
              lineHeight: 32,
              fontFamily: 'Montserrat-Medium',
              color: '#E8E8E8',
            }}
            fs={20}>
            ✨ Relaxation and calm
          </Text>
          <Text
            style={{
              textAlign: 'center',
              maxWidth: 340,
              marginBottom: 20,
              lineHeight: 32,
              fontFamily: 'Montserrat-Medium',
              color: '#E8E8E8',
            }}
            fs={20}>
            🌟 Mystical and magical vibes
          </Text>
          <Text
            style={{
              textAlign: 'center',
              maxWidth: 340,
              marginBottom: 20,
              lineHeight: 32,
              fontFamily: 'Montserrat-Medium',
              color: '#E8E8E8',
            }}
            fs={20}>
            🌙 Stories to drift away
          </Text>
        </Animated.View>

        <View
          style={{
            gap: 16,
            marginTop: 32,
            marginBottom: 8,
            marginHorizontal: 'auto',
          }}>
          <Button
            title="Next"
            onPress={() => navigation.navigate(Screens.Greetings_Third)}
          />
          <Button variant="link" title="Skip" onPress={skip} />
        </View>
      </Bottom>
    </Container>
  );
}
