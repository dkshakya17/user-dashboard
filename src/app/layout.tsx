import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';
import { ThemeProvider } from '@/app/shared/theme-provider';
import { siteConfig } from '@/config/site.config';
import { poppins } from '@/app/fonts';
import cn from '@/utils/class-names';
import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel with your project token
mixpanel.init('38568fc30a091b29b71e5a3434a51bb4');

// Track an initial event, for example, 'App Loaded'
mixpanel.track('App Loaded');

import { GoogleOAuthProvider } from '@react-oauth/google';

const NextProgress = dynamic(() => import('@/components/next-progress'), {
  ssr: false,
});
// styles
import '@/app/globals.css';
import { GoogleClientID } from '@/config/constants';

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);
  return (
    <html
      lang="en"
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(poppins.variable, 'font-poppins')}
      >
        <GoogleOAuthProvider clientId={GoogleClientID}>
          <ThemeProvider>
            {/* <NextProgress /> */}
            {children}
            <Toaster />
            <GlobalDrawer />
            <GlobalModal />
          </ThemeProvider>
        </GoogleOAuthProvider>
        {/* <script src="https://tally.so/widgets/embed.js"></script> */}
        {/* <script
          id="respondio__widget"
          src="https://cdn.respond.io/webchat/widget/widget.js?cId=c7ae8faee642e54cdfbe234c23622e5"
        ></script> */}
      </body>
    </html>
  );
}
