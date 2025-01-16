import { Axios } from "./Axios";

// 소속 목록 조회 API
export const fetchTeamList = async () => {
  try {
    const response = await Axios.get(`/admin/team`);
    return response.data;
  } catch (error) {
    console.error("소속 목록 조회 실패:", error);
    throw error;
  }
};

// 직군 목록 조회 API
export const fetchJobTypeList = async () => {
  try {
    const response = await Axios.get(`/admin/jobtype`);
    return response.data;
  } catch (error) {
    console.error("직군 목록 조회 실패:", error);
    throw error;
  }
};

// 신규 사원 생성 API
export const createNewEmployee = async (employeeData) => {
  try {
    const response = await Axios.post("/admin", employeeData);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error);
    throw error.response?.data || error;
  }
};

// 구성원 키워드 검색 API
export const searchMembers = async (keyword) => {
  try {
    const response = await Axios.get(`/admin/search/${keyword}`);
    return response.data;
  } catch (error) {
    console.error("구성원 검색 실패:", error);
    throw error;
  }
};

// 팀별 구성원 검색 API
export const searchMembersByTeam = async (team) => {
  try {
    const response = await Axios.get(`/admin/search/team/${team}`);
    return response.data;
  } catch (error) {
    console.error("팀별 구성원 검색 실패:", error);
    throw error;
  }
};

//아이디 중복 여부
export const checkUsernameAvailability = async (id) => {
  try {
    const response = await Axios.get(`/admin/id/${id}`);
    return response.data;
  } catch (error) {
    console.error("아이디 중복 체크 실패:", error);
    throw error;
  }
};
