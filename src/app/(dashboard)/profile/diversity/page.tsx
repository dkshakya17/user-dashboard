import ProfileDiversity from '@/app/shared/account-settings/diversity';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Diversity'),
};

export default function ProfileSettingsFormPage() {
  return <ProfileDiversity />;
}
