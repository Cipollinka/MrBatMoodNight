import React from 'react';
import {Text as RNText, StyleSheet, TextStyle, StyleProp} from 'react-native';

const fontWeights = {
  black: 'Montserrat-Black',
  bold: 'Montserrat-Bold',
  extrabold: 'Montserrat-ExtraBold',
  light: 'Montserrat-Light',
  medium: 'Montserrat-Medium',
  regular: 'Montserrat-Regular',
  semibold: 'Montserrat-SemiBold',
};

const Text = ({
  style,
  fw = 'regular',
  fs = 16,
  ...props
}: {
  style?: StyleProp<TextStyle>;
  fw?: keyof typeof fontWeights;
  fs?: number;
  children: React.ReactNode;
}) => {
  return (
    <RNText
      style={[
        styles.text,
        style,
        {fontFamily: fontWeights[fw], fontSize: fs || 16},
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
});

export default Text;
