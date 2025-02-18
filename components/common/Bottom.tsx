import {View, Text} from 'react-native';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Bottom({children}: Props) {
  return (
    <View
      style={{
        // position: 'absolute',
        // bottom: 0,
        // left: -1,
        // right: -1,
        marginTop: 'auto',
        marginHorizontal: -1,
        padding: 16,
        borderTopRightRadius: 42,
        borderTopLeftRadius: 42,
        backgroundColor: '#0A3068',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#57A9FF',
        alignItems: 'center',
        gap: 12,
        paddingTop: 36,
      }}>
      {children}
    </View>
  );
}
