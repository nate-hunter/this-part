import React, { useState, useEffect, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "./graphql/mutations";


/* Code from:  https://github.com/hasura/graphql-engine/blob/master/community/sample-apps/firebase-jwt/app/main.js
 * Adjusted to be used as a 'Provider' (AuthProvider) to pass auth data using 'Context'
 * Error handling removed b/c will be taken care of in 'signup' and 'login' pages
*/

const provider = new firebase.auth.GoogleAuthProvider();

export const AuthContext = createContext();

// Find these options in your Firebase console
firebase.initializeApp({
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    databaseURL: process.env.REACT_APP_databaseURL
});

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ status: "loading" });
    const [CreateUser] = useMutation(CREATE_USER);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async user => {
            if (user) {
                const token = await user.getIdToken();
                const idTokenResult = await user.getIdTokenResult();
                const hasuraClaim =
                    idTokenResult.claims["https://hasura.io/jwt/claims"];

                if (hasuraClaim) {
                    setAuthState({ status: "in", user, token });
                } else {
                    // Check if refresh is required.
                    const metadataRef = firebase
                        .database()
                        .ref("metadata/" + user.uid + "/refreshTime");

                    metadataRef.on("value", async (data) => {
                        if (!data.exists) return
                        // Force refresh to pick up the latest custom claims changes.
                        const token = await user.getIdToken(true);
                        setAuthState({ status: "in", user, token });
                    });
                }
            } else {
                setAuthState({ status: "out" });
            }
        });
    }, []);

    const signInWithGoogle = async () => {
        const userData = await firebase.auth().signInWithPopup(provider);

        if (userData.additionalUserInfo.isNewUser) {
            const username = `${userData.user.displayName.replace(/\s+/g, "")}${userData.user.uid.slice(-5)}`;

            const variables = {
                userId: userData.user.uid,
                fullname: userData.user.displayName,
                username,
                email: userData.user.email,
                bio: '',
                website: '',
                avatar: userData.user.photoURL
            }
            await CreateUser({ variables });
        }
    };

    const signUpWithEmailAndPassword = async formData => {
        const userData = await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password);
        const defaultUserImage = './data/images/pub-art-dog-00.jpeg';

        if (userData.additionalUserInfo.isNewUser) {
            console.log('user data:', userData);
            const variables = {
                userId: userData.user.uid,
                fullname: formData.fullname,
                username: formData.username,
                email: userData.user.email,
                bio: '',
                website: '',
                avatar: defaultUserImage
            }
            await CreateUser({ variables });
        }
    }

    const signOut = async () => {
        setAuthState({ status: "loading" });
        await firebase.auth().signOut();
        setAuthState({ status: "out" });
    };

    const loginWithEmailAndPassword = async (email, password) => {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        return user;
    }

    if (authState.status === 'loading') {
        return null;
    } else {
        return (
            <AuthContext.Provider value={{
                authState,
                signInWithGoogle,
                signUpWithEmailAndPassword,
                signOut,
                loginWithEmailAndPassword
            }}>
                {children}
            </AuthContext.Provider>
        )
    }
}

export default AuthProvider;