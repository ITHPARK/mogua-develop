import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MeetButtonArea from "@/components/meet-detail/MeetButtonArea";
import MeetDetailReview from "@/components/meet-detail/MeetDetailReview";
import ShareMeetUpButton from "@/components/meet-detail/ShareMeetUpButton";
import {
  fetchJoinMeet,
  fetchLeaveMeet,
  fetchMeetupReview,
} from "@/lib/meetDetail/meetDetailApi";
import { type ClientInfo } from "@/types/meetDetail";
import { type ReviewInfo } from "@/types/review";
import { type UserProfile } from "@/types/user-page/index";
import { copyToClipBoard } from "@/utils/copyToClipBorad";
import "@testing-library/jest-dom";

const clientInfo: ClientInfo = {
  meetupId: 1,
  hostId: 2,
  participants: [{ userId: 1, profileImageUrl: "" }],
  maxParticipants: 10,
  minParticipants: 2,
  meetupStatus: "RECRUITING",
};

const hostInfo: UserProfile = {
  userId: 2,
  email: "ithpark@codeit.com",
  nickname: "박태현",
  profileImg: "",
  qualificationStatus: "QUALIFIED",
  bio: "프론트엔드 개발자입니다!",
  userTagList: [{ id: 1, tag: "개발" }],
  ownId: false,
};

const mockUser = {
  user: {
    userId: 1,
    email: "abcde@codeit.com",
    name: "목유저",
    profileImg: "",
  },
};

const queryClient = new QueryClient();

jest.mock("@/utils/copyToClipBorad", () => ({
  __esModule: true,
  copyToClipBoard: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  __esModule: true,
  toast: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  usePathname: jest.fn(),
}));

jest.mock("@/store/auth/useUserStore");

jest.mock("@/lib/meetDetail/meetDetailApi", () => ({
  __esModule: true,
  fetchJoinMeet: jest.fn(),
  fetchLeaveMeet: jest.fn(),
  fetchMeetupReview: jest.fn(),
}));

