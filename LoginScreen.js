import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


const AuthScreen = ({ setAuth }) => {

    const promptAsync = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if (isSuccessResponse(response)) {
              setState({ userInfo: response.data });
              setAuth(true);
            } else {
              // sign in was cancelled by user
            }
          } catch (error) {
            if (isErrorWithCode(error)) {
              switch (error.code) {
                case statusCodes.IN_PROGRESS:
                  // operation (eg. sign in) already in progress
                  break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                  // Android only, play services not available or outdated
                  break;
                default:
                // some other error happened
              }
            } else {
              // an error that's not related to google sign in occurred
            }
          }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login with Google</Text>
            <Button
                title="Sign in with Google"
                onPress={() => promptAsync()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
});

export default AuthScreen;
