import { Axios } from "./Axios";

// 소속 목록 조회 API
export const fetchTeamList = async () => {
  try {
    const response = await Axios.get(`/admin/team`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch team list:", error);
    throw error;
  }
};

// 직군 목록 조회 API
export const fetchJobTypeList = async () => {
  try {
    const response = await Axios.get(`/admin/jobtype`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch job type list:", error);
    throw error;
  }
};
