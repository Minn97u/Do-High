import { initializeFCM } from "./firebase";

export async function handleAllowNotification() {
  // 알림 권한 요청
  const permission = await Notification.requestPermission();

  // 권한이 허용되었으면 서비스 워커 등록하고, FCM 토큰 가져오기
  if (permission === "granted") {
    initializeFCM();
  } else {
    console.error("Notification permission denied.");
  }
}
