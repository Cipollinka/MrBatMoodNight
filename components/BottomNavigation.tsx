import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import SunIcon from '@/assets/icon/sun.svg';
import InfoIcon from '@/assets/icon/info.svg';
import CameraIcon from '@/assets/icon/camera.svg';
import WalkIcon from '@/assets/icon/walk.svg';
import ProfileIcon from '@/assets/icon/profile.svg';
import {NavProp, Screens} from '@/models/nav';
import {useNavigation} from '@react-navigation/native';

const options = [
  {Icon: SunIcon, key: Screens.Home},
  {Icon: InfoIcon, key: Screens.Articles},
  {Icon: CameraIcon, key: Screens.Photo_mode},
  {Icon: WalkIcon, key: Screens.Walks_planner},
  {Icon: ProfileIcon, key: Screens.Profile},
];

export default function BottomNavigation() {
  const nav = useNavigation<NavProp>();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 40,
        backgroundColor: '#07427E',
        // width: '91%',
        marginTop: 'auto',
        margin: 16,
      }}>
      {options.map(({Icon, key}) => (
        <TouchableOpacity key={key} onPress={() => nav.navigate(key)}>
          <View>
            <Icon />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
