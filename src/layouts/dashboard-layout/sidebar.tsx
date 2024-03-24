'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Title } from '@/components/ui/text';
import { Collapse } from '@/components/ui/collapse';
import cn from '@/utils/class-names';
import { PiCaretDownBold } from 'react-icons/pi';
import SimpleBar from '@/components/ui/simplebar';
import { menuItems } from './menu-items';
import Logo from '@/components/logo';
import { IoIosHelpCircle } from 'react-icons/io';
import { HiDocumentCheck } from 'react-icons/hi2';
import { PiUserCircleDuotone } from 'react-icons/pi';
import { RiCommunityFill } from 'react-icons/ri';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CommnunityFaq from '@/app/shared/Faqs/community-faq';
import { useAtom } from 'jotai';
import mixpanel from 'mixpanel-browser';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
import { MdPrivacyTip } from 'react-icons/md';

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { openModal } = useModal();
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);

  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-72',
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6">
        <Link href={'/dashboard'} aria-label="Site Logo">
          <Logo className="max-w-[155px]" />
        </Link>
      </div>

      <SimpleBar className="h-[calc(100%-80px)]">
        <div className="mt-4 pb-3 3xl:mt-6">
          {menuItems.map((item: any, index) => {
            const isActive = pathname === (item?.href as string);
            const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
              (dropdownItem: any) => dropdownItem.href === pathname
            );
            const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

            return (
              <Fragment key={item.name + '-' + index}>
                {item?.href ? (
                  <>
                    {item?.dropdownItems ? (
                      <Collapse
                        defaultOpen={isDropdownOpen}
                        header={({ open, toggle }) => (
                          <div
                            onClick={toggle}
                            className={cn(
                              'group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2',
                              isDropdownOpen
                                ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                                : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700'
                            )}
                          >
                            <span className="flex items-center">
                              {item?.icon && (
                                <span
                                  className={cn(
                                    'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[19px] [&>svg]:w-[19px]',
                                    isDropdownOpen
                                      ? 'text-primary'
                                      : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                                  )}
                                >
                                  {item?.icon}
                                </span>
                              )}
                              {item.name}
                            </span>

                            <PiCaretDownBold
                              strokeWidth={3}
                              className={cn(
                                'h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90',
                                open && 'rotate-0 rtl:rotate-0'
                              )}
                            />
                          </div>
                        )}
                      >
                        {item?.dropdownItems?.map(
                          (dropdownItem: any, index: number) => {
                            const isChildActive =
                              pathname === (dropdownItem?.href as string);

                            return (
                              <Link
                                href={dropdownItem?.href}
                                key={dropdownItem?.name + index}
                                onFocus={() => {
                                  mixpanel.track(dropdownItem?.name, {
                                    soul_id: UserDetail.soul_id,
                                    subcategory: 'navbar',
                                    category: 'post_login',
                                    type: 'api_call',
                                  });
                                }}
                                className={cn(
                                  'mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5',
                                  isChildActive
                                    ? 'text-gray-900'
                                    : 'text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900'
                                )}
                              >
                                <span
                                  className={cn(
                                    'me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200',
                                    isChildActive
                                      ? 'bg-primary ring-[1px] ring-primary'
                                      : 'opacity-40'
                                  )}
                                />{' '}
                                {dropdownItem?.name}
                              </Link>
                            );
                          }
                        )}
                      </Collapse>
                    ) : (
                      <Link
                        href={item?.href}
                        className={cn(
                          'group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                          isActive
                            ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                            : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90'
                        )}
                        target={item?.target}
                      >
                        {item?.icon && (
                          <span
                            className={cn(
                              'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[19px] [&>svg]:w-[19px]',
                              isActive
                                ? 'text-primary'
                                : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                            )}
                          >
                            {item?.icon}
                          </span>
                        )}
                        {item.name}
                      </Link>
                    )}
                  </>
                ) : (
                  <Title
                    as="h6"
                    className={cn(
                      'mb-2 truncate px-6 text-[11px] font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500 2xl:px-8',
                      index !== 0 && 'mt-6 3xl:mt-7'
                    )}
                  >
                    {item.name}
                  </Title>
                )}
              </Fragment>
            );
          })}
          <Link
            href="#"
            className={cn(
              'group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90 lg:my-1 2xl:mx-5 2xl:my-2'
            )}
            onClick={() => {
              openModal({
                view: <CommnunityFaq />,
                customSize: '720px',
              });
              mixpanel.track('ai_enthusiasts_community', {
                soul_id: UserDetail.soul_id,
                subcategory: 'navbar',
                category: 'post_login',
                type: 'in_page',
              });
            }}
          >
            <RiCommunityFill className="me-2 inline-flex h-5 w-5 items-center justify-center rounded-md text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700 [&>svg]:h-[19px] [&>svg]:w-[19px]" />{' '}
            AI Enthusiasts Community
          </Link>
        </div>
      </SimpleBar>
      <div className="absolute bottom-2 left-0 right-0 bg-gray-0 px-0 py-0 pb-3 dark:bg-gray-50">
        <div className="w-full px-0 py-0">
          <Link
            href="/profile/basic-details"
            className={cn(
              'group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90 lg:my-1 2xl:mx-5 2xl:my-2'
            )}
            onClick={() => {
              mixpanel.track('profile', {
                soul_id: UserDetail.soul_id,
                subcategory: 'navbar',
                category: 'post_login',
                type: 'api_call',
              });
            }}
          >
            <PiUserCircleDuotone className="me-2 inline-flex h-5 w-5 items-center justify-center rounded-md text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700 [&>svg]:h-[19px] [&>svg]:w-[19px]" />{' '}
            Profile
          </Link>
          {/* <Link
            href="https://wa.link/8rejti"
            className={cn(
              'group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90 lg:my-1 2xl:mx-5 2xl:my-2'
            )}
            target="_blank"
          >
            <IoIosHelpCircle className="me-2 inline-flex h-5 w-5 items-center justify-center rounded-md text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700 [&>svg]:h-[19px] [&>svg]:w-[19px]" />{' '}
            Need Help?{' '}
          </Link> */}
          <Link
            href="https://www.deepprogrammer.in/terms-of-service"
            target="_blank"
            className={cn(
              'group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90 lg:my-1 2xl:mx-5 2xl:my-2'
            )}
            onClick={() => {
              mixpanel.track('terms_and_conditions', {
                soul_id: UserDetail.soul_id,
                subcategory: 'navbar',
                category: 'post_login',
                type: 'api_call',
              });
            }}
          >
            <HiDocumentCheck className="me-2 inline-flex h-5 w-5 items-center justify-center rounded-md text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700 [&>svg]:h-[19px] [&>svg]:w-[19px]" />{' '}
            Terms of Service
          </Link>

          <Link
            href="https://www.deepprogrammer.in/privacy-policy"
            target="_blank"
            className={cn(
              'group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90 lg:my-1 2xl:mx-5 2xl:my-2'
            )}
          >
            <MdPrivacyTip className="me-2 inline-flex h-5 w-5 items-center justify-center rounded-md text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700 [&>svg]:h-[19px] [&>svg]:w-[19px]" />{' '}
            Privacy Policy
          </Link>
        </div>
      </div>
    </aside>
  );
}
