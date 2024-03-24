'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Title, Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { API_URL } from '@/config/constants';
import toast from 'react-hot-toast';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
import mixpanel from 'mixpanel-browser';
import { useAtom } from 'jotai';

export interface UserDetails {
  email: string;
  maskedEmail: string;
  maskedPhone: string;
  name: string;
  phoneVerified: boolean;
  picture: string;
  soul_id: string;
  source: string;
  status: string; // NEW , SHORTLISTED
}
const menuItems = [
  {
    name: 'My Profile',
    href: '/profile/basic-details',
  },
  // {
  //   name: 'Account Settings',
  //   href: routes.forms.profileSettings,
  // },
  // {
  //   name: 'Activity Log',
  //   href: '#',
  // },
];

function DropdownMenu(props: any) {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([
    'token',
    'userStatus',
  ]);
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);

  function handleLogout() {
    removeCookie('token');
    removeCookie('userStatus');
    router.push('/signin');
    toast.success(<Text>Successfully Logged Out</Text>);
    mixpanel.track('sign_out', {
      soul_id: UserDetail.soul_id,
      subcategory: 'user_avatar',
      category: 'post_login',
      type: 'api_call',
    });
  }
  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center overflow-hidden text-ellipsis border-b border-gray-300 px-6 pb-5 pt-6 ">
        <Avatar
          src={props.userData?.picture}
          name="Albert Flores"
          color="invert"
        />
        <div className="ms-3 truncate">
          <Title as="h6" className="truncate font-semibold">
            {props.userData?.name}
          </Title>
          <Text className="max-w-40 truncate text-gray-600">
            {' '}
            {props.userData?.email}
          </Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
            onClick={() => {
              mixpanel.track('my_profile', {
                soul_id: UserDetail.soul_id,
                subcategory: 'user_avatar',
                category: 'post_login',
                type: 'api_call',
              });
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const [cookies] = useCookies(['token', 'userStatus']);
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/user/details`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (response.status == 200) {
        const userDetails = (await response.json()) as UserDetails;
        // methods.setValue('preferredName', userDetails.name);
        // methods.setValue('email', userDetails.email);
        setUserDetails(userDetails);
        console.log(userDetails, 'userDetails');
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <DropdownMenu userData={userDetails} />}
      shadow="sm"
      placement="bottom-end"
      className="z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
    >
      <button
        className={cn(
          'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
          buttonClassName
        )}
        onClick={() => {
          mixpanel.track('user_avatar', {
            soul_id: UserDetail.soul_id,
            subcategory: 'user_avatar',
            category: 'post_login',
            type: 'in_page',
          });
        }}
      >
        <Avatar
          src={userDetails?.picture || 'icon.png'}
          name="profile pic"
          color="invert"
          className={cn('!h-9 w-9 sm:!h-10 sm:w-10', avatarClassName)}
        />
      </button>
    </Popover>
  );
}
