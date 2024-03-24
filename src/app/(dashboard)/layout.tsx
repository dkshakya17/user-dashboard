'use client';
import { useLayout } from '@/hooks/use-layout';
import MainThemeLayout from '@/layouts/dashboard-layout/layout';
import { useIsMounted } from '@/hooks/use-is-mounted';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <MainThemeLayout>{children}</MainThemeLayout>;
}
