import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, waitFor, screen } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import WishlistContent from "@/components/wishlist/WishlistContent";
import {
  fetchUserWishlistType2,
  fetchLocalWishlist,
} from "@/lib/wishlist/wishlistApi";

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
  location: "CAPITAL",
  orderBy: "latest",
};

const mockData = {
  data: [
    {
      isOnline: false,
      location: "CAPITAL",
      meetingEndDate: new Date("2025-03-06T15:00:00"),
      meetingStartDate: new Date("2025-02-28T15:00:00"),
      meetingType: "STUDY",
      meetupId: 19,
      meetupStatus: "RECRUITING",
      minParticipants: 2,
      participants: [],
      recruitmentEndDate: new Date("2025-02-19T15:00:00"),
      recruitmentStartDate: new Date("2025-02-18T04:48:50.528679"),
      thumbnail:
        "https://fesi6.s3.dualstack.ap-southeast-2.amazonaws.com/meetupImage/defaultProfileImages.png",
      title: "리액트과외",
    },
    {
      isOnline: true,
      location: null,
      meetingEndDate: new Date("2025-03-06T15:00:00"),
      meetingStartDate: new Date("2025-02-28T15:00:00"),
      meetingType: "TUTORING",
      meetupId: 19,
      meetupStatus: "RECRUITING",
      minParticipants: 2,
      participants: [],
      recruitmentEndDate: new Date("2025-02-19T15:00:00"),
      recruitmentStartDate: new Date("2025-02-18T04:48:50.528679"),
      thumbnail:
        "https://fesi6.s3.dualstack.ap-southeast-2.amazonaws.com/meetupImage/defaultProfileImages.png",
      title: "리액트과외2",
    },
  ],
  page: 0,
  isNext: -1,
};

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("@/lib/wishlist/wishlistApi");

// useUserStore를 최상위 레벨에서 모킹
jest.mock("@/store/auth/useUserStore");

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

      //fetchUserWishlistType2가 mockData를 리턴하도록 설정
      const filterData = mockData.data.filter((item) => {
        return (
          item.meetingType === params.meetupType &&
          item.location === params.location
        );
      });

      (fetchUserWishlistType2 as jest.Mock).mockResolvedValue({
        data: filterData,
        page: 0,
        isNext: -1,
      });
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

    it("로그인 상태일 때 파라미터에 맞는 리스트만 렌더링 되는지 테스트", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <WishlistContent />
        </QueryClientProvider>,
      );

      await waitFor(() => {
        //STUDY만 렌더링 하도록 설정
        expect(fetchUserWishlistType2).toHaveBeenCalledWith({
          pageParams: 0,
          userId: mockUser.user.userId,
          filter: {
            limit: 10,
            meetupType: "STUDY",
            location: "CAPITAL",
            orderBy: "latest",
          },
        });
      });

      const element = screen.getAllByLabelText((content) =>
        content.includes("모임19 이동"),
      );

      expect(element).toHaveLength(1);
    });
  });

  describe("비회원 상태 찜한목록 페이지", () => {
    beforeEach(() => {
      const useUserStore = jest.requireMock("@/store/auth/useUserStore");
      useUserStore.default.mockImplementation(() => ({
        user: null,
      }));

      const filterData = mockData.data.filter((item) => {
        return (
          item.meetingType === params.meetupType &&
          item.location === params.location
        );
      });

      (fetchLocalWishlist as jest.Mock).mockResolvedValue({
        data: filterData,
        page: 0,
        isNext: -1,
      });
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

  it("비회원 일 때 필터링에 맞는 데이터만 로딩되는지 테스트", async () => {
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

    const element = screen.getAllByLabelText((content) =>
      content.includes("모임19 이동"),
    );

    expect(element).toHaveLength(1);
  });
});
