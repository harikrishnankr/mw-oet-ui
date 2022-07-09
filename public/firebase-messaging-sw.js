importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyDT-vNjx5qpbmtZeOZwRGEfCk_6V-Ggdas",
    authDomain: "manglishworldoet.firebaseapp.com",
    projectId: "manglishworldoet",
    storageBucket: "manglishworldoet.appspot.com",
    messagingSenderId: "260838438297",
    appId: "1:260838438297:web:b64a049693fb1590034f08",
    measurementId: "G-7SDHR8LBDC"
}

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

    // const notificationTitle = payload.notification.title;
    // const notificationOptions = {
    //     body: payload.notification.body,
    // };

    // self.registration.showNotification(notificationTitle, notificationOptions);
    try {
        const notificationOption = {
            body: payload.data.body,
            icon: payload.data.icon || payload.data.image,
            image: payload.data.image,
            badge: payload.data.icon,
            data: { ...payload.data },
            requireInteraction: true,
            tag: 'notification-1' // identify the  notification  avoid duplicate messages
        };
        const bc = new BroadcastChannel('test_channel');
        bc.postMessage(payload);
        return self.registration.showNotification(payload.data.title, notificationOption);
    }
    catch (err) {
        console.log('[firebase-messaging-sw.js] Received background message ', err);
    }
});

self.addEventListener('notificationclick', function (event) {
    let url = event.notification.data.click_action;
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
