import React from 'react';
import {Text as RNText, StyleSheet, TextStyle, StyleProp} from 'react-native';
import theme from '../theme';

interface TextProps {
  style?: StyleProp<TextStyle>;
  fw?: keyof typeof theme.typography.fontFamily;
  fs?: keyof typeof theme.typography.fontSize | number;
  color?: keyof typeof theme.colors | string;
  children: React.ReactNode;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

const Text = ({
  style,
  fw = 'regular',
  fs = 'base',
  color = 'text',
  children,
  ...props
}: TextProps) => {
  const fontSize = typeof fs === 'string' ? theme.typography.fontSize[fs] : fs;
  const textColor = color in theme.colors ? theme.colors[color as keyof typeof theme.colors] : color;

  return (
    <RNText
      style={[
        styles.text,
        {
          fontFamily: theme.typography.fontFamily[fw],
          fontSize,
          color: textColor,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    color: theme.colors.text,
  },
});

export default Text;
