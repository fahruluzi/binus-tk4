import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';

import { auth } from './firebaseConfig';

const provider = new GoogleAuthProvider();

const AuthScreen = ({ setAuth }) => {

    const webClientId = "695556696842-8t2fimdp9h4v2r1bqds7msqfqgibor76.apps.googleusercontent.com";

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: webClientId,
        })
    }, [])


    const promptAsync = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("userinfo", userInfo);

            setAuth(true);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log(error)
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
