"use client";

import { useState } from "react";
import RecruitmentDateModals from "../modals/RecruitmentDateModals";
import ArrowDownIcon from "@/assets/images/icons/arrow_down_fill.svg";
import type { DateType } from "@/types/meetup.type";
import modal from "@/utils/modalController";

export default function RecruitmentDateInput({
  initDate,
  onChange,
}: {
  initDate: DateType;
  onChange: (date: DateType) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<DateType>({
    startDate: initDate.startDate ?? new Date(),
    endDate: initDate.endDate ?? null,
  });

  const handleClick = () => {
    modal.open(
      ({ close }) => (
        <RecruitmentDateModals
          initDate={initDate}
          onDateChange={(date: DateType) => {
            setSelectedDate({
              startDate: initDate?.startDate ?? selectedDate.startDate,
              endDate: date.endDate,
            });
            if (date.endDate) onChange(date);
          }}
          close={close}
        />
      ),
      { title: "모집 기간" },
    );
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className='relative flex h-[3.375rem] items-center rounded-xl border border-gray-800 bg-gray-900 px-4 py-[1.125rem] text-gray-400'
    >
      {selectedDate.endDate
        ? selectedDate.endDate.toLocaleDateString()
        : "종료 날짜"}
      <ArrowDownIcon className='absolute right-1 top-1/2 size-6 -translate-y-1/2 tablet:right-4' />
    </button>
  );
}
