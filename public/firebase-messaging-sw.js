self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function () {
  console.log("fcm sw activate..");
});
self.addEventListener("push", function (e) {
  if (!e.data.json()) return;
  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
  };
  console.log(resultData.title, {
    body: resultData.body,
  });
  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

// importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js");

// // Firebase 초기화
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// // 백그라운드 푸시 알림 수신
// messaging.onBackgroundMessage((payload) => {
//   console.log("Received background message: ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon || "/default-icon.png",
//   };

//   // 알림 표시
//   self.registration.showNotification(notificationTitle, notificationOptions);

//   // 웹 페이지로 데이터 전송
//   self.clients
//     .matchAll({ type: "window", includeUncontrolled: true })
//     .then((clients) => {
//       clients.forEach((client) =>
//         client.postMessage({
//           type: "NOTIFICATION_RECEIVED",
//           payload: payload.notification,
//         })
//       );
//     });
// });
