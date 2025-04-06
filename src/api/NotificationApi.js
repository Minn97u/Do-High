import { Axios } from "./Axios";

export const getNotificationList = async () => {
  try {
    const response = await Axios.get("/push/list");
    return response.data.success;
  } catch (error) {
    console.error("알림 목록 조회 오류:", error.message);
    throw error;
  }
};

export const NotificationAsRead = async (id) => {
  await Axios.patch(`/push/${id}`);
};
export const getUnreadNotificationCount = async () => {
  try {
    const response = await Axios.get("/push/read");
    return response.data;
  } catch (error) {
    console.error("알림 상태 조회 실패:", error.message);
    return { responseType: "FAILURE", error };
  }
};
