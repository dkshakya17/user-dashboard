import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Title, Text } from '@/components/ui/text';

import welcome from '@public/images/welcome.svg';
import Link from 'next/link';
export default function WelcomePage() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-[1180px] flex-col-reverse items-center justify-center text-center lg:flex-row lg:gap-5 lg:text-start 3xl:max-w-[1520px]">
        <Title
          as="h2"
          className="mb-5 text-center text-[22px] font-bold leading-snug sm:text-2xl md:mb-5 md:text-3xl md:leading-snug xl:mb-7 xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
        >
          Terms and conditions
        </Title>
        {/* <Title
          as="h4"
          className="mb-3 text-left text-[18px] font-bold leading-snug"
        >
          Coming Soon
        </Title> */}
      </div>
      <div className="flex grow items-center px-6 blur-sm xl:px-10">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col-reverse items-center justify-center text-center lg:flex-row lg:gap-5 lg:text-start 3xl:max-w-[1520px]">
          <div>
            <Title
              as="h4"
              className="mb-3 text-left text-[18px] font-bold leading-snug"
            >
              Where can I get some?
            </Title>
            <Text className="mb-6 max-w-[612px] text-left text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </Text>

            <Title
              as="h4"
              className="mb-3 text-left text-[18px] font-bold leading-snug"
            >
              What is Lorem Ipsum?
            </Title>
            <Text className="mb-6 max-w-[612px]  text-left text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
