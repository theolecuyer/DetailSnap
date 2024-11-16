import { Link, Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import { supabase } from '@/lib/supabase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [authError, setAuthError] = useState(false);

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    //Reset error codes
    setAuthError(false);
    setEmailError(false);
    switch(error?.code) {
      case "invalid_credentials":
        setAuthError(true);
        break;
      case "validation_failed":
        setEmailError(true);
        break;
      default:
        setEmailError(false);
        setAuthError(false);
    }
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
      autoCapitalize='none'
      style={styles.textField}
      />
      <Text style={styles.errorText}>{emailError ? 'Please enter an email' : ''}</Text>
      <Text style={styles.fieldText}>Password</Text>
      <TextInput 
      value={password}
      onChangeText={setPassword}
      placeholder=''
      style={styles.textField}
      autoCapitalize='none'
      secureTextEntry
      />
      <Text style={styles.errorText}>{authError ? 'The email or password you entered is incorrect. Please try again.' : ''}</Text>
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
    backgroundColor: 'white',
    borderRadius: 5,
  },
  signUp: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
  }
})