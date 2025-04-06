import { Axios } from "./Axios";

export const getUnreadNotificationCount = async () => {
  try {
    const response = await Axios.get("/push/read");
    return response.data;
  } catch (error) {
    console.error("알림 상태 조회 실패:", error.message);
    return { responseType: "FAILURE", error };
  }
};
