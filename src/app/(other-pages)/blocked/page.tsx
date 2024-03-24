import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Title, Text } from '@/components/ui/text';
import LaptopImg from '@public/welcome-laptop.png';
import MobileImg from '@public/welcome-mobile.png';
import welcome from '@public/images/welcome.svg';

export default function WelcomePage() {
  return (
    <div className="flex grow items-center px-6 xl:px-10">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col-reverse items-center justify-between text-center lg:flex-row lg:gap-5 lg:text-start 3xl:max-w-[1520px]">
        <div>
          <Title
            as="h2"
            className="mb-3 text-[22px] font-bold leading-snug sm:text-2xl md:mb-5 md:text-3xl md:leading-snug xl:mb-7 xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
          >
            Welcome to Deep Programmer AI
          </Title>
          <Text className="mb-6 max-w-[612px] text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            Sorry you have been blocked due to policy violations.
          </Text>
        </div>
        <div className="relative">
          <Image
            src={welcome}
            alt="coming-soon"
            className="aspect-[632/630] max-w-[256px] sm:max-w-xs lg:max-w-lg 2xl:max-w-xl 3xl:max-w-[632px]"
          />

          {/* <div className="mx-auto h-20 w-32 bg-gray-1000/50 blur-[57px] [transform:rotateX(80deg)]"></div>
          <div className="absolute bottom-10 left-3 mx-auto h-20 w-32 bg-gray-1000/50 blur-[57px] [transform:rotateX(80deg)] lg:left-7"></div> */}
        </div>
      </div>
    </div>
  );
}
