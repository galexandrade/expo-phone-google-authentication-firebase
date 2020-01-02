import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';

export const signInWithGoogle = async () => {
    try {
        console.log(1);
        const result = await Google.logInAsync({
            behavior: 'web',
            androidClientId:
                '651727288805-2gkt78sqnrdakga7skkg7bar5mu7a954.apps.googleusercontent.com',
            //iosClientId: YOUR_CLIENT_ID_HERE,
            scopes: ['profile', 'email']
        });
        console.log(2);

        if (result.type === 'success') {
            console.log(3);
            onSignIn(result);
            return result.accessToken;
        } else {
            console.log(4);
            return { cancelled: true };
        }
    } catch (e) {
        console.log(5, e);
        return { error: true };
    }
};

const onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase
        .auth()
        .onAuthStateChanged(function(firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                console.log(googleUser);
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );
                // Sign in with credential from the Google user.
                firebase
                    .auth()
                    .signInWithCredential(credential)
                    .then(() => {
                        console.log('User signed in');
                    })
                    .catch(function(error) {
                        console.log('ERROR', error.message);
                        // Handle Errors here.
                        //var errorCode = error.code;
                        //var errorMessage = error.message;
                        // The email of the user's account used.
                        //var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        //var credential = error.credential;
                        // ...
                    });
            } else {
                console.log('User already signed-in Firebase.');
            }
        });
};

const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (
                providerData[i].providerId ===
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()
            ) {
                // We don't need to reauth the Firebase connection.
                return true;
            }
        }
    }
    return false;
};

export const logout = () => {
    return firebase.auth().signOut();
};
