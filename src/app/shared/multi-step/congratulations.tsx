'use client';

import Link from 'next/link';
import Image from 'next/image';
import Confetti from 'react-confetti';
import { Button } from '@/components/ui/button';
import { useStepperTwo } from '@/app/shared/multi-step/steps';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import congratsimg from '@public/images/congratulations.jpg';

export default function Congratulations() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([
    'token',
    'userStatus',
  ]);

  const { resetStepper } = useStepperTwo();
  // const router = useRouter();

  useEffect(() => {
    const pagetimer = setTimeout(() => {
      router.push('/dashboard');
    }, 2000); // redirect the page to dashboard
    // const timer = setTimeout(
    //   () => {
    //     removeCookie('token');
    //     removeCookie('userStatus');
    //   },
    //   30 * 60 * 1000
    // ); // clears cookie after 30 minutes

    // return () => clearTimeout(timer);
    return () => clearTimeout(pagetimer);
  }, []);

  const resetForm = () => {
    console.log('data');
    resetStepper();
  };

  return (
    <>
      <div className="w-full max-w-xl px-6">
        <figure className="relative mb-12 aspect-[60/45] md:mb-20">
          <Image
            src={congratsimg}
            alt="congratulation image"
            fill
            priority
            sizes="(max-width: 768px) 140px"
            className="aspect-[3/3] h-auto w-full object-cover"
          />
        </figure>
        {/* <Confetti className="!fixed" /> */}
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-900 md:text-2xl">
            Thank You for applying!
          </h2>
          <p className="mb-6 text-gray-500">
            Our team will get back to you soon
          </p>
          {/* <Link href={'/signin'}>
            <Button onClick={resetForm}>Back To Sign In</Button>
          </Link> */}
        </div>
      </div>
    </>
  );
}
