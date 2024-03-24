'use client';
import { useAtom } from 'jotai';
import Header from '@/layouts/dashboard-layout/header';
import Sidebar from '@/layouts/dashboard-layout/sidebar';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa6';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
import mixpanel from 'mixpanel-browser';
import TncPopup from '@/app/shared/tnc-popup/tnc';
import { useCookies } from 'react-cookie';
import { API_URL } from '@/config/constants';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isExpired } from 'react-jwt';
import toast from 'react-hot-toast';
import { RxCrossCircled } from 'react-icons/rx';

export default function MainThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);
  const [tncAcceptanceStatus, setTncAcceptanceStatus] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies([
    'token',
    'userStatus',
    'source',
  ]);

  const getTncStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/user/tnc`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      const json: any = await response.json();
      setTncAcceptanceStatus(json.accepted);
      console.log('jsonssss', json);
    } catch (error) {
      console.log('error', error);
    }
  };
  const router = useRouter();
  useEffect(() => {
    mixpanel.identify(UserDetail.soul_id);
    getTncStatus();
    const timer = setInterval(
      () => {
        const isMyTokenExpired = isExpired(cookies.token);
        if (isMyTokenExpired) {
          removeCookie('token');
          removeCookie('userStatus');
          router.push('/signin');
          toast.error((t) => (
            <span className="flex items-center gap-2">
              Your session has expired, login again.
              <button onClick={() => toast.dismiss(t.id)}>
                <RxCrossCircled className="h-6 w-6 text-primary" />
              </button>
            </span>
          ));
        }
      },
      5 * 60 * 1000
    ); // clears cookie after 30 minutes
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-grow">
      <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" />
      <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
        <Header />
        <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
          {children}
        </div>
      </div>
      <div className="fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366]">
        <Link
          href="https://wa.me/9019945922"
          className="transition-colors"
          target="_blank"
          onClick={() => {
            mixpanel.track('whatsapp_chat', {
              soul_id: UserDetail.soul_id,
              subcategory: 'whatsapp_chat',
              category: 'post_login',
              type: 'redirect',
            });
          }}
        >
          <FaWhatsapp className="h-8 w-8 text-[#ffff]" />
        </Link>
      </div>
      {!tncAcceptanceStatus ? <TncPopup /> : ''}
    </main>
  );
}
