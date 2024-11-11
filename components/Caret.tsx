import React, { useState, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

interface CaretProps {
    onPress?: (isDown: boolean) => void;
}

export default function Caret({ onPress }: CaretProps) {
  const [caretDown, setCaretDown] = useState(true);
  // const rotation = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    setCaretDown(prev => !prev);
    // Animated.timing(rotation, {
    //   toValue: caretDown ? 1 : 0,
    //   duration: 150,
    //   useNativeDriver: true,
    // }).start();

    //External handler if provided to the component
    if (onPress) {
      onPress(!caretDown);
    }
  };

  // const rotate = rotation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '-90deg'],
  // });

  return (
    <Pressable onPress={handlePress}>
      <Text style={styles.caret}>
        v
      </Text>
      {/* <Animated.Text style={[styles.caret, { transform: [{ rotate }] }]}>
        v
      </Animated.Text> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  caret: {
    fontSize: 24,
    padding: 6,
  },
});
