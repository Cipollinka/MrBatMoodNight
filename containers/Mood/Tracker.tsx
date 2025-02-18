import {StyleSheet, TouchableOpacity, View} from 'react-native';
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

  const updateMoodTracker = useCommonStore(state => state.updateMoodTracker);

  const handleSave = () => {
    if (!tracker) return;

    updateMoodTracker(tracker);
    navigation.navigate(Screens.Mood_Finish);
  };

  return (
    <Container>
      <Block style={{marginVertical: 'auto'}}>
        <Title>Mood Tracker</Title>

        <Text
          fw="bold"
          fs={22}
          style={{maxWidth: 280, textAlign: 'center', marginTop: 0}}>
          How do you fell tonight?
        </Text>

        <View style={{marginTop: 0}} />

        {options.map(item => {
          const isSelected = tracker === item.value;
          return (
            <TouchableOpacity
              onPress={() => setTracker(item.value)}
              key={item.value}>
              <View style={[styles.item, isSelected && styles.selectedItem]}>
                <Text fw={isSelected ? 'bold' : 'semibold'}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={{marginTop: 24}}>
          <Button title="Save" onPress={handleSave} />
        </View>
      </Block>
    </Container>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 300,
    height: 58,
    borderRadius: 52,
    backgroundColor: '#57A9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#7EBD57',
  },
});
