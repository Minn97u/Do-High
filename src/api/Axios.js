import axios from "axios";

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    // 로그인 및 토큰 재발급 요청에는 Authorization 제외
    const isAuthRequest =
      config.url.includes("/auth/member/login") ||
      config.url.includes("/auth/admin/login") ||
      config.url.includes("/auth/refresh");

    if (token && !isAuthRequest) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 - 자동 리프레시 로직 포함
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAccessTokenExpired =
      error.response?.status === 401 &&
      (error.response?.data?.message?.includes("만료") ||
        error.response?.data?.message?.includes("잘못된 토큰") ||
        error.response?.data?.message?.includes(
          "JWT Token이 없거나 잘못되었습니다"
        )) &&
      !originalRequest._retry;

    if (isAccessTokenExpired) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(Axios(originalRequest));
            },
            reject: (err) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/refresh`,
          { refreshToken }
        );

        const newAccessToken = res.data.success.accessToken;
        const newRefreshToken = res.data.success.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        Axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return Axios(originalRequest); // 이전 요청 재시도
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth/login"; // 리프레시 실패 시 로그인 페이지로
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
