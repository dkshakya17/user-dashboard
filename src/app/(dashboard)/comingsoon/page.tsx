import ProfileHeader from '@/app/shared/profile/profile-header';
import ProfileDetails from '@/app/shared/profile/profile-details';
import { metaObject } from '@/config/site.config';
import ComingSoonPage from '@/app/(other-pages)/coming-soon/page';
import comingsoon from '@public/images/coming-soon.svg';

export const metadata = {
  ...metaObject('Profile'),
};

export default function ProfilePage() {
  return (
    <div className="@container">
      {/* <ProfileHeader /> */}
      <ComingSoonPage />
    </div>
  );
}
