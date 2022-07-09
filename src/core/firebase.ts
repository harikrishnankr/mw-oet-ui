import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyDT-vNjx5qpbmtZeOZwRGEfCk_6V-Ggdas",
  authDomain: "manglishworldoet.firebaseapp.com",
  projectId: "manglishworldoet",
  storageBucket: "manglishworldoet.appspot.com",
  messagingSenderId: "260838438297",
  appId: "1:260838438297:web:b64a049693fb1590034f08",
};
const YOUR_PUBLIC_VAPID_KEY_HERE =
  "BARRcVzKY884jGfp0Cfz7W48Ftk6yGAKPwveOEqeoXusCRpO-3FtSNIY1OflCPBH3RqkJs3P74sHdjDb8-Cp2o8";

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound: any) => {
    return getToken(messaging, {
        vapidKey: YOUR_PUBLIC_VAPID_KEY_HERE,
    })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(currentToken);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export function requestFirebasePermission(callback: (t: string) => any) {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // TODO(developer): Retrieve a registration token for use with FCM.
            // In many cases once an app has been granted notification permission,
            // it should update its UI reflecting this.
            fetchToken(callback);
        } else {
            console.log('Unable to get permission to notify.');
        }
    });
}
