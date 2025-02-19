import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Review from "@/components/common/review/Review";
import useReviewModals from "@/hooks/review/useReviewModals";
import { type ReviewInfo } from "@/types/review";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock("@/hooks/review/useReviewModals", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const queryClient = new QueryClient();

describe("리뷰 테스트", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockHandleDeleteClick = jest.fn();

  const mockReviewInfo: ReviewInfo = {
    rating: 1,
    content: "유익한 시간이였습니다.",
    userid: 12,
    userNickname: "박태현",
    updatedAt: "2025-01-06",
    createdAt: "2025-01-06",
    isMyReview: false,
    eventId: 12,
    eventType: "STUDY",
    thumbnail: "",
    reviewId: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useReviewModals as jest.Mock).mockReturnValue({
      handleDeleteClick: mockHandleDeleteClick,
    });
  });

  describe("review 컴포넌트가 렌더링 되는지 확인", () => {
    it("review 컴포넌트가 렌더링 정상적으로 렌더링 되는지 테스트", () => {
      render(
        <QueryClientProvider client={queryClient}>
          <Review reviewInfo={mockReviewInfo} />
        </QueryClientProvider>,
      );

      expect(screen.getByText("유익한 시간이였습니다.")).toBeInTheDocument();
    });
  });

  describe("함수 테스트", () => {
    it("handleClickDetail 클릭 시 isOpen 상태가 변경된다", () => {
      // 컴포넌트 렌더링
      render(
        <QueryClientProvider client={queryClient}>
          <Review reviewInfo={mockReviewInfo} />
        </QueryClientProvider>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();

      // 클릭 전 상태
      const arrowIcon = screen.getByLabelText("icon");
      expect(arrowIcon).not.toHaveClass("rotate-180");

      // 버튼 클릭 시 isOpen 상태 변경 확인
      fireEvent.click(button);

      // 클릭 후 상태 (isOpen이 true로 변경되어야 함)
      expect(arrowIcon).toHaveClass("rotate-180");
    });
  });

  it("리뷰 삭제하기 호출 테스트", async () => {
    const mockReview: ReviewInfo = {
      rating: 1,
      content: "유익한 시간이였습니다.",
      userid: 12,
      userNickname: "박태현",
      updatedAt: "2025-01-06",
      createdAt: "2025-01-06",
      isMyReview: false,
      eventId: 12,
      eventType: "STUDY",
      thumbnail: "",
      reviewId: 1,
      isMyWritten: true,
    };

    render(
      <QueryClientProvider client={queryClient}>
        <Review reviewInfo={mockReview} />
      </QueryClientProvider>,
    );

    //드롭다운을 눌러야 삭제하기가 나온다.
    const dropdownButton = screen.getByLabelText("popover-trigger");
    fireEvent.click(dropdownButton);

    const deleteButton = screen.getByText("삭제하기");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockHandleDeleteClick).toHaveBeenCalledWith(mockReview.reviewId);
    });
  });

  it("리뷰 수정하기 호출 테스트", async () => {
    const mockReview: ReviewInfo = {
      rating: 1,
      content: "유익한 시간이였습니다.",
      userid: 12,
      userNickname: "박태현",
      updatedAt: "2025-01-06",
      createdAt: "2025-01-06",
      isMyReview: false,
      eventId: 12,
      eventType: "STUDY",
      thumbnail: "",
      reviewId: 1,
      isMyWritten: true,
    };
    render(
      <QueryClientProvider client={queryClient}>
        <Review reviewInfo={mockReview} />
      </QueryClientProvider>,
    );

    //드롭다운을 눌러야 삭제하기가 나온다.
    const dropdownButton = screen.getByLabelText("popover-trigger");
    fireEvent.click(dropdownButton);

    const modifyButton = screen.getByText("수정하기");
    fireEvent.click(modifyButton);

    await waitFor(() => {
      //mockRouter에서 모킹한 useRouter push를 가져온다.
      expect(mockRouter.push).toHaveBeenCalledWith(
        `/user/edit_review?reviewId=${mockReview.reviewId}`,
      );
    });
  });
});
