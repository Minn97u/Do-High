import { Axios } from "./Axios";

// 전체 경험치 목록 조회
export const getExpList = async (order) => {
  try {
    const response = await Axios.get(`/exp/list`, {
      params: {
        order,
      },
    });
    return response.data;
  } catch (error) {
    console.error("전체 경험치 리스트 API 호출 오류:", error.message);
    throw error;
  }
};

// 총 누적 경험치
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

// 인사평가 경험치 목록 조회
export const getPfExp = async (order) => {
  try {
    const response = await Axios.get(`/exp/pf`, {
      params: { order },
    });
    return response.data;
  } catch (error) {
    console.error("인사평가 경험치 조회 API 호출 오류:", error.message);
    throw error;
  }
};

// 리더부여퀘스트 경험치 목록 조회
export const getLqExp = async (order) => {
  try {
    const response = await Axios.get(`/exp/lq`, {
      params: { order },
    });
    return response.data;
  } catch (error) {
    console.error("리더부여퀘스트 경험치 조회 API 호출 오류:", error.message);
    throw error;
  }
};

// 직무퀘스트 경험치 목록 조회
export const getJqExp = async (order) => {
  try {
    const response = await Axios.get(`/exp/jq`, {
      params: { order },
    });
    return response.data;
  } catch (error) {
    console.error("직무퀘스트 경험치 조회 API 호출 오류:", error.message);
    throw error;
  }
};

// 전사프로젝트 경험치 목록 조회
export const getCpExp = async (order) => {
  try {
    const response = await Axios.get(`/exp/cp`, {
      params: { order },
    });
    return response.data;
  } catch (error) {
    console.error("전사프로젝트 경험치 조회 API 호출 오류:", error.message);
    throw error;
  }
};
