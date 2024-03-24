import ProfileBasicDetails from '@/app/shared/account-settings/personal-info';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Basic Details'),
};

export default function ProfileSettingsFormPage() {
  return <ProfileBasicDetails />;
}
