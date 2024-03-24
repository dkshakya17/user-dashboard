import ProfileSkills from '@/app/shared/account-settings/skills';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Skills'),
};

export default function ProfileSettingsFormPage() {
  return <ProfileSkills />;
}
