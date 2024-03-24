import { metaObject } from '@/config/site.config';
import ShortListed from './shortlisted';

export const metadata = {
  ...metaObject('Dashboard'),
};

export default function ProfilePage() {
  return (
    <div className="@container">
      <ShortListed />
    </div>
  );
}
