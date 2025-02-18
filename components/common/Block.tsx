import {View, StyleProp, ViewStyle} from 'react-native';
import React from 'react';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Block({children, style}: Props) {
  return (
    <View
      style={[
        {
          marginTop: 'auto',
          marginHorizontal: -1,
          padding: 16,
          alignItems: 'center',
          gap: 12,
        },
        style,
      ]}>
      {children}
    </View>
  );
}
