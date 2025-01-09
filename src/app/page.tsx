"use client";

import { useState } from "react";
import KakaoIcon from "@/assets/images/icons/kakao.svg";
import Card from "@/components/common/card/Card";
import ETCButton from "@/components/common/buttons/ETCButton";
import IconButton from "@/components/common/buttons/IconButton";
import OutlineButton from "@/components/common/buttons/OutlineButton";
import SolidButton from "@/components/common/buttons/SolidButton";
import Calendar from "@/components/common/Calendar";
import Dropdown from "@/components/common/Dropdown";
import CommonImageInput from "@/components/common/inputs/ImageUpload";
import CommonTextInput from "@/components/common/inputs/TextInput";
import Popover from "@/components/common/Popover";
import { usePostImage } from "@/hooks/inputs/images/usePostImage";
import { useFormValidation } from "@/hooks/inputs/useFormValidation";
import { validationRules } from "@/hooks/inputs/validationRules";
import Review from "@/components/common/review/Review";
import { type ReviewInfo } from "@/types/review";
import { type CardProps } from "@/types/card";


export default function Home() {
  const { postImage } = usePostImage(); // uploadError, isUploading 상태는 각자 시안에 맞게 사용하시면 됩니다.

  const handleImagePost = async () => {
    const endpoint = "/example/uploadImage"; // 각자 서버 엔드포인트 설정해서 사용하시면 됩니다.
    await postImage(endpoint);
  };

  const { values, errors, handleChange, isValidField } = useFormValidation(
    {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationRules,
    ["email", "password", "confirmPassword"],
  );

  const cardList: CardProps[] = [
    {
      id: 1,
      status: "모집중",
      itemType: "study",
      title: "모각각코",
      location: "집",
      participants: 10,
      recruitmentPeriod: {
        startDate: new Date("2025-01-07"),
        endDate: new Date("2025-01-20"),
      },
      eventPeriod: {
        startDate: new Date("2025-01-25"),
        endDate: new Date("2025-02-05"),
      },
      image:
        "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg",
    },
    {
      id: 2,
      status: "모집중",
      itemType: "study",
      title: "모집집코",
      location: "집",
      participants: 8,
      recruitmentPeriod: {
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-01-10"),
      },
      eventPeriod: {
        startDate: new Date("2025-01-25"),
        endDate: new Date("2025-02-05"),
      },
      image:
        "https://cdn.pixabay.com/photo/2022/10/09/14/57/stair-7509394_640.jpg",
    },
    {
      id: 3,
      status: "진행중",
      itemType: "study",
      title: "코딩공부",
      location: "집",
      participants: 8,
      recruitmentPeriod: {
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-01-05"),
      },
      eventPeriod: {
        startDate: new Date("2025-01-07"),
        endDate: new Date("2025-02-05"),
      },
      image:
        "https://cdn.pixabay.com/photo/2022/10/09/14/57/stair-7509394_640.jpg",
    },
    {
      id: 4,
      status: "종료",
      itemType: "tutoring",
      title: "게임코칭",
      location: "pc방",
      participants: 5,
      recruitmentPeriod: {
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-01-05"),
      },
      eventPeriod: {
        startDate: new Date("2025-01-07"),
        endDate: new Date("2025-02-05"),
      },
      image:
        "https://cdn.pixabay.com/photo/2022/10/09/14/57/stair-7509394_640.jpg",
      isReview: true,
    },
  ];
  const [selectedDate, setSelectedDate] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const comments: ReviewInfo[] = [
    {
      rating: 4,
      review:
        "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
      userid: 1,
      username: "모과",
      date: new Date(),
    },
    {
      rating: 2,
      review:
        "좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요 좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요좋은 스터디 였습니다. 다음에 다시 개설되면 참여하고 싶어요",
      userid: 2,
      username: "목목과",
      userprofile:
        "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
      date: new Date(),
    },
    {
      rating: 3,
      title: "모각코 모임",
      review:
        "이 카드는 마이페이지에서의 내가 작성한 리뷰입니다 이 카드는 마이페이지에서의 내가 작성한 리뷰입니다 이 카드는 마이페이지에서의 내가 작성한 리뷰입니다 이 카드는 마이페이지에서의 내가 작성한 리뷰입니다 이 카드는 마이페이지에서의 내가 작성한 리뷰입니다 이 카드는 마이페이지에서의 내가 작성한 리뷰입니다 이 카드는 마이페이지에서의 내가 작성한 리뷰입니다 이 카드는 마이페이지에서의 내가 작성한 리뷰입니다",
      userid: 3,
      username: "모곽",
      userprofile:
        "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
      date: new Date(),
      isMyReview: true,
      eventId: 14,
      eventType: "tutoring",
    },
  ];

  return (
    <div>
      <CommonTextInput
        label='이메일'
        placeholder='이메일 주소를 입력하세요'
        name='email'
        type='email'
        onChange={handleChange}
        value={values.email}
        error={errors.email}
        isValid={isValidField("email")}
        hint={isValidField("email") ? "이메일 형식이 맞습니다." : ""}
        required={false}
        layout='2buttons'
      />
      <br />
      <CommonTextInput
        label='비밀번호'
        name='password'
        type='password'
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        placeholder='******'
        hint='특수문자 포함 8자 ~ 20자 사이로 입력해주세요.'
        isValid={isValidField("password")}
        layout='1button'
        required={true}
      />
      <br />
      <CommonTextInput
        label='비밀번호 확인'
        placeholder='******'
        name='confirmPassword'
        type='password'
        onChange={handleChange}
        value={values.confirmPassword}
        error={errors.confirmPassword}
        isValid={isValidField("confirmPassword")}
        hint={
          isValidField("confirmPassword")
            ? "비밀번호가 일치해요"
            : "특수문자 포함 8자 ~ 20자 사이로 입력해주세요."
        }
        required={false}
      />

      <CommonImageInput label={"프로필 이미지"} />
      <SolidButton
        size='small'
        state='activated'
        type='submit'
        onClick={handleImagePost}
      >
        <span>서버에 POST</span>
      </SolidButton>

      <h1>møgua project</h1>
      {/* SVGR */}
      <KakaoIcon className='size-10 text-yellow-400' />

      {/* 버튼 */}
      <div className='my-4 flex flex-col gap-2 bg-black p-4'>
        <p className='text-white'>SolidButton - Primary</p>
        <SolidButton>
          <div className='size-6 rounded-[6px] border border-white' />
          large
          <div className='size-6 rounded-[6px] border border-white' />
        </SolidButton>
        <SolidButton>large</SolidButton>

        <SolidButton size='small'>
          <div className='size-6 rounded-[6px] border border-white' />
          <span>small</span>
        </SolidButton>
        <SolidButton size='small' state='inactive'>
          <span>small</span>
        </SolidButton>
        <SolidButton size='small' state='activated'>
          <span>small</span>
        </SolidButton>

        <p className='mt-2 text-white'>SolidButton - Secondary</p>
        <SolidButton variant='secondary'>
          large
          <div className='size-6 rounded-[6px] border border-white' />
        </SolidButton>
        <SolidButton variant='secondary' state='inactive'>
          large
        </SolidButton>
        <SolidButton variant='secondary' state='activated'>
          large
        </SolidButton>
        <SolidButton variant='secondary' size='small'>
          <span>small</span>
        </SolidButton>
        <SolidButton variant='secondary' size='small' state='inactive'>
          <span>small</span>
        </SolidButton>
        <SolidButton variant='secondary' size='small' state='activated'>
          <div className='size-6 rounded-[6px] border border-white' />
          <span>small</span>
          <div className='size-6 rounded-[6px] border border-white' />
        </SolidButton>

        <p className='mt-2 text-white'>OutlineButton - Primary</p>
        <OutlineButton state='activated'>large</OutlineButton>
        <OutlineButton>
          <div className='size-6 rounded-[6px] border border-white' />
          large
        </OutlineButton>
        <OutlineButton size='small'>small</OutlineButton>
        <OutlineButton size='small' state='inactive'>
          small
        </OutlineButton>
        <OutlineButton size='small' state='activated'>
          <div className='size-6 rounded-[6px] border border-white' />
          small
          <div className='size-6 rounded-[6px] border border-white' />
        </OutlineButton>

        <p className='mt-2 text-white'>OutlineButton - Secondary</p>
        <OutlineButton className='h-[54px]' variant='secondary'>
          new
        </OutlineButton>
        <OutlineButton variant='secondary'>
          <div className='size-6 rounded-[6px] border border-white' />
          new
        </OutlineButton>
        <OutlineButton variant='secondary'>
          new
          <div className='size-6 rounded-[6px] border border-white' />
        </OutlineButton>
        <OutlineButton variant='secondary'>
          <div className='size-6 rounded-[6px] border border-white' />
          new
          <div className='size-6 rounded-[6px] border border-white' />
        </OutlineButton>
        <OutlineButton variant='secondary' size='small'>
          <div className='size-6 rounded-[6px] border border-white' />
          new
          <div className='size-6 rounded-[6px] border border-white' />
        </OutlineButton>

        <p className='mt-2 text-white'>IconButton</p>
        <IconButton>
          <KakaoIcon className='size-6' />
        </IconButton>
        <IconButton size='small'>
          <KakaoIcon className='size-6' />
        </IconButton>

        <p className='mt-2 text-white'>ETCButton</p>
        <ETCButton>
          <div className='size-6 rounded-[6px] border border-white' />
          label
          <div className='size-6 rounded-[6px] border border-white' />
        </ETCButton>
        <ETCButton state='activated'>
          <div className='size-6 rounded-[6px] border border-white' />
          label
          <div className='size-6 rounded-[6px] border border-white' />
        </ETCButton>

        <p className='mt-2 text-white'>스페샬🥲</p>
        <SolidButton mode='special'>label</SolidButton>
        <IconButton mode='special'>
          <KakaoIcon className='size-6' />
        </IconButton>
      </div>

      {/* 타이포그라피 */}
      <h2 className='my-4 text-title-2 font-semibold text-blue-200'>
        Typography
      </h2>
      <ul>
        <li>
          <p className='text-title-1 font-bold text-primary'>
            Title 1 / 24px-Bold
          </p>
        </li>
        <li>
          <p className='text-title-2 font-semibold text-red-200'>
            Title 2 / 22px-Semibold
          </p>
        </li>
        <li>
          <p className='text-heading-1 font-medium'>Heading 1 / 20px-Medium</p>
        </li>
        <li>
          <p className='text-heading-2 font-regular'>
            Heading 2 / 18px-Regular
          </p>
        </li>
        <li>
          <p className='text-body-1-normal font-light'>
            Body 1-Normal / 26x-Light
          </p>
        </li>
        <li>
          <p className='text-body-2-reading font-bold'>
            Body 2-Reading / 18px-Bold
          </p>
        </li>
        <li>
          <p className='text-label-normal font-semibold'>
            Label Normal / 13px-Semibold
          </p>
        </li>
        <li>
          <p className='text-label-reading font-medium'>
            Label Reading / 13px-Medium
          </p>
        </li>
        <li>
          <p className='text-caption-normal font-regular'>
            Caption Normal / 12px-Regular
          </p>
        </li>
        <li>
          <p className='text-caption-reading font-light'>
            Caption Reading / 12px-Light
          </p>
        </li>
      </ul>

      {/* 드롭다운 */}
      <div className='flex justify-center gap-4'>
        <Dropdown
          defaultSelected='Hello, World! 1'
          align='RR'
          content={[
            {
              label: "Hello, World! 1",
              onClick: () => {
                console.log("onClick");
              },
            },
            {
              label: "Hello, World! 2",
              value: "Hello2",
              onClick: () => {
                console.log("onClick");
              },
            },
            {
              label: "Hello, World! 3",
              value: "Hello3",
              onClick: () => {
                console.log("onClick");
              },
            },
          ]}
        >
          <div className='filter-sm filter-default'>{"버튼"}</div>
        </Dropdown>

        <Popover content={<div className='w-max'>팝오버</div>}>
          <div>버튼</div>
        </Popover>
      </div>
      <div className='mt-10 px-5'>
        {cardList.map((item) => {
          return <Card card={item} />;
        })}
      </div>

      {/* calendar */}
      <div className='mx-auto w-fit bg-gray-900'>
        <Calendar onDateChange={(date) => setSelectedDate(date)} />
      </div>

      <div className='flex flex-col items-center gap-4'>
        <h1>Selected Date</h1>
        <p>
          {selectedDate.startDate?.toLocaleDateString()} ~{" "}
          {selectedDate.endDate?.toLocaleDateString()}
        </p>
      </div>

      {/* 브레이크 포인트 */}
      <div className='bg-gray-200 text-center'>
        <p className='tablet:hidden'>모바일</p>
        <p className='hidden tablet:block desktop:hidden'>태블릿</p>
        <p className='hidden desktop:block'>데스크탑</p>
      </div>

      {/* lorem */}
      <p className='text-body-1-normal'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        laborum labore autem aut maxime quam vel eligendi. Fugiat, earum
        voluptas, eos debitis rerum nostrum quis, quaerat odit labore distinctio
        optio? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Recusandae laborum labore autem aut maxime quam vel eligendi. Fugiat,
        earum voluptas, eos debitis rerum nostrum quis, quaerat odit labore
        distinctio optio? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Recusandae laborum labore autem aut maxime quam vel eligendi.
        Fugiat, earum voluptas, eos debitis rerum nostrum quis, quaerat odit
        labore distinctio optio? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Recusandae laborum labore autem aut maxime quam vel
        eligendi. Fugiat, earum voluptas, eos debitis rerum nostrum quis,
        quaerat odit labore distinctio optio? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Recusandae laborum labore autem aut maxime
        quam vel eligendi. Fugiat, earum voluptas, eos debitis rerum nostrum
        quis, quaerat odit labore distinctio optio? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Recusandae laborum labore autem aut maxime
        quam vel eligendi. Fugiat, earum voluptas, eos debitis rerum nostrum
        quis, quaerat odit labore distinctio optio? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Recusandae laborum labore autem aut maxime
        quam vel eligendi. Fugiat, earum voluptas, eos debitis rerum nostrum
        quis, quaerat odit labore distinctio optio? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Recusandae laborum labore autem aut maxime
        quam vel eligendi. Fugiat, earum voluptas, eos debitis rerum nostrum
        quis, quaerat odit labore distinctio optio?
      </p>

      <div className='flex flex-col gap-2'>
        {comments.map((review) => {
          return <Review reviewinfo={review} />;
        })}
      </div>
    </div>
  );
}
