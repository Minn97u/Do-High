import { Axios } from "./Axios";

export const getNotificationList = async () => {
  try {
    const response = await Axios.get("/api/push/list");
    return response.data.success;
  } catch (error) {
    console.error("알림 목록 조회 오류:", error.message);
    throw error;
  }
};
