// LoginScreen.js
import React, { useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from './firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);

      auth.signInWithCredential(credential).then(() => {
        navigation.navigate('Home');
      }).catch(error => {
        console.error('Error signing in:', error.message);
      });
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login with Google</Text>
      <Button disabled={!request} title="Sign in with Google" onPress={() => promptAsync()} />
    </View>
  );
}