describe("모임 상세 페이지 테스트", () => {
  describe("ShareMeetUpButton 테스트", () => {
    it("버튼 클릭 시 `copyToClipBoard`와 `toast`가 호출되는지 확인", () => {
      // 가짜 URL 설정 (window.location.href)
      const mockUrl = "http://localhost/";

      render(<ShareMeetUpButton />);

      // 버튼 찾기
      const shareButton = screen.getByLabelText("모임 공유하기");

      // 클릭 이벤트 발생
      fireEvent.click(shareButton);

      // copyToClipBoard가 호출되는지 확인
      expect(copyToClipBoard).toHaveBeenCalledWith(mockUrl);

      // toast 출력함수가 호출되는지 확인
      expect(toast).toHaveBeenCalled();
    });
  });

  describe("MeetButtonArea 테스트", () => {
    const useUserStore = jest.requireMock("@/store/auth/useUserStore");

    beforeEach(() => {
      jest.clearAllMocks();

      useUserStore.default.mockImplementation(() => ({
        user: null, // 또는 mockUser.user 등 테스트에 필요한 기본값
      }));
    });
    it("컴포넌트 렌더링 테스트", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MeetButtonArea clientInfo={clientInfo} hostInfo={hostInfo} />
        </QueryClientProvider>,
      );

      await waitFor(() => {
        expect(screen.getByText("주최자 프로필")).toBeInTheDocument();
        expect(screen.getByLabelText("모임 찜하기")).toBeInTheDocument();
        expect(
          screen.getByLabelText(`유저 ${clientInfo.hostId} 프로필 이동`),
        ).toBeInTheDocument();
      });
    });

    describe("로그인 상태일 때 버튼 영역 테스트", () => {
      beforeEach(() => {
        jest.clearAllMocks();
        useUserStore.default.mockImplementation(() => ({
          user: mockUser.user,
        }));
      });

      describe("현재 유저가 모임 호스트가 아닐 때", () => {
        it("모임은 현재 모집중이고 내가 참여한 상태일 때 신청 취소하기 버튼을 출력하고 클릭 시 fetchLeaveMeet를 실행한다", async () => {
          render(
            <QueryClientProvider client={queryClient}>
              <MeetButtonArea clientInfo={clientInfo} hostInfo={hostInfo} />
            </QueryClientProvider>,
          );

          const button = screen.getByText("신청 취소하기");

          fireEvent.click(button);

          //모임 탈퇴 함수가 실행되는지 확인
          await waitFor(() => {
            expect(fetchLeaveMeet).toHaveBeenCalledWith(mockUser.user.userId);
            expect(fetchLeaveMeet).toHaveBeenCalledTimes(1);

            // 토스트 UI 출력 되는지 확인
            expect(toast).toHaveBeenCalled();
          });
        });

        it("모임은 현재 모집중이고 내가 참여하지 않은 상태일 때 모임 신청하기 버튼을 출력하고 클릭 시 fetchJoinMeet를 실행한다 ", async () => {
          const mockClientInfo: ClientInfo = {
            meetupId: 1,
            hostId: 2,
            participants: [{ userId: 3, profileImageUrl: "" }],
            maxParticipants: 10,
            minParticipants: 2,
            meetupStatus: "RECRUITING",
          };

          render(
            <QueryClientProvider client={queryClient}>
              <MeetButtonArea clientInfo={mockClientInfo} hostInfo={hostInfo} />
            </QueryClientProvider>,
          );

          const button = screen.getByText("모임 신청하기");

          fireEvent.click(button);

          //모임 탈퇴 함수가 실행되는지 확인
          await waitFor(() => {
            expect(fetchJoinMeet).toHaveBeenCalledWith(mockUser.user.userId);
            expect(fetchJoinMeet).toHaveBeenCalledTimes(1);

            // 토스트 UI 출력 되는지 확인
            expect(toast).toHaveBeenCalled();
          });
        });
      });

      describe("현재 유저가 모임 호스트일 때.", () => {
        beforeEach(() => {
          jest.clearAllMocks();
        });

        it("모임이 진행중이면서 아직 정원마감이 안되었을 때 모임 취소하기 버튼을 출력한다", async () => {
          const mockClientInfo: ClientInfo = {
            meetupId: 1,
            hostId: 1,
            participants: [{ userId: 1, profileImageUrl: "" }],
            maxParticipants: 10,
            minParticipants: 2,
            meetupStatus: "RECRUITING",
          };

          const mockhHostInfo: UserProfile = {
            userId: 1,
            email: "ithpark@codeit.com",
            nickname: "박태현",
            profileImg: "",
            qualificationStatus: "QUALIFIED",
            bio: "프론트엔드 개발자입니다!",
            userTagList: [{ id: 1, tag: "개발" }],
            ownId: false,
          };

          render(
            <QueryClientProvider client={queryClient}>
              <MeetButtonArea
                clientInfo={mockClientInfo}
                hostInfo={mockhHostInfo}
              />
            </QueryClientProvider>,
          );

          await waitFor(() => {
            expect(screen.getByText("모임 취소하기")).toBeInTheDocument();
          });
        });

        it("모임이 진행중이면서 아직 정원마감이 안되었을 때 개설 확정된 모임이에요가 출력된다", async () => {
          const mockClientInfo: ClientInfo = {
            meetupId: 1,
            hostId: 1,
            participants: [
              { userId: 2, profileImageUrl: "" },
              { userId: 5, profileImageUrl: "" },
            ],
            maxParticipants: 10,
            minParticipants: 2,
            meetupStatus: "RECRUITING",
          };

          const mockhHostInfo: UserProfile = {
            userId: 1,
            email: "ithpark@codeit.com",
            nickname: "박태현",
            profileImg: "",
            qualificationStatus: "QUALIFIED",
            bio: "프론트엔드 개발자입니다!",
            userTagList: [{ id: 1, tag: "개발" }],
            ownId: false,
          };

          render(
            <QueryClientProvider client={queryClient}>
              <MeetButtonArea
                clientInfo={mockClientInfo}
                hostInfo={mockhHostInfo}
              />
            </QueryClientProvider>,
          );

          await waitFor(() => {
            expect(
              screen.getByText("개설확정된 모임이에요"),
            ).toBeInTheDocument();
          });
        });
      });

      describe("모임 상태에 따른 버튼 출력 테스트", () => {
        it("종료된 모임일 때 종료된 모임이에요 출력", async () => {
          const mockClientInfo: ClientInfo = {
            meetupId: 1,
            hostId: 1,
            participants: [{ userId: 2, profileImageUrl: "" }],
            maxParticipants: 10,
            minParticipants: 2,
            meetupStatus: "COMPLETED",
          };

          render(
            <QueryClientProvider client={queryClient}>
              <MeetButtonArea clientInfo={mockClientInfo} hostInfo={hostInfo} />
            </QueryClientProvider>,
          );

          await waitFor(() => {
            expect(screen.getByText("종료된 모임이에요")).toBeInTheDocument();
          });
        });

        it("종료된 모임일 때 종료된 모임이에요 출력", async () => {
          const mockClientInfo: ClientInfo = {
            meetupId: 1,
            hostId: 1,
            participants: [{ userId: 2, profileImageUrl: "" }],
            maxParticipants: 10,
            minParticipants: 2,
            meetupStatus: "IN_PROGRESS",
          };

          render(
            <QueryClientProvider client={queryClient}>
              <MeetButtonArea clientInfo={mockClientInfo} hostInfo={hostInfo} />
            </QueryClientProvider>,
          );

          await waitFor(() => {
            expect(screen.getByText("진행중인 모임이에요")).toBeInTheDocument();
          });
        });

        it("종료된 모임일 때 종료된 모임이에요 출력", async () => {
          const mockClientInfo: ClientInfo = {
            meetupId: 1,
            hostId: 1,
            participants: [{ userId: 2, profileImageUrl: "" }],
            maxParticipants: 10,
            minParticipants: 2,
            meetupStatus: "BEFORE_START",
          };

          render(
            <QueryClientProvider client={queryClient}>
              <MeetButtonArea clientInfo={mockClientInfo} hostInfo={hostInfo} />
            </QueryClientProvider>,
          );

          await waitFor(() => {
            expect(screen.getByText("시작전인 모임이에요")).toBeInTheDocument();
          });
        });
      });
    });

    describe("비로그인 상태일 때 버튼 영역 테스트", () => {
      beforeEach(() => {
        jest.clearAllMocks();

        useUserStore.default.mockImplementation(() => ({
          user: null,
        }));
      });

      it("비로그인 상태일 때 모집중인 모임은 모임 신청버튼을 출력하며 클리 시 로그인 페이지로 리다이렉트 시킨다", async () => {
        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock }); // push를 모킹

        render(
          <QueryClientProvider client={queryClient}>
            <MeetButtonArea clientInfo={clientInfo} hostInfo={hostInfo} />
          </QueryClientProvider>,
        );

        const button = screen.getByText("모임 신청하기");
        fireEvent.click(button);

        // 로그인 페이지로 이동하는지 테스트
        await waitFor(() => {
          expect(pushMock).toHaveBeenCalledWith("/sign-in");
        });
      });
    });
  });

  describe("MeetDetailReview 컴포넌트 테스트", () => {
    const mockReviewData1: ReviewInfo[] = [
      {
        userid: 2,
        thumbnail: "",
        reviewId: 1,
        userNickname: "testUser123",
        content: "리뷰 내용 123",
        rating: 5,
        createdAt: "2025-01-17T18:07:41.521489",
        updatedAt: "2025-01-17T18:07:41.521489",
      },
      {
        userid: 2,
        thumbnail: "",
        reviewId: 1,
        userNickname: "testUser123",
        content: "리뷰 내용 456",
        rating: 5,
        createdAt: "2025-01-17T18:07:41.521489",
        updatedAt: "2025-01-17T18:07:41.521489",
      },
      {
        userid: 2,
        thumbnail: "",
        reviewId: 1,
        userNickname: "testUser123",
        content: "리뷰 내용 789",
        rating: 5,
        createdAt: "2025-01-17T18:07:41.521489",
        updatedAt: "2025-01-17T18:07:41.521489",
      },
    ];

    const mockReviewData2: ReviewInfo[] = [
      {
        userid: 2,
        thumbnail: "",
        reviewId: 1,
        userNickname: "testUser123",
        content: "리뷰 내용 1011",
        rating: 5,
        createdAt: "2025-01-17T18:07:41.521489",
        updatedAt: "2025-01-17T18:07:41.521489",
      },
      {
        userid: 2,
        thumbnail: "",
        reviewId: 1,
        userNickname: "testUser123",
        content: "리뷰 내용 1213",
        rating: 5,
        createdAt: "2025-01-17T18:07:41.521489",
        updatedAt: "2025-01-17T18:07:41.521489",
      },
    ];

    const mockResolve1 = {
      data: mockReviewData1,
      page: 0,
      nextPage: true,
      allDataLenght: 5,
    };

    const mockResolve2 = {
      data: mockReviewData2,
      page: 1,
      nextPage: false,
      allDataLenght: 5,
    };

    const mockFetchMeetupReview = jest.fn(({ pageParams }) => {
      if (pageParams === 0) return Promise.resolve(mockResolve1);
      if (pageParams === 1) return Promise.resolve(mockResolve2);
      return Promise.resolve({
        data: [],
        page: 2,
        nextPage: false,
        allDataLenght: 5,
      });
    });

    function renderMeetDetailReview() {
      return render(
        <QueryClientProvider client={queryClient}>
          <MeetDetailReview meetupId={1} meetupStatus='COMPLETED' />
        </QueryClientProvider>,
      );
    }

    describe("리뷰 데이터가 있을 떄", () => {
      beforeEach(() => {
        jest.clearAllMocks();

        (fetchMeetupReview as jest.Mock).mockImplementation(
          mockFetchMeetupReview,
        );
      });

      it("모임 리뷰 컴포넌트가 렌더링 되는지 테스트", () => {
        renderMeetDetailReview();

        expect(screen.getByLabelText("review section")).toBeInTheDocument();
      });

      it("리뷰 개수만큼 카드가 렌더링 되는지 테스트", async () => {
        renderMeetDetailReview();

        //비동기 함수로 가져오기 때문에 async/await이 필요
        const reviewBoxes = await screen.findAllByLabelText("review box");
        expect(reviewBoxes).toHaveLength(3);
      });

      it("다음 페이지가 있고 더보기 버튼을 누르면 다음 페이지 리뷰가 출력되는지 테스트 ", async () => {
        renderMeetDetailReview();

        const viewMoreButton = await screen.findByRole("button", {
          name: "1모임 리뷰 더보기",
        });
        fireEvent.click(viewMoreButton);

        await waitFor(() =>
          expect(screen.getByText("리뷰 내용 1011")).toBeInTheDocument(),
        );
      });

      it("로딩 스피너가 뜨는지 테스트", async () => {
        renderMeetDetailReview();

        // 로딩중일 떄 스피너가 뜨는지
        expect(screen.getByLabelText("loadingSpiner")).toBeInTheDocument();

        await waitFor(() =>
          // 페이지가 다 로딩되면 스피너는 사라진다.
          expect(screen.queryByLabelText("loadingSpiner")).toBeNull(),
        );
      });
    });

    describe("리뷰 데이터가 없을 때", () => {
      const mockEmptyReviewData = jest.fn(({ pageParams }) => {
        return Promise.resolve({
          data: [],
          page: pageParams,
          nextPage: false,
          allDataLenght: 0,
        });
      });

      beforeEach(() => {
        jest.clearAllMocks();

        (fetchMeetupReview as jest.Mock).mockImplementation(
          mockEmptyReviewData,
        );
      });

      it("리뷰 데이터가 없을 때 아직 작성된 리뷰가 없어요 출력", async () => {
        renderMeetDetailReview();

        await waitFor(() => {
          expect(
            screen.getByText("아직 작성된 리뷰가 없어요"),
          ).toBeInTheDocument();
        });
      });
    });
  });
});
