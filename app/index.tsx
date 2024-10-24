import { View, Text } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link } from 'expo-router';

const index = () => {
  return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <Link href={'/(tabs)'} asChild>
          <Button text="Main Screen" />
        </Link>
        <Link href={'/sign_in'} asChild>
          <Button text="Sign in screen" />
        </Link>
      </View>
  );
};

export default index;