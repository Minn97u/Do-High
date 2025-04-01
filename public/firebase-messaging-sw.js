// 목표: firebase-messaging-sw.js의 역할은 단 2개
// 	1.	백그라운드 메시지 수신 → showNotification 호출
// 	2.	알림 클릭 시 이동 → 열린 탭 있으면 focus, 없으면 새 창 open

//firebase-messaging-sw.js
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
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification;
  const redirectPath = payload.data?.redirectPath || "/";

  self.registration.showNotification(title, {
    body,
    icon: icon || "/dohigh.png",
    data: { redirectPath },
  });
});

// 알림 클릭 시 동작 처리
self.addEventListener("notificationclick", function (event) {
  const redirectPath = event.notification?.data?.redirectPath || "/";
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes("/") && "focus" in client) {
            client.postMessage({ type: "REDIRECT", redirectPath });
            return client.focus();
          }
        }

        return clients.openWindow(redirectPath);
      })
  );
});
