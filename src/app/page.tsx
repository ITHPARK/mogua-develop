import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import MainContentList from "@/components/main/MainContentList";
import MainNavigation from "@/components/main/MainNavigation";
import { getMeetupList } from "@/lib/main/meetup.api";
import { type MeetupQueryType } from "@/types/meetup.type";

export default async function Home({
  searchParams,
}: {
  searchParams: MeetupQueryType;
}) {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchInfiniteQuery({
      queryKey: [
        "meetup",
        searchParams.type,
        searchParams.state,
        searchParams.location,
        searchParams.startDate,
        searchParams.endDate,
      ],
      queryFn: ({ pageParam = 0 }) =>
        getMeetupList({
          page: pageParam,
          limit: 10,
          orderBy: searchParams.orderBy,
          type: searchParams.type,
          state: searchParams.state,
          location: searchParams.location,
          startDate: searchParams.startDate,
          endDate: searchParams.endDate,
        }),
      getNextPageParam: (lastPage: {
        isLast: boolean;
        nextPage: number | null;
      }) => (!lastPage.isLast ? lastPage.nextPage : undefined),
      initialPageParam: 0,
    });
  } catch (error) {
    console.error("Error prefetching data:", error);
  }

  return (
    <div className='flex grow flex-col'>
      <video
        className='absolute inset-0 size-full object-cover'
        src='/videos/background.mp4'
        loop
        autoPlay
        muted
        preload='auto'
        playsInline
      />

      <div className='z-10 mx-auto flex size-full max-w-[1200px] flex-col items-center justify-center gap-8 rounded-[2.5rem] pt-2 tablet:pt-[3.25rem] desktop:pb-2.5 desktop:pt-[4.5rem]'>
        <Suspense
          fallback={
            <div className='flex h-11 w-full grow items-center justify-between px-5'>
              <div className='h-full w-[6.1875rem] animate-pulse bg-gray-800' />
              <div>
                <div className='h-full w-[3.25rem] animate-pulse rounded-2xl bg-gray-800' />
                <div className='h-full w-[3.25rem] animate-pulse rounded-2xl bg-gray-800' />
              </div>
            </div>
          }
        >
          <MainNavigation />
        </Suspense>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MainContentList />
        </HydrationBoundary>
      </div>
    </div>
  );
}
