import { Metadata } from 'next';
import logoImg from '@public/logo.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Welcome to Sould AI user dashboard',
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
    title: title ? `${title} - Soul AI` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Soul AI` : title,
      description,
      url: 'https://www.soulhq.ai/',
      siteName: 'Soul AI', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://www.soulhq.ai/assets/soul-ui-logo.webp',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
