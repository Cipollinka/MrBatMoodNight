import {View, TouchableOpacity, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import React from 'react';
import Text from './Text';
import theme from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'link';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isLink = variant === 'link';

  const getTextColor = () => {
    if (disabled) return theme.colors.text + '80';
    if (isPrimary) return theme.colors.background;
    if (isLink) return theme.colors.link;
    return theme.colors.text;
  };

  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled}
      style={[styles.wrapper, disabled && styles.disabled]}
    >
      <View style={[styles.default, styles[variant], style]}>
        <Text
          fw="semibold"
          fs={theme.typography.fontSize.xl}
          style={[{color: getTextColor()}, textStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  default: {
    borderRadius: theme.borderRadius.full,
    width: 300,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  link: {
    backgroundColor: 'transparent',
  },
});
