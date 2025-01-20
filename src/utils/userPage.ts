import { type CardProps } from "@/types/card";
import { type ReviewInfo } from "@/types/review";
import {
  type FetchConfig,
  type StudyType,
  type UserPageSection,
  type ApiResponse,
  type ParticipatingMeetup,
  type CreatedMeetup,
  type PageResponse,
  type EligibleReview,
  type WrittenReview,
} from "@/types/user-page";

const PAGE_SIZE = 10;

// API 응답을 CardProps로 변환하는 함수
const mapParticipatingMeetupToCard = (
  meetup: ParticipatingMeetup,
): CardProps => {
  return {
    meetupId: meetup.meetupId,
    title: meetup.title,
    meetingType: meetup.meetingType,
    location: meetup.location,
    minParticipants: meetup.minParticipants,
    recruitmentStartDate: new Date(meetup.recruitmentStartDate),
    recruitmentEndDate: new Date(meetup.recruitmentEndDate),
    meetingStartDate: new Date(meetup.meetingStartDate),
    meetingEndDate: new Date(meetup.meetingEndDate),
    thumbnail: meetup.thumbnail,
    online: meetup.online,
    participants: meetup.participants,
    status: meetup.status,
    isMypage: true,
  };
};

// 만든 모임 API 응답을 CardProps로 변환하는 함수
const mapCreatedMeetupToCard = (
  meetup: CreatedMeetup,
  type: "STUDY" | "TUTORING",
): CardProps => {
  return {
    meetupId: meetup.meetupId,
    title: meetup.title,
    meetingType: type,
    location: meetup.location,
    minParticipants: 1,
    recruitmentStartDate: new Date(meetup.recruitmentStartDate),
    recruitmentEndDate: new Date(meetup.recruitmentEndDate),
    meetingStartDate: new Date(meetup.meetingStartDate),
    meetingEndDate: new Date(meetup.meetingEndDate),
    thumbnail: meetup.thumbnail,
    online: meetup.online,
    participants: Array(meetup.participants).fill({
      userId: 0,
      profileImageUrl: "",
    }),
    status: meetup.meetupStatus,
    isMypage: true,
  };
};

// 작성 가능한 리뷰 API 응답을 CardProps로 변환하는 함수
const mapEligibleReviewToCard = (
  review: EligibleReview,
  type: "STUDY" | "TUTORING",
): CardProps => {
  return {
    meetupId: review.meetupId,
    title: review.title,
    meetingType: type,
    location: review.location,
    minParticipants: review.minParticipants,
    recruitmentStartDate: new Date(review.recruitmentStartDate),
    recruitmentEndDate: new Date(review.recruitmentEndDate),
    meetingStartDate: new Date(review.meetingStartDate),
    meetingEndDate: new Date(review.meetingEndDate),
    thumbnail: review.thumbnail,
    online: review.online,
    participants: Array(review.participantsCount).fill({
      userId: 0,
      profileImageUrl: "",
    }),
    status: review.status,
    isMypage: true,
  };
};

// 작성한 리뷰 API 응답을 ReviewInfo로 변환하는 함수
const mapWrittenReviewToReviewInfo = (
  review: WrittenReview,
): Omit<ReviewInfo, "eventType"> => {
  return {
    userid: review.userId,
    username: review.nickname,
    userprofile: review.profileImg,
    rating: review.rating,
    title: review.title,
    review: review.content,
    date: new Date(review.reviewDate),
    isMyReview: true,
    eventId: review.meetupId,
  };
};

export const fetchItems = async ({
  tab,
  studyType,
  reviewTab,
  page,
  userId,
}: FetchConfig): Promise<PageResponse<CardProps | ReviewInfo>> => {
  // 내 모임 탭일 경우 실제 API 호출
  if (tab === "myMeeting") {
    try {
      const type = studyType === "study" ? "STUDY" : "TUTORING";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/${userId}/meetups/participating/${type}?page=${page - 1}&limit=${PAGE_SIZE}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch participating meetups");
      }

      const result: ApiResponse<ParticipatingMeetup> = await response.json();

      return {
        items: result.data.map(mapParticipatingMeetupToCard),
        hasNextPage: !result.additionalData.isLast,
      };
    } catch (error) {
      console.error("Error fetching participating meetups:", error);
      throw error;
    }
  }

  // 만든 모임 탭일 경우 실제 API 호출
  if (tab === "createdMeeting") {
    try {
      const type = studyType === "study" ? "STUDY" : "TUTORING";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/${userId}/meetups/created/${type}?page=${page - 1}&limit=${PAGE_SIZE}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch created meetups");
      }

      const result: ApiResponse<CreatedMeetup> = await response.json();

      return {
        items: result.data.map((meetup) =>
          mapCreatedMeetupToCard(meetup, type),
        ),
        hasNextPage: !result.additionalData.isLast,
      };
    } catch (error) {
      console.error("Error fetching created meetups:", error);
      throw error;
    }
  }

  // 내 리뷰 탭일 경우 실제 API 호출
  if (tab === "myReview") {
    try {
      const type = studyType === "study" ? "STUDY" : "TUTORING";
      const status = reviewTab === "toWrite" ? "eligible" : "written";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/${userId}/reviews/${type}/${status}?page=${page - 1}&limit=${PAGE_SIZE}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const result: ApiResponse<EligibleReview | WrittenReview> =
        await response.json();

      return {
        items: result.data.map((item) =>
          status === "eligible"
            ? mapEligibleReviewToCard(item as EligibleReview, type)
            : {
                ...mapWrittenReviewToReviewInfo(item as WrittenReview),
                eventType: type.toLowerCase(),
              },
        ),
        hasNextPage: !result.additionalData.isLast,
      };
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  }

  // 수강평 탭일 경우 실제 API 호출
  if (tab === "classReview") {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/${userId}/reviews/received?page=${page - 1}&limit=${PAGE_SIZE}`;
      console.log("[수강평 API 요청]", {
        url,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`,
        },
      });

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`,
        },
      });

      console.log("[수강평 API 응답 상태]", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[수강평 API 에러]", errorText);
        throw new Error("Failed to fetch class reviews");
      }

      const result: ApiResponse<WrittenReview> = await response.json();
      console.log("[수강평 API 응답 데이터]", result);

      return {
        items: result.data.map((item) => ({
          ...mapWrittenReviewToReviewInfo(item as WrittenReview),
          eventType: "tutoring",
        })),
        hasNextPage: !result.additionalData.isLast,
      };
    } catch (error) {
      console.error("Error fetching class reviews:", error);
      throw error;
    }
  }

  throw new Error("Invalid tab");
};

// 현재 탭에 따라 '스터디|과외' 필터를 표시할지 여부를 반환
export const shouldShowFilter = (
  tab: UserPageSection,
  isInstructor: boolean,
) => {
  return (
    tab === "myMeeting" ||
    (tab === "createdMeeting" && isInstructor) ||
    tab === "myReview"
  );
};

// 현재 탭에 따라 '스터디|과외' 필터의 기본값을 반환
export const getCurrentStudyType = (
  tab: UserPageSection,
  studyType: StudyType,
  isInstructor: boolean,
) => {
  if (tab === "classReview") return "tutoring";
  if (!isInstructor && tab === "createdMeeting") return "study";
  return studyType;
};