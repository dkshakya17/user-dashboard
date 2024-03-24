import { routes } from '@/config/routes';
import PersonalExperience from '@/app/shared/account-settings/experience';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';
import ProfileBasicDetails from '@/app/shared/account-settings/personal-info';

export const metadata = {
  ...metaObject('Profile Settings'),
};

// const pageHeader = {
//   title: 'Account Settings',
//   breadcrumb: [
//     // {
//     //   href: routes.eCommerce.dashboard,
//     //   name: 'E-Commerce',
//     // },
//     // {
//     //   href: routes.forms.profileSettings,
//     //   name: '',
//     // },
//     {
//       name: 'Profile',
//     },
//   ],
// };

export default function ProfileSettingsFormPage() {
  return <ProfileBasicDetails />;
}
