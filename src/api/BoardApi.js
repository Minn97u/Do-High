import { Axios } from "./Axios";

//게시글 전체 조회
// BoardApi.js
export const getPosts = async (page, size, order) => {
  try {
    const response = await Axios.get("/posts", {
      params: { page, size, sort: `createdAt,${order}` },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//게시글 단건 조회
export const getPostById = async (postId) => {
  try {
    const response = await Axios.get(`/posts/${postId}`);
    if (response.data.responseType === "SUCCESS") {
      return response.data;
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

//게시글 삭제
export const deletePostById = async (postId) => {
  try {
    const response = await Axios.delete(`/posts/${postId}`);
    if (response.data.responseType === "SUCCESS") {
      return response.data.success;
    } else {
      throw new Error(response.data.error?.message);
    }
  } catch (error) {
    throw error;
  }
};

// 게시글 수정
export const updatePost = async (postId, title, content) => {
  try {
    const response = await Axios.put(`/posts/${postId}`, { title, content });
    if (response.data.responseType === "SUCCESS") {
      return response.data.success;
    } else {
      throw new Error(response.data.error?.message);
    }
  } catch (error) {
    throw error;
  }
};
