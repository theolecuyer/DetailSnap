import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { createGroupFolder } from '@/api/photos';

const SignUpScreen = () => {
  //Auth states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  //User info states
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [company, setCompany] = useState('');
  
  //Supabase errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  //User input errors
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [accountExistsError, setAccountExistsError] = useState(false);  

  //Get the refreshAuth function from the Auth Provider
  const { refreshAuth } = useAuth();
  async function signUpWithEmail() {
    //Set errors initially to use outside states for checking
    const isFirstnameValid = firstname.length > 0;
    const isLastnameValid = lastname.length > 0;
    const isCompanyValid = company.length > 0;
    setFirstnameError(!isFirstnameValid);
    setLastnameError(!isLastnameValid);
    setCompanyError(!isCompanyValid);
    if(!isFirstnameValid || !isLastnameValid || !isCompanyValid) {
      return;
    }

    setLoading(true)

    //Sign up the user and create their profile
    const { data: user, error } = await supabase.auth.signUp({
      email, password, 
      options: {
       data: {
         first_name: firstname,
         last_name: lastname,
         //avatar_url: '',
       }
      }
   })
   //Reset supabase error codes
   setPasswordError(false);
   setEmailError(false);
   setCompanyError(false);
   setAccountExistsError(false);
   if(error) {
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
      case "user_already_exists":
        setAccountExistsError(true);
        break;
      default:
        setEmailError(false);
        setPasswordError(false);
    }
    setLoading(false);
    return;
  }

    //Create a group. TODO: allow user to create new group or request to join current
    const { data: newGroup, error: newGroupError } = await supabase
    .from('groups')
    .insert({ name: company, logo: '', creator: user.user?.id})
    .select()
    .single();

    if (newGroupError) {
      setLoading(false);
      Alert.alert(newGroupError.code);
      console.error(newGroupError);
      return;
    }
    

    //Add group owner to the group. TODO: Differentiate between owners/employees
    if (user.user?.id) {
    const { error: groupUpdateError } = await supabase
      .from('profiles')
      .update({ group_id: newGroup.id})
      .eq('id', user.user?.id);
    
    if (groupUpdateError) {
      Alert.alert('Failed to associate user with the group. Please try again.');
    }
    }
    const groupCreated = await createGroupFolder(newGroup.id);
    if(!groupCreated) {
      Alert.alert('Failed to create group storage folder');
      //Handle future SignUp Auth error handling
    }
    await refreshAuth();
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign up' }} />
      <Text style={styles.label}>First Name</Text>
      <TextInput
        value={firstname}
        onChangeText={setFirstname}
        style={styles.input}
        autoCapitalize = 'words'
      />
      <Text style={firstnameError ? styles.errorText : styles.blankText}>Please enter a First Name</Text>

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        value={lastname}
        onChangeText={setLastname}
        style={styles.input}
        autoCapitalize = 'words'
      />
      <Text style={lastnameError ? styles.errorText : styles.blankText}>Please enter a Last Name</Text>

      <Text style={styles.label}>Company Name</Text>
      <TextInput
        value={company}
        onChangeText={setCompany}
        autoCapitalize='words'
        style={styles.input}
      />
      <Text style={companyError ? styles.errorText : styles.blankText}>Please enter a valid email</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="example@email.com"
        autoCapitalize='none'
        style={styles.input}
      />
      <Text style={emailError ? styles.errorText : styles.blankText}>Please enter a valid email</Text>

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        autoCapitalize='none'
        secureTextEntry
      />
      <Text style={passwordError ? styles.errorText : styles.blankText}>Password must contain:6 letters</Text>
      <Text style={accountExistsError ? styles.errorText : styles.blankText}>Account Exists</Text>

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
    paddingBottom: 5
  },
  blankText: {
    color: 'rgb(242, 242, 242)',
    fontSize: 10,
    paddingBottom: 5
  }
});

export default SignUpScreen;