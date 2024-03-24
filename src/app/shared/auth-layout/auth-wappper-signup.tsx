'use client';

import Link from 'next/link';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import Image from 'next/image';
import { Text } from '@/components/ui/text';
import { usePathname } from 'next/navigation';
import { Title } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { PiArrowLineRight, PiUserCirclePlus } from 'react-icons/pi';
import { useStepperTwo } from '@/app/shared/multi-step/steps';
import { FcGoogle } from 'react-icons/fc';
import OrSeparation from './or-separation';
import { siteConfig } from '@/config/site.config';
import { BsFacebook } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa6';

function AuthNavLink({
  href,
  children,
}: React.PropsWithChildren<{
  href: string;
}>) {
  const pathname = usePathname();
  function isActive(href: string) {
    if (pathname === href) {
      return true;
    }
    return false;
  }

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-x-1 rounded-3xl p-2 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 md:px-4 md:py-2.5 [&>svg]:w-4 [&>svg]:text-gray-500',
        isActive(href) ? 'bg-gray-100 text-gray-900 [&>svg]:text-gray-900' : ' '
      )}
    >
      {children}
    </Link>
  );
}

export default function AuthWrapperSignUp({
  children,
  title,
  isSocialLoginActive = false,
  isSignIn = false,
  className = '',
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  isSocialLoginActive?: boolean;
  isSignIn?: boolean;
  className?: string;
}) {
  return (
    <div className="flex min-h-full w-full flex-col justify-between">
      <AuthHeader />

      <div className="flex w-full flex-col justify-center px-5 py-0 sm:py-8">
        <div
          className={cn(
            'mx-auto w-full max-w-md py-8 md:max-w-lg lg:max-w-xl 2xl:pb-8 ',
            className
          )}
        >
          {/* <div className="flex flex-col items-center">
            <Title
              as="h2"
              className="mb-7 text-center text-[28px] font-bold leading-snug md:text-3xl md:!leading-normal lg:mb-1 lg:text-4xl"
            >
              {title}
            </Title>
          </div> */}
          {children}
        </div>
      </div>

      {/* <AuthFooter /> */}
    </div>
  );
}

function AuthHeader() {
  const { resetStepper } = useStepperTwo();

  const resetForm = () => {
    console.log('data');
    resetStepper();
  };
  return (
    <header className="static top-0 z-10 flex w-full items-center  justify-between bg-white p-4 dark:bg-transparent sm:fixed lg:px-16 lg:py-6 2xl:px-24">
      <Link href="https://www.deepprogrammer.in/" target="_blank">
        <Image
          src={siteConfig.logo}
          alt={siteConfig.title}
          className="dark"
          priority
        />
      </Link>
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* <p>Have an account ?</p>
        <AuthNavLink href={routes.signIn}>
          <button
            onClick={resetForm}
            className="flex flex items-center space-x-1"
          >
            <PiArrowLineRight className="h-4 w-4" />
            <span>Login</span>
          </button>
        </AuthNavLink> */}
        <Text className="leading-loose">
          <Link
            href="https://wa.me/9019945922"
            className="flex items-center gap-1 text-primary transition-colors"
            target="_blank"
          >
            <FaWhatsapp className="h-4 w-4 text-primary" />
            Need Help ?{' '}
          </Link>
        </Text>
      </div>
    </header>
  );
}

const footerMenu = [
  {
    name: 'Help',
    href: '/',
  },
  {
    name: 'Privacy',
    href: '/',
  },
  {
    name: 'Terms',
    href: '/',
  },
];

function AuthFooter() {
  return (
    <footer className="flex flex-col-reverse items-center justify-between px-4 py-5 lg:flex-row lg:px-16 lg:py-6 2xl:px-24 2xl:py-10">
      <div className="text-center leading-relaxed text-gray-500 lg:text-start">
        © Copyright 2023. Theme by{' '}
        <Link
          href="#"
          className="font-medium transition-colors hover:text-primary"
        >
          Sould AI
        </Link>
        , all rights reserved.
      </div>
      <div className="-mx-2.5 flex items-center justify-end pb-3 font-medium text-gray-700 lg:w-1/2 lg:pb-0">
        {footerMenu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="px-2.5 py-1.5 transition-colors hover:text-primary"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}
