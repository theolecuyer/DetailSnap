import { View, StyleSheet, TextInput, Text } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Button from '@/components/Button';

const AddCustomerScreen = () => {
    const router = useRouter();
    const [customerName, setcustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    return (
    <View style={styles.container}>
      <View style={styles.container2}>
      <View style= {{ flex:1 }}>
      <Text style={{ color: 'gray' }}>Customer Name</Text>
      <TextInput 
      value={customerName}
      onChangeText={setcustomerName}
      autoCapitalize='words'
      style={styles.inputText}
      />
      </View>
      <View style={{ flex: 1 }}>
      <Text style={{ color: 'gray' }}>Customer Phone</Text>
      <TextInput 
      value={customerPhone}
      onChangeText={setCustomerPhone}
      autoCapitalize='none'
      style={styles.inputText}
      keyboardType="phone-pad"
      />
      </View>
      </View>
      <Text style={{ color: 'gray' }}>Customer Email</Text>
      <TextInput 
      value={customerEmail}
      onChangeText={setCustomerEmail}
      placeholder="example@email.com"
      autoCapitalize='none'
      style={styles.inputText}
      />
      <Button text='Add Customer'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  container2 : {
    flexDirection: 'row',
  },
  inputText: {
     borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 5,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
  }
});

export default AddCustomerScreen;