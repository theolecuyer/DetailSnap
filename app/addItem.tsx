import { View, Text, Platform, FlatList, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const AddItemScreen = () => {
  const [image, setImage] = useState<string | null>(null);  // Place useState inside the component
  const router = useRouter();

  const useExisting = () => {
    // Logic for existing customer
  };

  const addPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const newCust = () => {
    router.push('/(customer)/makeCustomer');
  };

  return (
    <View style={{ padding: 10 }}>
      <Button onPress={useExisting} text="Use existing Customer" />
      <Button onPress={addPhoto} text="Add Customer" />
      <Button onPress={newCust} text="Add Customer" />
      <Button text="Add item" />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default AddItemScreen;
