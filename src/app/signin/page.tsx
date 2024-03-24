import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper';
import Image from 'next/image';
import homeBanner from '@public/images/signin-banner.svg';
import homeBanner1 from '@public/images/signin-banner.svg';
import homeBanner2 from '@public/images/signin-banner.svg';
import UnderlineShape from '@/components/shape/underline';
import { metaObject } from '@/config/site.config';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import HomeSlider from './homeSlider';
import { FaWhatsapp } from 'react-icons/fa6';

export const metadata = {
  ...metaObject('Sign In'),
};

export default function SignIn() {
  return (
    <AuthWrapper
      title="Proceed below whether you are a new applicant or a returning user"
      // description="Proceed below whether you are a new applicant or a returning user."
      bannerTitle="Welcome to Deep Programmer AI!"
      bannerDescription=""
      isSocialLoginActive={true}
      pageImage={
        <div className="relative mx-auto aspect-[4/1.8] w-[500px] xs:w-[300px] xl:w-[620px] 2xl:w-[820px]">
          <Image
            src={homeBanner}
            alt="Sign Up Thumbnail"
            fill
            priority
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
          {/* <HomeSlider /> */}
        </div>
      }
    >
      <Text className="fixed right-4 top-4 mt-2 text-center leading-loose text-gray-500 xs:mt-0 lg:mt-2 lg:text-start">
        <Link
          href="https://wa.me/9019945922"
          className="flex items-center gap-1 text-primary transition-colors"
          target="_blank"
        >
          <FaWhatsapp className="h-4 w-4 text-primary" />
          Need Help ?{' '}
        </Link>
      </Text>
    </AuthWrapper>
  );
}
