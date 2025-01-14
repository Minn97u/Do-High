import { Axios } from "./Axios";

//게시글 전체 조회
export const getPosts = async (sort = "LATEST") => {
  try {
    const response = await Axios.get("/posts", {
      params: { sort },
    });
    if (response.data.responseType === "SUCCESS") {
      return response.data.success;
    } else {
      throw new Error(response.data.error?.message);
    }
  } catch (error) {
    throw error;
  }
};
