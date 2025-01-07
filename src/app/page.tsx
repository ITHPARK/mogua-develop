"use client";

import KakaoIcon from "@/assets/images/icons/kakao.svg";
import ETCButton from "@/components/common/buttons/ETCButton";
import IconButton from "@/components/common/buttons/IconButton";
import OutlinePrimaryButton from "@/components/common/buttons/OutlinePrimaryButton";
import OutlineSecondaryButton from "@/components/common/buttons/OutlineSecondaryButton";
import SolidButton from "@/components/common/buttons/SolidButton";
import Dropdown from "@/components/common/Dropdown";
import Popover from "@/components/common/Popover";

export default function Home() {
  return (
    <div>
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
        <SolidButton>
          <div className='size-6 rounded-[6px] border border-white' />
          large
        </SolidButton>
        <div className='flex gap-2'>
          <SolidButton size='small'>
            <span>small</span>
          </SolidButton>
          <SolidButton size='small' state='inactive'>
            <span>small</span>
          </SolidButton>
          <SolidButton size='small' state='activated'>
            <span>small</span>
          </SolidButton>
        </div>

        <p className='mt-2 text-white'>SolidButton - Secondary</p>
        <SolidButton hierarchy='secondary'>
          large
          <div className='size-6 rounded-[6px] border border-white' />
        </SolidButton>
        <SolidButton hierarchy='secondary' state='inactive'>
          large
        </SolidButton>
        <SolidButton hierarchy='secondary' state='activated'>
          large
        </SolidButton>
        <div className='flex gap-2'>
          <SolidButton hierarchy='secondary' size='small'>
            <span>small</span>
          </SolidButton>
          <SolidButton hierarchy='secondary' size='small' state='inactive'>
            <span>small</span>
          </SolidButton>
          <SolidButton hierarchy='secondary' size='small' state='activated'>
            <span>small</span>
          </SolidButton>
        </div>

        <p className='mt-2 text-white'>OutlineButton - Primary</p>
        <OutlinePrimaryButton>
          <div className='size-6 rounded-[6px] border border-white' />
          large
          <div className='size-6 rounded-[6px] border border-white' />
        </OutlinePrimaryButton>
        <OutlinePrimaryButton>
          <div className='size-6 rounded-[6px] border border-white' />
          large
        </OutlinePrimaryButton>
        <div className='flex gap-2'>
          <OutlinePrimaryButton size='small'>
            <span>small</span>
          </OutlinePrimaryButton>
          <OutlinePrimaryButton size='small' state='inactive'>
            <span>small</span>
          </OutlinePrimaryButton>
          <OutlinePrimaryButton size='small' state='activated'>
            <span>small</span>
          </OutlinePrimaryButton>
        </div>

        <p className='mt-2 text-white'>OutlineButton - Secondary</p>
        <div className='it flex flex-wrap gap-2'>
          <OutlineSecondaryButton>large</OutlineSecondaryButton>
          <OutlineSecondaryButton>
            <div className='size-6 rounded-[6px] border border-white' />
            large
          </OutlineSecondaryButton>
          <OutlineSecondaryButton>
            large
            <div className='size-6 rounded-[6px] border border-white' />
          </OutlineSecondaryButton>
          <OutlineSecondaryButton>
            <div className='size-6 rounded-[6px] border border-white' />
            large
            <div className='size-6 rounded-[6px] border border-white' />
          </OutlineSecondaryButton>
          <OutlineSecondaryButton size='small'>
            <div className='size-6 rounded-[6px] border border-white' />
            large
            <div className='size-6 rounded-[6px] border border-white' />
          </OutlineSecondaryButton>
        </div>
        <p className='mt-2 text-white'>IconButton</p>
        <IconButton>
          <div className='size-6 rounded-[6px] border border-white' />
        </IconButton>
        <IconButton size='small'>
          <div className='size-6 rounded-[6px] border border-white' />
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
    </div>
  );
}
