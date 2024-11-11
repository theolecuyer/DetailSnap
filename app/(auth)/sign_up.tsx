import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    //Reset error codes
    console.log(error?.code);
    setPasswordError(false);
    setEmailError(false);
    switch(error?.code) {
      case "anonymous_provider_disabled":
        setEmailError(true);
        break;
      case "validation_failed":
        setEmailError(true);
        break;
      case "weak_password":
        setPasswordError(true);
        break;
      default:
        setEmailError(false);
        setPasswordError(false);
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign up' }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="example@email.com"
        style={styles.input}
      />
      <Text style={styles.errorText}>{emailError ? 'Please enter a valid email' : ''}</Text>

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />
      <Text style={styles.errorText}>{passwordError ? 'Password must contain:\n6 letters' : ''}</Text>

      <Button onPress={signUpWithEmail} disabled={loading} text={loading ? 'Creating account...' : 'Create account'} />
      <Link href="/sign_in" style={styles.textButton}>
        Sign in
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
  }
});

export default SignUpScreen;