import { View, Text, Platform, FlatList } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';

const AddItemScreen = () => {

    return (
        <View style={{padding: 10}}>
            <Button text='Add item'/>
            <StatusBar style={Platform.OS == 'ios' ? 'light' : 'auto'}/>
        </View>
    );
};

export default AddItemScreen;