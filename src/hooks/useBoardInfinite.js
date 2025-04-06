import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../api/BoardApi";

const sortMap = {
  최신순: ["DESC"],
  오래된순: ["ASC"],
};
const useBoardInfinite = (sortOption) => {
  return useInfiniteQuery({
    queryKey: ["board", sortOption],
    queryFn: async ({ pageParam = 0 }) => {
      const size = 10;
      const sort = sortMap[sortOption];
      const response = await getPosts(pageParam, size, sort);

      if (response.responseType !== "SUCCESS") {
        throw new Error(response.error?.message || "게시글 불러오기 실패");
      }
      return response.success;
    },
    getNextPageParam: (lastPage) => {
      const current = lastPage.currentPage;
      const total = lastPage.totalPages;
      return current < total ? current + 1 : undefined;
    },
    staleTime: 30000,
    cacheTime: 60000,
  });
};

export default useBoardInfinite;
