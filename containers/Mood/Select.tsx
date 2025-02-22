import {StyleSheet, TouchableOpacity, View, Animated} from 'react-native';
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

interface MoodOption {
  label: string;
  value: Moods;
  Icon: React.FC<{
    width?: number;
    height?: number;
    color?: string;
  }>;
}

const options: MoodOption[] = [
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
  const isTodayFinished = useCommonStore(state => state.isTodayFinished);

  const [scaleAnim] = React.useState(() =>
    options.map(() => new Animated.Value(1)),
  );

  const handlePress = (value: Moods, index: number) => {
    Animated.sequence([
      Animated.timing(scaleAnim[index], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setCurrentMood(value);
  };

  useLayoutEffect(() => {
    if (isTodayFinished) {
      navigation.navigate(Screens.Mood_Finish);
    } else if (currentMood) {
      navigation.navigate(Screens.Mood_Loading);
    }
  }, [currentMood, navigation]);

  return (
    <Container isLogoHidden>
      <View style={styles.container}>
        <Title>Choose your mood of the night:</Title>

        <View style={styles.optionsContainer}>
          {options.map(({Icon, label, value}, index) => {
            const isSelected = currentMood === value;
            return (
              <Animated.View
                key={value}
                style={{
                  transform: [{scale: scaleAnim[index]}],
                }}>
                <TouchableOpacity
                  onPress={() => handlePress(value, index)}
                  activeOpacity={0.8}>
                  <View
                    style={[styles.item, isSelected && styles.selectedItem]}>
                    <Icon
                      width={48}
                      height={48}
                      color={isSelected ? '#fff' : '#333'}
                    />
                    <Text
                      fw={isSelected ? 'bold' : 'semibold'}
                      style={[
                        styles.itemText,
                        isSelected && styles.selectedItemText,
                      ]}>
                      {label}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <View style={styles.buttonContainer}>
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
  container: {
    flex: 1,
    marginTop: 60,
    padding: 16,
    alignItems: 'center',
    gap: 32,
  },
  container: {
    marginTop: 'auto',
    marginHorizontal: -1,
    padding: 16,
    alignItems: 'center',
    gap: 12,
  },
  optionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  buttonContainer: {
    marginTop: 24,
  },
  item: {
    width: 140,
    height: 140,
    borderRadius: 24,
    backgroundColor: '#E8F1FF',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedItem: {
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#9950E8',
  },
  itemText: {
    textAlign: 'center',
    color: '#333',
    marginTop: 8,
  },
  selectedItemText: {
    color: '#fff',
  },
});
