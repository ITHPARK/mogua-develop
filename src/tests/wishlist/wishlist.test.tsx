import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, waitFor } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import WishlistContent from "@/components/wishlist/WishlistContent";
import {
  fetchUserWishlistType2,
  fetchLocalWishlist,
} from "@/lib/wishlist/wishlistApi";

// Mock modules
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("@/lib/wishlist/wishlistApi");

// useUserStore를 최상위 레벨에서 모킹
jest.mock("@/store/auth/useUserStore");

const mockUser = {
  user: {
    userId: 1,
    email: "abcde@codeit.com",
    name: "목유저",
    profileImg: "",
  },
};

const params: Record<string, string | number> = {
  limit: 10,
  meetupType: "STUDY",
  location: "ALL",
  orderBy: "latest",
};

describe("찜 목록 테스트", () => {
  const queryClient = new QueryClient();
  const mockSearchParams = {
    get: jest.fn((key) => params[key] || null),
  };

  beforeEach(() => {
    // 독립적인 테스트를 위해서 모두 리셋
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  describe("로그인 했을 때 찜한목록 페이지 테스트", () => {
    beforeEach(() => {
      // Zustand 스토어를 mock으로 가져온다.
      const useUserStore = jest.requireMock("@/store/auth/useUserStore");

      //mockImplementation로 모킹한 스토어에 정보를 저장
      useUserStore.default.mockImplementation(() => ({
        user: mockUser.user,
      }));
    });

    it("유저가 로그인했을 때 유저의 찜 목록 호출 테스트", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <WishlistContent />
        </QueryClientProvider>,
      );

      await waitFor(() => {
        expect(fetchUserWishlistType2).toHaveBeenCalledWith({
          pageParams: 0,
          userId: mockUser.user.userId,
          filter: params,
        });
      });
    });
  });

  describe("비회원 상태 찜한목록 페이지", () => {
    beforeEach(() => {
      // Set mock implementation for non-logged-in user
      const useUserStore = jest.requireMock("@/store/auth/useUserStore");
      useUserStore.default.mockImplementation(() => ({
        user: null,
      }));
    });

    it("비회원일 때 로컬 찜 목록 호출 테스트", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <WishlistContent />
        </QueryClientProvider>,
      );

      await waitFor(() => {
        expect(fetchLocalWishlist).toHaveBeenCalledWith({
          pageParams: 0,
          filter: params,
        });
      });
    });
  });
});
