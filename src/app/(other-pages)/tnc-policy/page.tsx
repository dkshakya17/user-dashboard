import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Title, Text } from '@/components/ui/text';

import welcome from '@public/images/welcome.svg';
import Link from 'next/link';
export default function WelcomePage() {
  return (
    <div className="flex grow items-center px-6 xl:px-10">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col-reverse items-center justify-center text-center lg:flex-row lg:gap-5 lg:text-start 3xl:max-w-[1520px]">
        <div>
          <Title
            as="h2"
            className="mb-5 text-center text-[22px] font-bold leading-snug sm:text-2xl md:mb-5 md:text-3xl md:leading-snug xl:mb-7 xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
          >
            Cookies policy
          </Title>
          <Title
            as="h4"
            className="mb-3 text-left text-[18px] font-bold leading-snug"
          >
            Deep Programmer AI | Cookies policy
          </Title>
          <Text className="mb-6 max-w-[612px] text-left text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            Like every other site on the internet, we use cookies. You’ll know
            lots about the ones in the jar, but we want to give you some more
            information on the digital ones.
          </Text>
          <Text className="mb-6 max-w-[612px] text-left text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            Confused? Got questions? Fill out our Contact Form or send us an
            email at{' '}
            <Link href="mailto:deeproinfo@gmail.com" className="text-primary">
              deeproinfo@gmail.com
            </Link>{' '}
            and we’ll get in touch with you.
          </Text>

          <Title
            as="h4"
            className="mb-3 text-left text-[18px] font-bold leading-snug"
          >
            What are cookies?
          </Title>
          <Text className="mb-6 max-w-[612px] text-left text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            Cookies are small text files that store information on your browser
            about what you did on our website. They don’t let us see any of your
            computer content but they do let us give you a better on-site
            experience.
          </Text>
          <Title
            as="h4"
            className="mb-3 text-left text-[18px] font-bold leading-snug"
          >
            What types of cookies do we use?
          </Title>
          <Text className="mb-6 max-w-[612px]  text-left text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            We use our own cookies and some trusted third-party cookies too.
            With all of the cookies in our jar, you can choose to limit or block
            them —but the site might not work as smoothly. Here are the cookies
            you’ll find on our site:
          </Text>
          <Text className="mb-6 max-w-[612px]  text-left text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            <b>Strictly necessary cookies</b> are used to check your identity
            when you log in and make the site run smoothly and secured.
          </Text>
          <Text className="mb-6 max-w-[612px]  text-left text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            <b>Cookies that remember your settings</b> allow our site to change
            based on your actions e.g. language choices and layout.
          </Text>
          <Text className="mb-6 max-w-[612px]  text-left text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            <b>Cookies that measure website use</b> help us understand how
            people use our site and interact with it. They give us information
            like how many times you’ve visited our page, what browser you’re
            using, and if you’re on your phone or laptop.
          </Text>
          <Text className="mb-6 max-w-[612px]  text-left text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            <b> Cookies that help with our communications and marketing </b> are
            used to show you offers, adverts, and general marketing on the rest
            of the web, and some of them are similar to cookies mentioned
            above—they analyze how you, and others, use our website
          </Text>
          <Title
            as="h4"
            className="mb-3 text-left text-[18px] font-bold leading-snug"
          >
            Can I block or delete cookies?
          </Title>
          <Text className="mb-6 max-w-[612px]  text-left text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            Of course you can. But like we said—you might find some hiccups on
            our site if you do. Here’s how you can block and delete your
            cookies:
          </Text>
          <Text className="mb-6 max-w-[612px]  text-left text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            <Link
              className="text-primary"
              href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
            >
              Internet Explorer
            </Link>
          </Text>
          <Text className="mb-6 max-w-[612px]  text-left text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            <Link
              className="text-primary"
              href="https://support.apple.com/en-us/HT201265"
            >
              Safari
            </Link>
          </Text>
          <Text className="mb-6 max-w-[612px]  text-left text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            <Link
              className="text-primary"
              href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en"
            >
              Chrome
            </Link>
          </Text>
          <Text className="mb-6 max-w-[612px]  text-left text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
            <Link
              className="text-primary"
              href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox?redirectslug=delete-cookies-remove-info-websites-stored&redirectlocale=en-US"
            >
              Firefox
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
}
