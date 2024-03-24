'use client';

import cn from '@/utils/class-names';
import { Button } from '@/components/ui/button';
import {
  useStepperTwo,
  stepTwoTotalSteps,
} from '@/app/shared/multi-step/steps';
import StepCounter from '@/app/shared/multi-step/step-counter';
import { MIXPANEL_ID } from '@/config/constants';
import { userDetailsAtom } from '@/app/shared/auth-layout/auth-wrapper';
import mixpanel from 'mixpanel-browser';
import { useAtom } from 'jotai';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const { step } = useStepperTwo();
  const { gotoPrevStep } = useStepperTwo();
  const [UserDetail, setUserDetail] = useAtom(userDetailsAtom);

  const clickmixPanel = () => {
    console.log(step, 'step');

    if (step === 0) {
      mixpanel.track('save_and_next', {
        soul_id: UserDetail.soul_id,
        subcategory: 'step-1',
        category: 'application_form',
        type: 'api_call',
      });
    } else if (step === 1) {
      mixpanel.track('save_and_next', {
        soul_id: UserDetail.soul_id,
        subcategory: 'step-2',
        category: 'application_form',
        type: 'api_call',
      });
    } else if (step === 2) {
      mixpanel.track('save_and_next', {
        soul_id: UserDetail.soul_id,
        subcategory: 'step-3',
        category: 'application_form',
        type: 'api_call',
      });
    } else if (step === 3) {
      mixpanel.track('save_and_next', {
        soul_id: UserDetail.soul_id,
        subcategory: 'step-4',
        category: 'application_form',
        type: 'api_call',
      });
    }
  };
  mixpanel.init(MIXPANEL_ID, {
    debug: true,
    // track_pageview: true,
    // persistence: 'localStorage',
  });
  return (
    <footer
      className={cn(
        'mb-8 flex w-full items-center justify-between gap-3 bg-gray-0/10 px-0 py-5 backdrop-blur md:px-5  lg:px-0 3xl:px-0 4xl:px-0',
        className
      )}
    >
      <StepCounter currentStep={step + 1} totalSteps={stepTwoTotalSteps - 1} />
      <div className="flex gap-2">
        {step !== 0 && (
          <Button
            onClick={gotoPrevStep}
            variant="outline"
            className="!w-[unset]"
          >
            Back
          </Button>
        )}
        <Button
          className="!w-[unset]"
          color="primary"
          type="submit"
          onClick={clickmixPanel}
        >
          {step === 3 ? 'Submit' : 'Save & Next'}
        </Button>
      </div>
    </footer>
  );
}
