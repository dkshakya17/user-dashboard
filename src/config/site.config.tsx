import { Metadata } from 'next';
import logoImg from '@public/logo.png';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Welcome to Deep Programmer AI',
  description: `The power of humans
  in the age of AI`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Deep Programmer AI` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Deep Programmer AI` : title,
      description,
      url: 'https://www.deepprogrammer.in/',
      siteName: 'Deep Programmer AI', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://www.deepprogrammer.in/assets/soul-ui-logo.webp',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
