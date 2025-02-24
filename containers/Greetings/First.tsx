import {View, Animated, Easing} from 'react-native';
import React, {useLayoutEffect, useEffect, useRef} from 'react';
import Container from '@/components/Container';
import Text from '@/components/common/Text';
import Bottom from '@/components/common/Bottom';
import Title from '@/components/common/Title';
import Button from '@/components/common/Button';
import {useNav} from '@/hooks/useNav';
import {Screens} from '@/models/nav';
import {useCommonStore} from '@/stores/commonStore';
import useSkip from '@/hooks/useSkip';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function First() {
  const navigation = useNav();
  const skip = useSkip();
  const isStartSkipped = useCommonStore(state => state.isStartSkipped);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  }, []);

  useLayoutEffect(() => {
    if (isStartSkipped) {
      navigation.navigate(Screens.Mood_Select);
    }
  }, [isStartSkipped]);

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
              marginBottom: 24,
              textAlign: 'center',
              fontFamily: 'Montserrat-Bold',
            }}>
            Welcome to Mr.Bat: Night Vibes
          </Title>
          <Text
            style={{
              textAlign: 'center',
              maxWidth: 340,
              lineHeight: 28,
              fontFamily: 'Montserrat-Medium',
              color: '#E8E8E8',
            }}
            fs={18}>
            🌙 Discover serenity under the stars. Let's embark on a magical
            journey to find your perfect nighttime harmony and peace.
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
            title="Get Started"
            onPress={() => navigation.navigate(Screens.Greetings_Second)}
          />
          <Button variant="link" title="Skip" onPress={skip} />
        </View>
      </Bottom>
    </Container>
  );
}
