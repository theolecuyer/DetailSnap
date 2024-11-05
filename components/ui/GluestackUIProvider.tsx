// components/ui/GluestackUIProvider.tsx
import React from 'react';
import { GluestackUIProvider as Provider } from '@gluestack-ui/themed';

const GluestackUIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider>{children}</Provider>;
};

export default GluestackUIProvider;
