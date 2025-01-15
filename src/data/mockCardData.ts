import { type CardProps } from "@/types/card";

export const mockCardData: CardProps[] = [
  {
    id: 1,
    status: "모집중",
    itemType: "study",
    title: "영어 회화 스터디",
    location: "강남구 카페",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-10"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-15"),
      endDate: new Date("2025-02-15"),
    },
    image: "https://via.placeholder.com/300x200?text=영어+회화+스터디",
    isReview: false,
  },
  {
    id: 2,
    status: "진행중",
    itemType: "tutoring",
    title: "프로그래밍 개인 과외",
    location: "마포구 집",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-15"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-20"),
      endDate: new Date("2025-01-20"),
    },
    image: "https://via.placeholder.com/300x200?text=프로그래밍+개인+과외",
    isReview: false,
  },
  {
    id: 3,
    status: "종료",
    itemType: "study",
    title: "수학 문제 풀이 스터디",
    location: "성북구 도서관",
    participants: 8,
    recruitmentPeriod: {
      startDate: new Date("2024-11-01"),
      endDate: new Date("2024-11-10"),
    },
    eventPeriod: {
      startDate: new Date("2024-11-15"),
      endDate: new Date("2024-12-15"),
    },
    image: "https://via.placeholder.com/300x200?text=수학+문제+풀이+스터디",
    isReview: false,
  },
  {
    id: 4,
    status: "모집중",
    itemType: "tutoring",
    title: "초등학교 과학 과외",
    location: "송파구 학생 집",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-20"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-25"),
      endDate: new Date("2025-03-01"),
    },
    image: "https://via.placeholder.com/300x200?text=초등학교+과학+과외",
    isReview: false,
  },
  {
    id: 5,
    status: "진행중",
    itemType: "study",
    title: "웹 개발 스터디",
    location: "서초구 공유 오피스",
    participants: 6,
    recruitmentPeriod: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-25"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-02-01"),
    },
    image: "https://via.placeholder.com/300x200?text=웹+개발+스터디",
    isReview: false,
  },
  {
    id: 6,
    status: "모집중",
    itemType: "study",
    title: "프랑스어 스터디",
    location: "종로구 카페",
    participants: 4,
    recruitmentPeriod: {
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-02-10"),
    },
    eventPeriod: {
      startDate: new Date("2025-02-15"),
      endDate: new Date("2025-03-15"),
    },
    image: "https://via.placeholder.com/300x200?text=프랑스어+스터디",
    isReview: false,
  },
  {
    id: 7,
    status: "진행중",
    itemType: "tutoring",
    title: "고등학교 수학 과외",
    location: "강서구 학생 집",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-15"),
      endDate: new Date("2024-12-25"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-30"),
      endDate: new Date("2025-02-15"),
    },
    image: "https://via.placeholder.com/300x200?text=고등학교+수학+과외",
    isReview: false,
  },
  {
    id: 8,
    status: "종료",
    itemType: "study",
    title: "글쓰기 워크숍",
    location: "중구 문화센터",
    participants: 10,
    recruitmentPeriod: {
      startDate: new Date("2024-10-01"),
      endDate: new Date("2024-10-10"),
    },
    eventPeriod: {
      startDate: new Date("2024-10-15"),
      endDate: new Date("2024-11-15"),
    },
    image: "https://via.placeholder.com/300x200?text=글쓰기+워크숍",
    isReview: false,
  },
  {
    id: 9,
    status: "모집중",
    itemType: "tutoring",
    title: "기초 일본어 과외",
    location: "용산구 학생 집",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2025-02-20"),
      endDate: new Date("2025-02-28"),
    },
    eventPeriod: {
      startDate: new Date("2025-03-05"),
      endDate: new Date("2025-04-05"),
    },
    image: "https://via.placeholder.com/300x200?text=기초+일본어+과외",
    isReview: false,
  },
  {
    id: 10,
    status: "진행중",
    itemType: "study",
    title: "데이터 분석 스터디",
    location: "해운대구 카페",
    participants: 7,
    recruitmentPeriod: {
      startDate: new Date("2025-01-10"),
      endDate: new Date("2025-01-20"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-25"),
      endDate: new Date("2025-02-25"),
    },
    image: "https://via.placeholder.com/300x200?text=데이터+분석+스터디",
    isReview: false,
  },
  {
    id: 11,
    status: "종료",
    itemType: "tutoring",
    title: "중학교 영어 과외",
    location: "분당구 학생 집",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-11-20"),
      endDate: new Date("2024-11-30"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-05"),
      endDate: new Date("2025-01-05"),
    },
    image: "https://via.placeholder.com/300x200?text=데이터+분석+스터디",
    isReview: false,
  },
  {
    id: 12,
    status: "모집중",
    itemType: "study",
    title: "인공지능 기초 스터디",
    location: "대구 공유 오피스",
    participants: 6,
    recruitmentPeriod: {
      startDate: new Date("2025-03-01"),
      endDate: new Date("2025-03-10"),
    },
    eventPeriod: {
      startDate: new Date("2025-03-15"),
      endDate: new Date("2025-04-15"),
    },
    image: "https://via.placeholder.com/300x200?text=인공지능+기초+스터디",
    isReview: false,
  },
  {
    id: 13,
    status: "진행중",
    itemType: "tutoring",
    title: "대학교 논문 첨삭",
    location: "광진구 학생 집",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2025-01-15"),
      endDate: new Date("2025-01-25"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-30"),
      endDate: new Date("2025-02-28"),
    },
    image: "https://via.placeholder.com/300x200?text=대학교+논문+첨삭",
    isReview: false,
  },
  {
    id: 14,
    status: "종료",
    itemType: "study",
    title: "기초 피트니스 그룹",
    location: "송파구 체육관",
    participants: 15,
    recruitmentPeriod: {
      startDate: new Date("2024-09-10"),
      endDate: new Date("2024-09-20"),
    },
    eventPeriod: {
      startDate: new Date("2024-09-25"),
      endDate: new Date("2024-10-25"),
    },
    image: "https://via.placeholder.com/300x200?text=기초+피트니스+그룹",
    isReview: false,
  },
  {
    id: 15,
    status: "모집중",
    itemType: "study",
    title: "비즈니스 영어 회화",
    location: "여의도 카페",
    participants: 8,
    recruitmentPeriod: {
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-02-15"),
    },
    eventPeriod: {
      startDate: new Date("2025-02-20"),
      endDate: new Date("2025-03-20"),
    },
    image: "https://via.placeholder.com/300x200?text=비즈니스+영어+회화",
    isReview: false,
  },
  {
    id: 16,
    status: "진행중",
    itemType: "tutoring",
    title: "기초 회계 과외",
    location: "구로구 사무실",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-20"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-25"),
      endDate: new Date("2025-01-25"),
    },
    image: "https://via.placeholder.com/300x200?text=기초+회계+과외",
    isReview: false,
  },
  {
    id: 17,
    status: "종료",
    itemType: "study",
    title: "영화 감상 및 토론",
    location: "이태원 문화센터",
    participants: 12,
    recruitmentPeriod: {
      startDate: new Date("2024-10-01"),
      endDate: new Date("2024-10-10"),
    },
    eventPeriod: {
      startDate: new Date("2024-10-15"),
      endDate: new Date("2024-11-15"),
    },
    image: "https://via.placeholder.com/300x200?text=영화+감상+및+토론",
    isReview: false,
  },
  {
    id: 18,
    status: "모집중",
    itemType: "tutoring",
    title: "중급 중국어 회화",
    location: "광주 카페",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-01-15"),
    },
    eventPeriod: {
      startDate: new Date("2025-01-20"),
      endDate: new Date("2025-02-20"),
    },
    image: "https://via.placeholder.com/300x200?text=중급+중국어+회화",
    isReview: false,
  },
  {
    id: 19,
    status: "진행중",
    itemType: "study",
    title: "헬스 트레이닝 그룹",
    location: "부산 체육관",
    participants: 10,
    recruitmentPeriod: {
      startDate: new Date("2024-11-20"),
      endDate: new Date("2024-11-30"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-05"),
      endDate: new Date("2025-01-05"),
    },
    image: "https://via.placeholder.com/300x200?text=헬스+트레이닝+그룹",
    isReview: false,
  },
  {
    id: 20,
    status: "종료",
    itemType: "study",
    title: "창업 아이디어 개발",
    location: "판교 스타트업 센터",
    participants: 5,
    recruitmentPeriod: {
      startDate: new Date("2024-09-10"),
      endDate: new Date("2024-09-20"),
    },
    eventPeriod: {
      startDate: new Date("2024-09-25"),
      endDate: new Date("2024-10-25"),
    },
    image: "https://via.placeholder.com/300x200?text=창업+아이디어+개발",
    isReview: false,
  },
  {
    id: 21,
    status: "모집중",
    itemType: "study",
    title: "비즈니스 전략 스터디",
    location: "서울역 공유 오피스",
    participants: 6,
    recruitmentPeriod: {
      startDate: new Date("2025-01-20"),
      endDate: new Date("2025-01-30"),
    },
    eventPeriod: {
      startDate: new Date("2025-02-05"),
      endDate: new Date("2025-03-05"),
    },
    image: "https://via.placeholder.com/300x200?text=비즈니스+전략+스터디",
    isReview: false,
  },
  {
    id: 22,
    status: "진행중",
    itemType: "tutoring",
    title: "전문 사진 촬영 과외",
    location: "홍대 사진 스튜디오",
    participants: 1,
    recruitmentPeriod: {
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-02-10"),
    },
    eventPeriod: {
      startDate: new Date("2025-02-15"),
      endDate: new Date("2025-03-15"),
    },
    image: "https://via.placeholder.com/300x200?text=전문+사진+촬영+과외",
    isReview: false,
  },
  {
    id: 23,
    status: "종료",
    itemType: "study",
    title: "프론트엔드 개발 스터디",
    location: "강남구 공유 오피스",
    participants: 8,
    recruitmentPeriod: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-10"),
    },
    eventPeriod: {
      startDate: new Date("2024-12-15"),
      endDate: new Date("2025-01-15"),
    },
    image: "https://via.placeholder.com/300x200?text=전문+사진+촬영+과외",
    isReview: false,
  },
];