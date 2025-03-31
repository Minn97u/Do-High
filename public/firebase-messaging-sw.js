importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Firebase 초기화(콘솔에서 발급받은 config 사용)
firebase.initializeApp({
  apiKey: "AIzaSyAen2BTgTONCet9UMl3mUIbkEvS6Lz79Z0",
  authDomain: "dohigh-459c8.firebaseapp.com",
  projectId: "dohigh-459c8",
  storageBucket: "dohigh-459c8.firebasestorage.app",
  messagingSenderId: "344639835891",
  appId: "1:344639835891:web:788d05584bac7aafdcf186",
});

const messaging = firebase.messaging();

// 백그라운드 메시지 수신
messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] 백그라운드 메시지 수신", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "/default-icon.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
