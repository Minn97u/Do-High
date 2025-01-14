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

//게시글 단건 조회
export const getPostById = async (postId) => {
  try {
    const response = await Axios.get(`/posts/${postId}`);
    if (response.data.responseType === "SUCCESS") {
      return response.data.success;
    } else {
      throw new Error(response.data.error?.message);
    }
  } catch (error) {
    throw error;
  }
};

//게시글 작성
export const createPost = async (title, content) => {
  try {
    const response = await Axios.post("/posts", { title, content });

    if (response.data.responseType === "SUCCESS") {
      return response.data.success;
    } else {
      throw new Error(response.data.error?.message);
    }
  } catch (error) {
    throw error;
  }
};
