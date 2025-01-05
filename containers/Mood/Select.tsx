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

const options = [
  {
    label: 'Quite moonlit evening',
    value: Moods.Quite,
  },
  {
    label: 'Mystical night',
    value: Moods.Mystical,
  },
  {
    label: 'Starry sky',
    value: Moods.Starry,
  },
];

export default function MoodSelect() {
  const navigation = useNav();

  const currentMood = useCommonStore(state => state.currentMood);
  const setCurrentMood = useCommonStore(state => state.setCurrentMood);

  useLayoutEffect(() => {
    if (currentMood) {
      navigation.navigate(Screens.Mood_Timeline);
    }
  }, []);

  return (
    <Container>
      <Bottom>
        <Title>Choose your mood of the night:</Title>

        <View style={{marginTop: 24}} />

        {options.map(item => {
          const isSelected = currentMood === item.value;
          return (
            <TouchableOpacity
              onPress={() => setCurrentMood(item.value)}
              key={item.value}>
              <View style={[styles.item, isSelected && styles.selectedItem]}>
                <Text fw={isSelected ? 'bold' : 'semibold'}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={{marginTop: 24}}>
          <Button
            title="Let's go!"
            onPress={() => navigation.navigate(Screens.Mood_Loading)}
          />
        </View>

        <BottomBar />
      </Bottom>
    </Container>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 300,
    height: 58,
    borderRadius: 52,
    backgroundColor: '#57A9FF33',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    borderWidth: 3,
    borderColor: '#57A9FF',
  },
});
