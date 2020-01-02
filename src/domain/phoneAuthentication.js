//@flow
import { Linking } from 'expo';
import * as firebase from 'firebase';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

const captchaUrl = `https://point2gallery.firebaseapp.com/captcha.html?appurl=${Linking.makeUrl(
    ''
)}`;

export const signInWithPhoneNumber = async (phone: string) => {
    const sendSMSPromise = new Promise((resolve, reject) => {
        Linking.addEventListener(
            'url',
            sendSMSCode.bind(null, phone, resolve, reject)
        );
    });

    await WebBrowser.openBrowserAsync(captchaUrl);
    //Linking.removeEventListener('url', listener);
    return sendSMSPromise;
};

const sendSMSCode = async (phone: string, resolve, reject, { url }) => {
    Platform.OS === 'ios' && WebBrowser.dismissBrowser();

    const tokenEncoded = Linking.parse(url).queryParams['token'];
    if (tokenEncoded) {
        const token = decodeURIComponent(tokenEncoded);
        //fake firebase.auth.ApplicationVerifier
        const captchaVerifier = {
            type: 'recaptcha',
            verify: () => Promise.resolve(token)
        };
        try {
            const confirmationResult = await firebase
                .auth()
                .signInWithPhoneNumber(phone, captchaVerifier);

            resolve(async (smsCode: string) => {
                try {
                    await confirmationResult.confirm(smsCode);
                } catch (e) {
                    console.warn(e);
                }
            });
        } catch (e) {
            reject(e);
        }
    }
};
