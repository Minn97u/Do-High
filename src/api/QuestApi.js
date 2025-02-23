import { Axios } from "./Axios";

export const getQuests = async () => {
  try {
    const response = await Axios.get("/exp/home");
    return response.data;
  } catch (error) {
    console.error("최근 퀘스트 조회 오류:", error.message);
    throw error;
  }
};
