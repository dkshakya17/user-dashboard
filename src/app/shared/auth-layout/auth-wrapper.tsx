'use client';

import Link from 'next/link';
import logoImg from '@public/logo.png';
import Image from 'next/image';
import { Title, Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { Modal, ActionIcon, Progressbar, Loader } from 'rizzui';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { atomWithStorage } from 'jotai/utils';
import { atom, useAtom } from 'jotai';
import { API_URL } from '@/config/constants';
import { MIXPANEL_ID } from '@/config/constants';
import { routes } from '@/config/routes';
import { IoIosInformationCircle } from 'react-icons/io';
import mixpanel from 'mixpanel-browser';
import { FaGoogle } from 'react-icons/fa';

export interface UserDetails {
  email: string;
  maskedEmail: string;
  maskedPhone: string;
  name: string;
  phoneVerified: boolean;
  picture: string;
  soul_id: string;
  source: string;
  status: string;
  marksheetStatus: string; // NEW , SHORTLISTED
}
type resumeObject = {
  link: string | undefined;
  file: object | undefined;
  name: string;
  size: number;
};
type education = {
  major: string;
  degree: string;
  preferred_subject: string;
  university: string;
  university_category: string;
  gpa: string;
  marksheet: string;
};
type qualitative = {
  why_soul: string;
  experience: string;
};
type interestes = {
  roles: string[];
};
type skill = {
  name: string;
  proficiency: string;
};
export interface UserData {
  name_as_per_aadhaar: string;
  phone: string;
  education: education;
  qualitative: qualitative;
  interests: interestes;
  referral: object | undefined;
  consent: boolean;
  skills: skill[];
  languages: skill[];
  resume: resumeObject;
  marksheet: string;
  shortlisting: string;
  updated_at: string;
  linkedin_url: string;
  coding_url: string[];
  campus: string;
}

export const initialUserDetails = {
  email: '',
  maskedEmail: '',
  maskedPhone: '',
  name: '',
  phoneVerified: false,
  picture: '',
  soul_id: '',
  source: '',
  status: '',
  marksheetStatus: '', // NEW , SHORTLISTED
};

export const userDetailsAtom = atomWithStorage<UserDetails>(
  'userDetails',
  initialUserDetails
);

export default function AuthWrapper({
  children,
  title,
  bannerTitle,
  bannerDescription,
  description,
  pageImage,
  isSocialLoginActive = true,
  isSignIn = true,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  bannerTitle?: string;
  bannerDescription?: string;
  pageImage?: React.ReactNode;
  isSocialLoginActive?: boolean;
  isSignIn?: boolean;
}) {
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);
  // const [UserStatus, setUserStatus] = useState<any>('');
  const [token, setToken] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    'token',
    'userStatus',
    'source',
  ]);
  const [modalState, setModalState] = useState(false);
  mixpanel.init(MIXPANEL_ID, {
    debug: true,
    track_pageview: true,
    // persistence: 'localStorage',
  });
  const router = useRouter();

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/user/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      const json: any = await response.json();
      console.log('jsonjson', json);
      setUserDetail((prev: any) => {
        return {
          ...prev,
          phoneVerified: json.phoneVerified,
          soul_id: json.soul_id,
          status: json.status,
          marksheetStatus: json.marksheetStatus,
          name: json.name,
        };
      });
      setCookie('userStatus', json.status, { path: '/' });
      setCookie('source', json.source, { path: '/' });
      // <Progressbar />;
      toast.success(<Text>Successfully Signed In</Text>);
      if (
        (token && json.status === 'NEW') ||
        (token && json.status === 'PENDING_FORM')
      ) {
        router.push('/signup');
      } else if (
        (token && json.status === 'SHORTLISTED') ||
        (token && json.status === 'IN_REVIEW')
      ) {
        router.push('/dashboard');
      } else if (token && json.status === 'REJECTED') {
        router.push('/rejected');
      } else if (token && json.status === 'BLOCKED') {
        router.push('/blocked');
      } else {
        router.push('/signin');
      }
    } catch (error) {
      console.log('error', error);
      toast.error(<Text>There was an error</Text>);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  useEffect(() => {
    mixpanel.track_pageview({
      subcategory: 'login_page',
      category: 'application_form',
      type: 'page_view',
    });
  }, []);

  const continueWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      const tokens = await axios.get(
        `${API_URL}/v1/auth/token?code=${codeResponse.code}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      setToken(tokens.data.id_token);
      setCookie('token', tokens.data.id_token, { path: '/' });
      setShowLoader(true);
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
      setShowLoader(false);
    },
  });

  return (
    <>
      {showLoader ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader size="xl" color={'primary'} />
        </div>
      ) : (
        <div className="min-h-full justify-between gap-x-8 gap-y-4 px-4 py-8 pt-10 xs:flex xs:flex-col-reverse sm:flex-col sm:flex-col sm:flex-col-reverse md:flex-row md:pt-12 lg:flex lg:h-screen lg:p-6 xl:gap-x-10 xl:p-7 2xl:p-10 2xl:pt-10 [&>div]:min-h-[calc(100vh-80px)] xs:[&>div]:min-h-min sm:[&>div]:min-h-min">
          <div className="items-center justify-center rounded-[20px] bg-gray-50 px-6 dark:bg-gray-100/40 md:w-6/12 lg:flex lg:w-7/12 xl:justify-center 2xl:px-16">
            <div className="mt-0 pb-8 pt-8 text-center xs:mt-0 xs:pt-2 xl:pt-8 2xl:block 2xl:w-[1063px]">
              <div className="mx-auto mb-10 max-w-sm pt-2 xs:mb-0 2xl:max-w-lg">
                <Title
                  as="h2"
                  className="font-semibold !leading-normal xs:mb-2 xs:text-[16px] sm:mb-3 lg:mb-5  lg:text-[26px] lg:text-[26px] 2xl:px-10 2xl:text-[26px]"
                >
                  {bannerTitle}
                </Title>
                <Text className="leading-[1.85] text-gray-700 md:leading-loose 2xl:px-6">
                  {bannerDescription}
                </Text>
              </div>
              {pageImage}
            </div>
          </div>
          <div className="relative flex w-full items-center justify-center md:w-6/12 lg:w-5/12 2xl:justify-end 2xl:pe-24">
            <div className=" w-full max-w-sm md:max-w-md lg:py-7 lg:ps-3 lg:pt-0 2xl:w-[630px] 2xl:max-w-none 2xl:ps-20 2xl:pt-7">
              <div className="mb-7 px-6 pt-3 text-center md:pt-0 lg:px-0 lg:text-start xl:mb-8 2xl:mb-10">
                <Link
                  href="https://www.deepprogrammer.in/"
                  className="mb-6 inline-flex max-w-[168px] xl:mb-8"
                  target="_blank"
                >
                  <Image src={logoImg} alt="Deep Programmer AI" />
                </Link>
                <Text className="leading-tight text-gray-700 sm:leading-loose lg:pe-8 2xl:pe-14">
                  {title}
                </Text>
                {/* <Text className=" leading-[1.85] text-gray-700 md:leading-loose lg:pe-8 2xl:pe-14">
                {description}
              </Text> */}
              </div>
              {isSocialLoginActive && (
                <>
                  <div className="grid grid-cols-1 gap-4 pb-2 md:grid-cols-1 md:pb-6 xl:gap-5 xl:pb-7">
                    <Button
                      variant="outline"
                      color="DEFAULT"
                      onClick={() => {
                        continueWithGoogle();
                        mixpanel.track('login_with_google', {
                          // soul_id: UserDetail.soul_id,
                          category: 'login_page',
                          type: 'btn_click',
                        });
                      }}
                      className="h-11 w-full"
                    >
                      <FcGoogle className="me-2 h-4 w-4 shrink-0 text-white" />
                      {/* <FaGoogle className="me-2 h-4 w-4 shrink-0 text-white" /> */}
                      <span className="truncate">Continue With Google</span>
                    </Button>
                    <p className="mt-2 text-center text-xs text-gray-700 dark:text-white lg:text-center">
                      By proceeding, you agree to our{' '}
                      <Link
                        href="https://www.deepprogrammer.in/terms-of-service"
                        className="text-primary transition-colors"
                        target="_blank"
                      >
                        Terms of Service
                      </Link>
                    </p>
                  </div>
                </>
              )}

              {children}
              <Modal isOpen={modalState} onClose={() => setModalState(false)}>
                <div className="m-auto px-7 pb-8 pt-6">
                  <div className="mb-7 flex items-center justify-between ">
                    <h3 className="flex items-center justify-between gap-2  text-center">
                      Campus Instructions
                      <IoIosInformationCircle />
                    </h3>
                    <ActionIcon
                      size="sm"
                      variant="text"
                      onClick={() => setModalState(false)}
                    >
                      <XMarkIcon className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                  </div>
                  <div className="mb-7 flex items-center justify-between ">
                    <p className="text-gray-700 md:leading-loose">
                      If you have already applied via your campus, please DON'T
                      reapply here. We will email and message you after we have
                      uploaded your info to our database. You can
                      then login directly.
                    </p>
                  </div>
                </div>
              </Modal>
              {/* <Text className="bottom-2 left-0 right-0 text-center leading-tight text-gray-700 xs:mt-2 md:leading-loose ">
                Are you a campus applicant?{' '}
                <span
                  onClick={() => {
                    setModalState(true);
                  }}
                  className="transition-color cursor-pointer text-primary"
                >
                  Click here
                </span>{' '}
                to read instructions{' '}
              </Text> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
