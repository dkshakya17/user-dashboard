import {
  PiFacebookLogoFill,
  PiInstagramLogoFill,
  PiTwitterLogoFill,
  PiLinkedinLogoFill,
  PiYoutubeLogoFill,
} from 'react-icons/pi';
import { FaSquareXTwitter } from 'react-icons/fa6';

const socialData = [
  {
    title: 'Linkedin',
    icon: <PiLinkedinLogoFill className="h-auto w-4 text-white" />,
    link: 'https://www.linkedin.com/company/soul-ai/',
  },
  {
    title: 'Twitter',
    icon: <FaSquareXTwitter className="h-auto w-4 text-white" />,
    link: 'https://twitter.com/deepprogrammer_AI',
  },
];

export default function SocialItems() {
  return (
    <div className="mt-8 flex items-center justify-center gap-6 py-6 md:mt-10 lg:mt-0 xl:py-8">
      {socialData.map((item) => (
        <a
          key={item.title}
          href={item.link}
          rel="norefferer"
          target="_blank"
          className="social-btn-shadow dark:hover:text-white-1000 dark:text-white-700 hover:text-white-1000 dark:bg-white-100 text-white-500 inline-block rounded-full bg-primary p-3 transition-all duration-300"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
