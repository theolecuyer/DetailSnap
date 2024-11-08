import { Link, Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import { supabase } from '@/lib/supabase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign in' }} />
      <Text style={styles.fieldText}>Email</Text>
      <TextInput 
      value={email}
      onChangeText={setEmail}
      placeholder="example@email.com"
      style={styles.textField}
      />
      <Text style={styles.fieldText}>Password</Text>
      <TextInput 
      value={password}
      onChangeText={setPassword}
      placeholder=''
      style={styles.textField}
      secureTextEntry
      />
      
      <Button onPress={signInWithEmail} disabled={loading} text={loading ? 'Signing in...' : 'Sign in'}/>
      <Link href="/sign_up" style={styles.signUp}>
        Create an account
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  fieldText: {
    color: 'gray'
  },
  textField: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  signUp: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
})