import ProfileEductation from '@/app/shared/account-settings/educational-info';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Education'),
};

export default function ProfileSettingsFormPage() {
  return <ProfileEductation />;
}
