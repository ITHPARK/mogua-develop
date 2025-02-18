import Head from "next/head";
import MainNavigation from "@/components/main/MainNavigation";
import WishlistContent from "@/components/wishlist/WishlistContent";
import { type MeetupQueryType } from "@/types/meetup.type";

export async function generateMetadata() {
  return {
    title: `찜한 모임 | mogua`,
    description: `찜한 모임을 확인해보세요`,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      title: `찜한 모임 | mogua`,
      description: `찜한 모임을 확인해보세요`,
      url: `https://mogua.vercel.app/wishlist`,
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title: `찜한 모임 | mogua`,
      description: `찜한 모임을 확인해보세요`,
    },
  };
}

export default function Wishlist({
  searchParams,
}: {
  searchParams: MeetupQueryType;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "찜한 모임",
    organizer: {
      "@type": "Organization",
      name: "Mogua",
      url: "https://mogua.vercel.app",
    },
    description: "유저 찜한 모임 페이지",
    eventStatus: "https://schema.org/EventScheduled",
    url: `https://mogua.vercel.app/wishlist`,
  };

  return (
    <>
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <div className='relative flex grow flex-col px-4 tablet:px-8 desktop:px-0'>
        <div className='z-10 mx-auto flex size-full max-w-[960px] flex-col items-center justify-center gap-8 rounded-[2.5rem] pt-2 tablet:pt-[3.25rem] desktop:pb-2.5 desktop:pt-[4.5rem]'>
          <MainNavigation initialParams={searchParams} />
          <WishlistContent />
        </div>
      </div>
    </>
  );
}
