import { metaObject } from '@/config/site.config';
import WelcomePage from '../(other-pages)/welcome/page';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  return <WelcomePage />;
}
