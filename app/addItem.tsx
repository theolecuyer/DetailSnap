import { View, Text, Platform, FlatList, Pressable } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
import { Link, useRouter } from 'expo-router';

const useExisting = () => {

}



const AddItemScreen = () => {
    const router = useRouter();
    const newCust = () => {
        router.push('/(customer)/makeCustomer');
    }

    return (
        <View style={{padding: 10}}>
            <Button onPress={useExisting} text='Use existing Customer'/>
            <Button onPress={newCust} text='Add Customer'/>
            <Button text='Add item'/>
            <StatusBar style={Platform.OS == 'ios' ? 'light' : 'auto'}/>
        </View>
    );
};

export default AddItemScreen;