import { routes } from '@/config/routes';
// import { DUMMY_ID } from '@/config/constants';routes.auth.forgotPassword4
import {
  PiShoppingCartDuotone,
  PiHeadsetDuotone,
  PiPackageDuotone,
  PiChartBarDuotone,
  PiFileImageDuotone,
  PiCurrencyDollarDuotone,
  PiSquaresFourDuotone,
  PiGridFourDuotone,
  PiFeatherDuotone,
  PiChartLineUpDuotone,
  // PiImageDuotone,
  PiCurrencyCircleDollarDuotone,
  PiMapPinLineDuotone,
  PiUserGearDuotone,
  PiBellSimpleRingingDuotone,
  PiUserDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiStepsDuotone,
  PiCreditCardDuotone,
  PiStackDuotone,
  PiTableDuotone,
  PiBrowserDuotone,
  PiBoundingBoxDuotone,
  PiHourglassSimpleDuotone,
  PiUserCircleDuotone,
  PiShootingStarDuotone,
  PiRocketLaunchDuotone,
  PiFolderLockDuotone,
  PiBinocularsDuotone,
  PiHammerDuotone,
  PiNoteBlankDuotone,
  PiUserPlusDuotone,
  PiShieldCheckDuotone,
  PiLockKeyDuotone,
  PiChatCenteredDotsDuotone,
  PiMagicWandDuotone,
  PiCalendarPlusDuotone,
  PiEnvelopeDuotone,
  PiProjectorScreenDuotone,
} from 'react-icons/pi';
import { RiCommunityFill } from 'react-icons/ri';
import { AiTwotoneHome } from 'react-icons/ai';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: <AiTwotoneHome />,
  },
  // {
  //   name: 'Coming soon',
  //   href: routes.comingSoon,
  //   icon: <PiRocketLaunchDuotone />,
  // },
  // {
  //   name: 'My Profile',
  //   href: routes.comingSoon,
  //   icon: <PiUserCircleDuotone />,
  // },
  {
    name: 'Projects',
    href: routes.comingSoon,
    icon: <PiProjectorScreenDuotone />,
  },
  {
    name: 'Payments',
    href: routes.comingSoon,
    icon: <PiCurrencyCircleDollarDuotone />,
  },
  {
    name: 'Assessments',
    href: routes.comingSoon,
    icon: <HiOutlineDocumentSearch />,
  },
  // {
  //   name: 'Community',
  //   href: 'https://discord.gg/R9qTVuqJYy',
  //   icon: <RiCommunityFill />,
  //   target: '_blank',
  // },
];
