import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, waitFor } from "@testing-library/react";
import { useSearchParams } from "next/navigation"; // 추가된 import
import WishlistContent from "@/components/wishlist/WishlistContent";
import {
  fetchUserWishlistType2,
  // fetchLocalWishlist,
} from "@/lib/wishlist/wishlistApi";
// import useUserStore from "@/store/auth/useUserStore";

// useSearchParams 모킹
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

// Mock 데이터 및 함수
const mockUser = {
  user: {
    userId: 1,
    email: "abcde@codeit.com",
    name: "목유저",
    profileImg: "",
  },
};

const queryClient = new QueryClient();

jest.mock("@/lib/wishlist/wishlistApi");
jest.mock("@/store/auth/useUserStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    user: mockUser.user,
  })),
}));

describe("찜한목록 페이지 테스트", () => {
  //mock 테스트 params
  const params: Record<string, string | number> = {
    limit: 10,
    meetupType: "STUDY",
    location: "ALL",
    orderBy: "latest",
  };

  it("유저가 로그인했을 때 유저의 찜 목록 호출 테스트", async () => {
    // useSearchParams 모킹
    const mockSearchParams = {
      get: jest.fn((key) => {
        //useSearchParams에서 특정 파라미터를 get하면 값을 가져올 수 있음.
        return params[key] || null;
      }),
    };

    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    render(
      <QueryClientProvider client={queryClient}>
        <WishlistContent />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      // API가 호출 되었는지 확인
      expect(fetchUserWishlistType2).toHaveBeenCalledWith({
        pageParams: 0,
        userId: mockUser.user.userId,
        filter: params,
      });
    });
  });

  // it("비회원일 때는 로컬스토리지에서 가져온다.", async () => {
  //   const local = { user: null };

  //   (useUserStore as jest.Mock).mockReturnValue(() => ({ user: null }));

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <WishlistContent />
  //     </QueryClientProvider>,
  //   );

  //   await waitFor(() => {
  //     expect(fetchLocalWishlist).toHaveBeenCalledWith({
  //       pageParams: 0,
  //       filter: params,
  //     });
  //   });
  // });
});
