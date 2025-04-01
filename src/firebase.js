//firebase.js의 목표 역할
// 	1.	Firebase 앱 초기화
// 	2.	getFCMToken 함수만 제공 (토큰 요청용)
// 	3.	messaging 인스턴스 export (다른 곳에서 onMessage() 처리하도록)
// 	4.	포그라운드 메시지 수신은 다른 컴포넌트에서 담당 (ex. Main.js)
// 	5.	initializeFCM() 함수 제거 (책임 분리 목적)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

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
};

// Firebase 초기화 및 FCM 인스턴스 생성
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
      console.error(" FCM 토큰이 없습니다.");
      return null;
    }
  } catch (error) {
    console.error(" FCM 토큰 요청 실패 ", error);
    return null;
  }
};

export { getFCMToken, messaging };
