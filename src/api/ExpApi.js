import { Axios } from "./Axios";

// 경험치 현황 조회
export const getExpStatus = async () => {
  try {
    const response = await Axios.get(`/exp`);
    return response.data;
  } catch (error) {
    console.error("경험치 현황 조회 API 호출 오류:", error.message);
    throw error;
  }
};
