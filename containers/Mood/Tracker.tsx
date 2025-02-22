import {StyleSheet, TouchableOpacity, View, Animated} from 'react-native';
import React, {useState} from 'react';
import Container from '@/components/Container';
import Text from '@/components/common/Text';
import Bottom from '@/components/common/Bottom';
import Title from '@/components/common/Title';
import Button from '@/components/common/Button';
import {useNav} from '@/hooks/useNav';
import {Screens} from '@/models/nav';
import {useCommonStore} from '@/stores/commonStore';
import {Tracker} from '@/models/common';
import Block from '@/components/common/Block';

const options = [
  {
    label: 'Nice',
    value: Tracker.Nice,
  },
  {
    label: 'Normal',
    value: Tracker.Normal,
  },
  {
    label: 'Terrible',
    value: Tracker.Terrible,
  },
];

export default function MoodTracker() {
  const navigation = useNav();
  const [tracker, setTracker] = useState<Tracker | null>(null);
  const [scaleAnim] = useState(() => options.map(() => new Animated.Value(1)));

  const updateMoodTracker = useCommonStore(state => state.updateMoodTracker);

  const handleOptionPress = (value: Tracker, index: number) => {
    Animated.sequence([
      Animated.timing(scaleAnim[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
    setTracker(value);
  };

  const handleSave = () => {
    if (!tracker) return;
    updateMoodTracker(tracker);
    navigation.navigate(Screens.Mood_Finish);
  };

  return (
    <Container>
      <Block style={{marginVertical: 'auto', alignItems: 'center'}}>
        <Title style={styles.title}>Mood Tracker</Title>

        <Text
          fw="bold"
          fs={22}
          style={styles.subtitle}>
          How do you feel tonight?
        </Text>

        <View style={styles.optionsContainer}>
          {options.map((item, index) => {
            const isSelected = tracker === item.value;
            return (
              <Animated.View
                key={item.value}
                style={{
                  transform: [{ scale: scaleAnim[index] }]
                }}>
                <TouchableOpacity
                  onPress={() => handleOptionPress(item.value, index)}
                  activeOpacity={0.8}>
                  <View style={[styles.item, isSelected && styles.selectedItem]}>
                    <Text 
                      fw={isSelected ? 'bold' : 'semibold'}
                      style={[styles.itemText, isSelected && styles.selectedItemText]}>
                      {item.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title="Save" 
            onPress={handleSave}
            variant={tracker ? 'primary' : 'secondary'} 
          />
        </View>
      </Block>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    fontSize: 32,
  },
  subtitle: {
    maxWidth: 280,
    textAlign: 'center',
    marginBottom: 32,
    color: '#E8E8E8'
  },
  optionsContainer: {
    gap: 16,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 32,
  },
  item: {
    width: 300,
    height: 58,
    borderRadius: 52,
    backgroundColor: 'rgba(87, 169, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedItem: {
    backgroundColor: '#7EBD57',
    borderColor: '#fff',
  },
  itemText: {
    color: '#fff',
    fontSize: 18,
  },
  selectedItemText: {
    color: '#fff',
  },
});
