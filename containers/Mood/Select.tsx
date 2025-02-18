import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import Container from '@/components/Container';
import Text from '@/components/common/Text';
import Bottom from '@/components/common/Bottom';
import Title from '@/components/common/Title';
import Button from '@/components/common/Button';
import {useNav} from '@/hooks/useNav';
import {Screens} from '@/models/nav';
import {useCommonStore} from '@/stores/commonStore';
import {Moods} from '@/models/common';
import BottomBar from '@/components/BottomBar';

import QuiteIcon from '@/assets/icons/mood/quite.svg';
import MysticalIcon from '@/assets/icons/mood/mystical.svg';
import StarryIcon from '@/assets/icons/mood/starry.svg';

const options = [
  {
    label: 'Quite moonlit evening',
    value: Moods.Quite,
    Icon: QuiteIcon,
  },
  {
    label: 'Mystical night',
    value: Moods.Mystical,
    Icon: MysticalIcon,
  },
  {
    label: 'Starry sky',
    value: Moods.Starry,
    Icon: StarryIcon,
  },
];

export default function MoodSelect() {
  const navigation = useNav();

  const currentMood = useCommonStore(state => state.currentMood);
  const setCurrentMood = useCommonStore(state => state.setCurrentMood);

  useLayoutEffect(() => {
    if (currentMood) {
      navigation.navigate(Screens.Mood_Loading);
    }
  }, []);

  return (
    <Container isLogoHidden>
      <View
        style={{
          marginTop: 'auto',
          marginHorizontal: -1,
          padding: 16,
          alignItems: 'center',
          gap: 12,
        }}>
        <Title>Choose your mood of the night:</Title>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12,
          }}>
          {options.map(({Icon, label, value}) => {
            const isSelected = currentMood === value;
            return (
              <TouchableOpacity
                onPress={() => setCurrentMood(value)}
                key={value}>
                <View style={[styles.item, isSelected && styles.selectedItem]}>
                  <Icon />
                  <Text
                    fw={isSelected ? 'bold' : 'semibold'}
                    style={{textAlign: 'center'}}>
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{marginTop: 24}}>
          <Button
            variant="secondary"
            title="Let's go!"
            onPress={() => navigation.navigate(Screens.Mood_Loading)}
          />
        </View>

        <BottomBar />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 128,
    height: 128,
    borderRadius: 22,
    backgroundColor: '#57A9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#9950E8',
  },
});
