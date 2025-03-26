import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getCpExp,
  getExpList,
  getJqExp,
  getLqExp,
  getPfExp,
} from "../api/ExpApi";

const apiMap = {
  전체: getExpList,
  인사평가: getPfExp,
  직무퀘스트: getJqExp,
  리더퀘스트: getLqExp,
  전사프로젝트: getCpExp,
};

const sortMap = {
  최신순: ["date,DESC"],
  오래된순: ["date,ASC"],
};

const useExpInfiniteScroll = (selectedTab, sortOption) => {
  return useInfiniteQuery({
    queryKey: ["exp", selectedTab, sortOption],
    queryFn: async ({ pageParam = 1 }) => {
      const size = 10;
      const sort = sortMap[sortOption];
      const api = apiMap[selectedTab];

      const response = await api(pageParam, size, sort);

      if (response.responseType !== "SUCCESS") {
        throw new Error(response.error?.message || "데이터 불러오기 실패");
      }

      return response.success;
    },
    getNextPageParam: (lastPage) => {
      const current = lastPage.currentPage;
      const total = lastPage.totalPages;
      return current < total ? current + 1 : undefined;
    },
    staleTime: 30000, // 데이터를 불러온 후 30초동안은 캐시된 데이터 사용
    cacheTime: 60000, // 쿼리가 더 이상 화면에 마운트되어 사용되지 않아도 1분간 캐시 유지
  });
};

export default useExpInfiniteScroll;
