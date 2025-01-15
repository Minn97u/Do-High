// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Axios } from "./api/Axios";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx1HO187922re9RHh8uvyagVh-FmgxcG0",
  authDomain: "blaybus-4d648.firebaseapp.com",
  projectId: "blaybus-4d648",
  storageBucket: "blaybus-4d648.firebasestorage.app",
  messagingSenderId: "321976292831",
  appId: "1:321976292831:web:b84bf4159739fa366ce06a",
  measurementId: "G-GFBYMNV6SV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
// const analytics = getAnalytics(app);

const sendTokenToServer = async (token) => {
  try {
    const response = await Axios.post("/fcm/test", {
      fcmToken: token,
      title: "test",
      content: "test",
    });
    console.log("Token sent to server:", response.data);
  } catch (error) {
    console.error("Error sending token to server:", error);
  }
};

const getFCMToken = async () => {
  try {
    const vapidKey = process.env.REACT_APP_VAPID_KEY;
    const token = await getToken(messaging, { vapidKey });
    if (token) {
      console.log("FCM Token:", token);
      // 서버로 FCM 토큰 전송
      sendTokenToServer(token);
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

// 푸시 알림을 수신하는 처리 함수
const handleIncomingMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // 알림 표시
    new Notification(payload.notification.title, {
      body: payload.notification.body,
    });
  });
};

// `getFCMToken`과 `handleIncomingMessages`를 호출하는 함수
const initializeFCM = () => {
  getFCMToken();
  handleIncomingMessages();
};

export { initializeFCM, getFCMToken };

//알림을 클릭할 때의 동작 처리 나중에추가
// self.addEventListener('notificationclick', (event) => {
//   event.notification.close(); // 알림 닫기
//   // 알림을 클릭했을 때 특정 URL로 이동
//   clients.openWindow('https://yourwebsite.com');
// });
