import { Axios } from "./Axios";

// 유저 정보 조회
export const getMemberInfo = async () => {
  try {
    const response = await Axios.get(`/member/`);
    return response.data;
  } catch (error) {
    console.error("멤버 정보 API 호출 오류:", error.message);
    throw error;
  }
};

// 프로필 이미지 목록 조회
export const getAvailableProfiles = async () => {
  try {
    const response = await Axios.get(`/profile/list`);
    return response.data;
  } catch (error) {
    console.error("프로필 이미지 목록 조회 오류:", error.message);
    throw error;
  }
};

// 선택된 프로필 이미지 저장
export const updateSelectedProfile = async (url) => {
  try {
    const response = await Axios.post(`/member/profile`, { url });
    return response.data;
  } catch (error) {
    console.error("프로필 이미지 저장 오류:", error.message);
    throw error;
  }
};
