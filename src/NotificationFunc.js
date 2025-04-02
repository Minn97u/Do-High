import { getFCMToken } from "./firebase";

export async function handleAllowNotification() {
  // 이미 권한이 허용되었으면 바로 토큰 획득
  if (Notification.permission === "granted") {
    const token = await getFCMToken();
    return token;
  }

  // 만약 권한이 "default" (아직 선택 안함) 이라면 요청
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getFCMToken();
    return token;
  } else {
    console.error("Notification permission denied or not granted.");
    return null;
  }
}
