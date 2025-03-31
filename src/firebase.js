// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
// const analytics = getAnalytics(app);

// FCM 토큰을 가져오는 함수
const getFCMToken = async () => {
  try {
    const vapidKey = process.env.REACT_APP_VAPID_KEY;
    const token = await getToken(messaging, { vapidKey });
    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.error("FCM token not available.");
      return null;
    }
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

// 푸시 알림을 수신하는 처리 함수
const handleIncomingMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);

    // 클라이언트에서 알림을 표시하는 방법
    const { title, body } = payload.notification;
    new Notification(title, {
      body: body,
      icon: payload.notification.icon || "../public/dohigh.png",
    });

    // // 알림 클릭 시 동작 처리
    // self.addEventListener("notificationclick", (event) => {
    //   event.notification.close();
    //   // 클릭 시 특정 URL로 이동
    //   clients.openWindow("https://your-website.com");
    // });
  });
};

// `getFCMToken`과 `handleIncomingMessages`를 호출하는 함수
const initializeFCM = () => {
  getFCMToken();
  handleIncomingMessages();
};

export { messaging, initializeFCM, getFCMToken, handleIncomingMessages };
