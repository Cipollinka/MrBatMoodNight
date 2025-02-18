import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Text from './Text';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'link';
}

export default function Button({title, onPress, variant = 'primary'}: Props) {
  const isPrimary = variant === 'primary';
  const isLink = variant === 'link';
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.default, styles[variant]]}>
        <Text
          fw="semibold"
          fs={20}
          style={{color: isPrimary ? '#000' : isLink ? '#57A9FF' : '#fff'}}>
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
    backgroundColor: '#FFD21D',
  },
  secondary: {
    backgroundColor: '#57A9FF',
  },
  link: {
    backgroundColor: 'transparent',
  },
});
