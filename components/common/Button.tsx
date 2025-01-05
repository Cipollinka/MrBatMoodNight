import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Text from './Text';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({title, onPress, variant = 'primary'}: Props) {
  const isPrimary = variant === 'primary';
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.default, styles[variant]]}>
        <Text
          fw="semibold"
          fs={20}
          style={{color: isPrimary ? '#fff' : '#57A9FF'}}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    borderRadius: 52,
    width: 300,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: '#57A9FF',
  },
  secondary: {
    backgroundColor: 'transparent',
  },
});
