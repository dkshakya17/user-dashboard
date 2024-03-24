'use client';

import { Title, Text } from '@/components/ui/text';
import cn from '@/utils/class-names';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { MIXPANEL_ID } from '@/config/constants';
import mixpanel from 'mixpanel-browser';
import { useAtom } from 'jotai';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import ExpressInterestModal from '@/app/shared/projects/express-interest-modal';

const metricCardClasses = {
  base: 'border border-gray-200 bg-gray-0 p-5 dark:bg-gray-50 lg:p-6 shadow-inner transition-shadow',
  rounded: {
    sm: 'rounded-sm',
    DEFAULT: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
  },
};

type MetricCardTypes = {
  projectName: string;
  skills: string;
  skillId: string;
  projectId: string;
  minPay?: string;
  maxPay?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  contentClassName?: string;
  info?: React.ReactNode;
  rounded?: keyof typeof metricCardClasses.rounded;
  titleClassName?: string;
  metricClassName?: string;
  chartClassName?: string;
  className?: string;
  interested?: Boolean;
};

export default function ProjectCard({
  skills,
  projectName,
  skillId,
  interested,
  projectId,
  icon,
  minPay,
  maxPay,
  info,
  rounded = 'DEFAULT',
  className,
  iconClassName,
  contentClassName,
  titleClassName,
  metricClassName,
  chartClassName,
  children,
}: React.PropsWithChildren<MetricCardTypes>) {
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);
  const { openModal } = useModal();
  const [expressStatus, setExpressStatus] = useState<boolean>(false);
  mixpanel.init(MIXPANEL_ID, {
    debug: true,
    track_pageview: true,
    // persistence: 'localStorage',
  });
  console.log(skillId, skills, 'skillIddeepak');

  useEffect(() => {
    // if (token) {
    //   fetchUserDetails();
    // }
  }, []);

  const handleExpressStatus = (booleanData: boolean) => {
    setExpressStatus(booleanData);
  };

  const interestCapture = () => {
    openModal({
      view: (
        <ExpressInterestModal
          onShowInterest={handleExpressStatus}
          projectName={projectName}
          skills={skills}
          soulId={UserDetail.soul_id}
          skillId={skillId}
          projectId={projectId}
        />
      ),
      customSize: '620px',
    });
    mixpanel.track('project_interest', {
      soul_id: UserDetail.soul_id,
      subcategory: 'project_interest',
      project_id: projectId,
      project_name: projectName,
      category: 'post_login',
      type: 'click',
    });
    // toast.success(<Text>Your interest has been captured </Text>);
  };
  return (
    <div
      className={cn(
        metricCardClasses.base,
        metricCardClasses.rounded[rounded],
        className
      )}
    >
      <div className="flex h-full w-full items-center justify-start">
        <div className="flex h-full w-full  flex-col items-center justify-between">
          {icon ? (
            <div
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 lg:h-12 lg:w-12',
                iconClassName
              )}
            >
              {icon}
            </div>
          ) : null}

          <div className={cn(icon && 'ps-3', contentClassName)}>
            <Text
              className={cn(
                'font-lexend lg:text-md xl:text-md pb-1 font-semibold text-primary dark:text-gray-700 xs:text-sm sm:text-sm md:text-sm'
              )}
            >
              {projectName}
            </Text>
            <Text className={cn('mb-0.5 text-gray-500', titleClassName)}>
              Skills: English, {skills}
            </Text>

            <Text
              className={cn('mb-0.5 text-xs text-gray-500', titleClassName)}
            >
              Pay:{' '}
              <span className="text-xs text-gray-500">
                ${minPay} - ${maxPay}/Hour
              </span>
            </Text>
          </div>
          <Button
            size="sm"
            onClick={interestCapture}
            color="primary"
            className="col-span-2 mt-2 w-full"
            disabled={interested || expressStatus ? true : false}
          >
            {interested || expressStatus
              ? 'Interest Captured'
              : 'Express Interest'}
          </Button>
        </div>
      </div>

      {/* {children} */}
    </div>
  );
}
