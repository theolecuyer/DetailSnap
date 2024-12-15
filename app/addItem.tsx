import { View, Text, Platform, FlatList, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const AddItemScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const useExisting = () => {
    //TODO: Logic for existing customer
  };

  const updateDBPhoto = () => {
    
  }

  const addPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos", "livePhotos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera permissions are required to take a photo.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
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
      <Button onPress={newCust} text="Add Customer" />
      <Button onPress={addPhoto} text="Add Gallery photo" />
      <Button onPress={takePhoto} text="Take Photo" />
      <Button text="Add item" />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default AddItemScreen;
