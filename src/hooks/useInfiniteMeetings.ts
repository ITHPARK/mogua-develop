import { useInfiniteQuery } from "@tanstack/react-query";
import { userContentApi } from "@/lib/user/userContent";
import { type CardProps } from "@/types/card";
import { type ReviewInfo } from "@/types/review";
import {
  type UserPageSection,
  type MyReviewTab,
  type StudyType,
  type ParticipatingMeetup,
  type CreatedMeetup,
  type EligibleReview,
  type WrittenReview,
  type ApiResponse,
  type PageResponse,
} from "@/types/user-page";
import {
  mapParticipatingMeetupToCard,
  mapCreatedMeetupToCard,
  mapEligibleReviewToCard,
  mapWrittenReviewToReviewInfo,
  transformPageResponse,
} from "@/utils/userContentMapper";

interface UseInfiniteMeetingsProps {
  tab: UserPageSection;
  studyType: StudyType;
  reviewTab?: MyReviewTab;
  userId: string;
  currentUserId: string;
}

export const useInfiniteMeetings = ({
  tab,
  studyType,
  reviewTab,
  userId,
}: UseInfiniteMeetingsProps) => {
  const token = process.env.NEXT_PUBLIC_USER_TOKEN || "";

  return useInfiniteQuery<
    PageResponse<CardProps | ReviewInfo>,
    Error,
    { pages: PageResponse<CardProps | ReviewInfo>[] },
    [string, UserPageSection, StudyType, MyReviewTab | undefined, string],
    number
  >({
    queryKey: ["meetings", tab, studyType, reviewTab, userId],
    queryFn: async ({ pageParam = 1 }) => {
      const type = studyType === "study" ? "STUDY" : "TUTORING";

      switch (tab) {
        case "myMeeting": {
          const response = await userContentApi.getParticipating(
            userId,
            type,
            token,
            pageParam - 1,
          );
          const result =
            (await response.json()) as ApiResponse<ParticipatingMeetup>;
          return transformPageResponse(result, mapParticipatingMeetupToCard);
        }

        case "createdMeeting": {
          const response = await userContentApi.getCreated(
            userId,
            type,
            token,
            pageParam - 1,
          );
          const result = (await response.json()) as ApiResponse<CreatedMeetup>;
          return transformPageResponse(result, (item) =>
            mapCreatedMeetupToCard(item, type),
          );
        }

        case "myReview": {
          const status = reviewTab === "toWrite" ? "eligible" : "written";
          const response = await userContentApi.getWritten(
            userId,
            type,
            status,
            token,
            pageParam - 1,
          );

          if (status === "eligible") {
            const result =
              (await response.json()) as ApiResponse<EligibleReview>;
            return transformPageResponse(result, (item) =>
              mapEligibleReviewToCard(item, type),
            );
          } else {
            const result =
              (await response.json()) as ApiResponse<WrittenReview>;
            return transformPageResponse(result, (item) => ({
              ...mapWrittenReviewToReviewInfo(item),
              eventType: type.toLowerCase(),
            }));
          }
        }

        case "classReview": {
          const response = await userContentApi.getReceived(
            userId,
            token,
            pageParam - 1,
          );
          const result = (await response.json()) as ApiResponse<WrittenReview>;
          return transformPageResponse(result, (item) => ({
            ...mapWrittenReviewToReviewInfo(item),
            eventType: "tutoring",
          }));
        }

        default:
          throw new Error("Invalid tab");
      }
    },
    getNextPageParam: (lastPage: PageResponse<CardProps | ReviewInfo>) => {
      if (!lastPage.hasNextPage) return undefined;
      return lastPage.items.length > 0 ? lastPage.items.length + 1 : undefined;
    },
    initialPageParam: 1,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 10, // 10분
    gcTime: 1000 * 60 * 30, // 30분 (이전의 cacheTime)
    refetchOnWindowFocus: false,
  });
};