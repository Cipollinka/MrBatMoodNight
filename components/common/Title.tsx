import React from 'react';
import Text from './Text';

export default function Title({children}: {children: React.ReactNode}) {
  return (
    <Text fw="black" fs={24} style={{textAlign: 'center', maxWidth: 300}}>
      {children}
    </Text>
  );
}
