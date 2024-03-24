'use client';

import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Title } from 'rizzui';
import Link from 'next/link';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { MdArrowOutward } from 'react-icons/md';
import { useAtom } from 'jotai';
import mixpanel from 'mixpanel-browser';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';

export default function CommnunityFaq() {
  const { closeModal } = useModal();
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="px-3 text-lg">
          Guidelines for AIEOU Community
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon>
      </div>
      <div className="p-0">
        <ul className="flex flex-col gap-3 p-3 pt-0 text-left text-sm">
          <li className="text-justify">
            We also happen to operate an AI Enthusiasts forum called AIEOU (AI
            Enthusiasts Of The Universe - hat tip to He-Man). Feel free to join
            AIEOU so that you can engage with peers on the latest and greatest
            in AI. Think news, prompt engineering best practices, hackathons,
            etc.
          </li>
          <li className="text-justify">
            Please note that AIEOU is <b>not</b> the place to talk shop, i.e.,
            discuss Deep Programmer AI projects/your application. We will be
            rigorously moderating the community (aka removing those who don't
            follow guidelines) so that we can truly build an awesome community
            for AI Enthusiasts.
          </li>
        </ul>
        <div className="w-full pt-3">
          <Button
            className="souai-button col-span-2 ml-2 w-full gap-2 sm:w-auto"
            onClick={() => {
              mixpanel.track('ai_enthusiasts_community_popup', {
                soul_id: UserDetail.soul_id,
                subcategory: 'navbar',
                category: 'post_login',
                type: 'redirect',
              });
            }}
          >
            <Link
              href="https://discord.gg/R9qTVuqJYy"
              target="_new"
              className="flex items-center gap-1"
            >
              Continute to discord <MdArrowOutward />
            </Link>{' '}
          </Button>
        </div>
      </div>
    </div>
  );
}
