# React Native Expo - Authentication with Google and Authentication with phone number
Expo authentication using google social and phone number sending the SMS validation
Both authentication methods will return a Firebase user.

The purpose of this repo is to leave it as a reference. All the domain methods that perform the authentication was extracted to domain files, keepind the components as clean as possible.

## Google
Open an webview to allow the user to select a Google account.

## Phone number
It will request a captcha validation and then it will send an SMS to the number.
After confirming the code it will authenticate the Firebase user.

Reference: https://medium.com/@thareekanvar/how-to-add-firebase-phone-number-authentication-in-expo-react-native-65645a641ce4
