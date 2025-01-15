import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

import HomeIcon from '../assets/icons/home.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import {Screens} from '@/models/nav';
import {useRoute} from '@react-navigation/native';
import {useNav} from '@/hooks/useNav';

const options = [
  {
    Icon: HomeIcon,
    value: [
      Screens.Mood_Select,
      Screens.Mood_Loading,
      Screens.Mood_Timeline,
      Screens.Mood_Track,
      Screens.Mood_Finish,
    ],
    route: Screens.Mood_Select,
  },
  {
    Icon: ProfileIcon,
    value: [Screens.Profile],
    route: Screens.Profile,
  },
];

export default function BottomBar() {
  const nav = useNav();
  const route = useRoute();

  return (
    <View style={styles.bar}>
      {options.map(({Icon, value, route: ss}) => {
        const isSelected = value.includes(route.name);
        return (
          <TouchableOpacity onPress={() => nav.navigate(ss)} key={ss}>
            <View style={[styles.default, isSelected && styles.selected]}>
              <Icon color={isSelected ? '#fff' : '#57A9FF'} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    height: 67,
  },
  selected: {
    backgroundColor: '#57A9FF',
    borderRadius: 9999,
  },
  default: {
    height: 52,
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
