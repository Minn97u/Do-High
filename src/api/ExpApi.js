import { Axios } from "./Axios";

// 경험치 목록 조회
export const getExpList = async (category, order) => {
  try {
    const response = await Axios.get(`/exp/list`, {
      params: {
        category,
        order,
      },
    });
    return response.data;
  } catch (error) {
    console.error("경험치 리스트 API 호출 오류:", error.message);
    throw error;
  }
};

// 경험치 현황 조회
export const getExpStatus = async () => {
  try {
    const response = await Axios.get(`/member/graph1`);
    return response.data;
  } catch (error) {
    console.error("경험치 현황 조회 API 호출 오류:", error.message);
    throw error;
  }
};

// 최근 획득 경험치 조회
export const getRecentExp = async () => {
  try {
    const response = await Axios.get(`/exp/latest`);
    return response.data;
  } catch (error) {
    console.error("최근 획득 경험치 조회 API 호출 오류:", error.message);
    throw error;
  }
};

// 작년 누적 경험치 조회
export const getLastYearExp = async () => {
  try {
    const response = await Axios.get(`/exp/bar`);
    return response.data;
  } catch (error) {
    console.error("작년 누적 경험치 조회 API 호출 오류:", error.message);
    throw error;
  }
};

// 올해 누적 경험치 조회
export const getThisYearExp = async () => {
  try {
    const response = await Axios.get(`/exp/bar/today`);
    return response.data;
  } catch (error) {
    console.error("올해 누적 경험치 조회 API 호출 오류:", error.message);
    throw error;
  }
};
